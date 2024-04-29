import { AppComponents, IRunnable } from '../types'
import { CronJob } from 'cron'

type SalesResponse = {
  sales: {
    id: string
    type: string
    buyer: string
    seller: string
    nft: {
      id: string
      category: string
      image: string
      name: string
    }
    timestamp: bigint
  }[]
}

export function createCheckUpdatesJob(
  components: Pick<AppComponents, 'logs' | 'marketplaceSubGraph'>
): IRunnable<void> {
  const logger = components.logs.getLogger('check-updates-job')

  let startDate = new Date()

  async function run() {
    const now = new Date()
    logger.info('Checking for updates since ' + startDate.toISOString())
    const query = `
      query Sales($since: BigInt!) {
        sales(
          where: {timestamp_gte: $since, type: order, searchCategory: "wearable"}
          orderBy: timestamp
          orderDirection: desc
        ) {
          id
          type
          buyer
          seller
          nft {
            id
            category
            image
            name
          }
          timestamp
        }
      }
    `
    console.log('since', Math.floor(startDate.getTime() / 1000) - 86400 * 2)
    const updates = await components.marketplaceSubGraph.query<SalesResponse>(query, {
      since: Math.floor(startDate.getTime() / 1000) - 86400 * 3
    })
    // console.log('updates', updates)
    updates.sales.forEach((sale) => {
      console.info({
        image: sale.nft.image,
        title: 'Item Sold',
        description: `You just sold this ${sale.nft.name}`,
        notificationLink: '',
        buyer: sale.buyer,
        seller: sale.seller
      })
    })
    startDate = now
  }

  async function start(): Promise<void> {
    logger.info('Scheduling check updates job')
    const job = new CronJob(
      '0/30 * * * * *',
      async function () {
        logger.info('Running job: ' + new Date().toISOString())
        await run()
        logger.info('Done running job: ' + new Date().toISOString())
      },
      null,
      false,
      'UCT'
    )
    job.start()
  }

  return {
    run,
    start
  }
}
