#!/usr/bin/env babel-node

import fs from 'fs'
import { env } from 'decentraland-commons'
import db from '../src/lib/db'

import initializeDatabase from './init'

import { BidReceiptService, BidService } from '../src/lib/services'

env.load()

async function verify() {
  await initializeDatabase()

  const bidGroups = fileToJson('bid_groups.json')
  const bidRecepits = fileToJson('bid_receipts.json')

  for (let bidGroup of bidGroups) {
    console.log(`Processing ${bidGroup.id}`)

    const bidRecepit = bidRecepits.find(
      receipt => receipt.bidGroupId === bidGroup.id.toString()
    )

    if (!bidRecepit) {
      throw new Error(`Could not find a valid BidReceipt for ${bidGroup.id}`)
    }

    await BidReceiptService.verify(bidRecepit)
    await BidService.processBidGroup(bidGroup)
  }

  console.log('All done!')
}

function fileToJson(path) {
  const jsonString = fs.readFileSync(path, 'utf8')
  return JSON.parse(jsonString)
}

db
  .connect()
  .then(verify)
  .catch(console.error)

export default verify
