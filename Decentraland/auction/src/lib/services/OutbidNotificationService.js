import EJS from 'ejs'
import { env, SMTP } from 'decentraland-commons'

import { AddressState, OutbidNotification, Job, ParcelState } from '../models'

const SINGLE_TEMPLATE_NAME = 'outbid-single'
const SIMPLE_TEMPLATE_NAME = 'outbid-multi'

class OutbidNotificationService {
  static hoursAgoToDate(hours) {
    return new Date(new Date().getTime() - hours * 3600 * 1000)
  }

  constructor() {
    this.AddressState = AddressState
    this.OutbidNotification = OutbidNotification
    this.ParcelState = ParcelState
    this.Job = Job
    this.smtp = null

    this.appUrl = env.get('APP_URL')
    if (!this.appUrl) {
      throw new Error('Missing required env APP_URL')
    }
  }

  setSMTPClient(SMTPClient = SMTP) {
    const emailSender = env.get('MAIL_SENDER')
    if (!emailSender) {
      throw new Error('Missing env var MAIL_SENDER')
    }

    const transportOptions = {
      hostname: env.get('MAIL_HOSTNAME'),
      port: env.get('MAIL_PORT'),
      username: env.get('MAIL_USERNAME'),
      password: env.get('MAIL_PASS')
    }

    this.smtp = new SMTPClient(transportOptions)

    // load templates
    this.smtp.setTemplate(SINGLE_TEMPLATE_NAME, opts => ({
      from: `The Decentraland Team <${emailSender}>`,
      to: opts.email,
      subject: 'The Parcel has been outbid!',
      text: `The parcel ${opts.x},${opts.y} now belongs to ${opts.address} for ${opts.amount}. Visit ${this.toParcelLink(
        opts
      )} to place a new bid!`,
      html: `<p>The parcel ${opts.x},${opts.y} now belongs to ${opts.address} for ${opts.amount}.<br/>Visit ${this.toParcelLink(
        opts
      )} to place a new bid!</p>`
    }))

    this.smtp.setTemplate(SIMPLE_TEMPLATE_NAME, opts => ({
      from: `The Decentraland Team <${emailSender}>`,
      to: opts.email,
      subject: opts.subject,
      text: opts.text,
      html: opts.html
    }))

    return this
  }

  async registerParcelNotifications(address, email) {
    // register parcels you have bid at any point in life
    // const bids = await Bid.findByAddress(address)
    // const parcelStateIds = bids.map(bid => ParcelState.hashId(bid.x, bid.y))

    // register only parcels you are winning
    const parcelStateIds = await ParcelState.findByAddress(address).then(rows =>
      rows.map(e => e.id)
    )

    for (const parcelStateId of new Set(parcelStateIds)) {
      const notification = await OutbidNotification.findByParcelStateId(
        parcelStateId
      )

      if (!notification) {
        await OutbidNotification.insert({
          email,
          parcelStateId
        })
      } else if (!notification.active) {
        await OutbidNotification.update(
          { active: true },
          {
            email,
            parcelStateId
          }
        )
      }
    }
  }

  async buildSummary(email, parcelStates) {
    const html = await new Promise((resolve, reject) => {
      EJS.renderFile(
        './src/templates/newsletter.ejs',
        {
          appUrl: this.appUrl,
          email: email,
          parcelStates: parcelStates
        },
        (err, html) => {
          err ? reject(err) : resolve(html)
        }
      )
    })

    let text =
      'This is the summary of parcel outbids from the last notification:\n\n'

    for (const parcel of parcelStates) {
      text += `The parcel ${parcel.x},${parcel.y} now belongs to ${parcel.address} for ${parcel.amount}.\n`
      text += `Visit ${this.toParcelLink(parcel)} to place a new bid!\n\n`
    }

    return { text, html }
  }

  async sendAllSummaryMails(hoursAgo) {
    const results = {}
    const emails = await this.OutbidNotification.findSubscribedEmails()

    for (const email of emails) {
      try {
        results[email] = await this.sendSummaryMail(email, hoursAgo)
      } catch (err) {
        results[email] = err
      }
    }

    return results
  }

  async sendSummaryMail(email, hoursAgo) {
    // avoid resend
    const lastJob = await Job.findLastByReferenceId(email)
    if (lastJob && !this.isTimeToSend(lastJob.createdAt, hoursAgo)) {
      throw new Error(`Last notification sent less than ${hoursAgo} hours ago`)
    }

    // get address for email
    const addressState = await AddressState.findByEmail(email)

    // get active notifications for user
    const parcelIds = await this.OutbidNotification
      .findActiveByEmail(email)
      .then(rows => rows.map(row => row.parcelStateId))
    if (parcelIds.length === 0) {
      throw new Error(`No active notifications found for user ${email}`)
    }

    // find updated parcels and discard parcels you own
    let parcelStates = await this.ParcelState.findByUpdatedSince(
      parcelIds,
      OutbidNotificationService.hoursAgoToDate(hoursAgo)
    )
    parcelStates = parcelStates.filter(
      parcel => parcel.address !== addressState.address
    )

    if (parcelStates.length === 0) {
      throw new Error(`No updated parcels found for user ${email}`)
    }

    // send mail
    const subject = 'Summary of the Decentraland auction'
    const summary = await this.buildSummary(email, parcelStates)

    await this.Job.perform(
      {
        type: 'outbid_notification_multi',
        referenceId: email,
        data: { parcelStates, email }
      },
      async () => {
        await this.sendMail(email, SIMPLE_TEMPLATE_NAME, {
          ...summary,
          subject
        })
        await Promise.all(
          parcelStates.map(p => this.OutbidNotification.deactivate(email, p.id))
        )
      }
    )

    return {
      parcelIds,
      parcelStates,
      summary
    }
  }

  sendMail(email, template, opts) {
    return this.smtp.sendMail({ email }, SIMPLE_TEMPLATE_NAME, {
      ...opts,
      email
    })
  }

  toParcelLink(opts) {
    return `${this.appUrl}/${opts.x}/${opts.y}`
  }

  isTimeToSend(date, hoursAgo) {
    return (new Date() - date) / 1000 > hoursAgo * 3600
  }
}

export default OutbidNotificationService
