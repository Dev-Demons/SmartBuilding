import { program } from 'commander'
import fs from 'fs'

import { verifyProof } from '../src/index'
import { ContentHashTree } from '../src/content-hash-tree'
import { MerkleDistributorInfo } from '../src/types'

program
  .version('0.0.0')
  .requiredOption(
    '-i, --input <path>',
    'input JSON file location containing the merkle proofs for each account and the merkle root'
  )

program.parse(process.argv)

console.time('validateHash')
const json: MerkleDistributorInfo = JSON.parse(
  fs.readFileSync(program.input, { encoding: 'utf8' })
)

if (typeof json !== 'object') throw new Error('Invalid JSON')

const merkleRootHex = json.merkleRoot
const merkleRoot = Buffer.from(merkleRootHex.slice(2), 'hex')

const items: string[] = []
let valid = true

Object.keys(json.proofs).forEach((contentHash) => {
  const claim = json.proofs[contentHash]
  const proof = claim.proof.map((p: string) => Buffer.from(p.slice(2), 'hex'))
  items.push(contentHash)
  if (verifyProof(claim.index, contentHash, proof, merkleRoot)) {
    console.log('Verified proof for', claim.index, contentHash)
  } else {
    console.log('Verification for', contentHash, 'failed')
    valid = false
  }
})

if (!valid) {
  console.error('Failed validation for 1 or more proofs')
  process.exit(1)
}
console.log('Done!')
console.timeEnd('validateHash')

// Root
const sortedItems = items.sort()
const tree = new ContentHashTree(sortedItems)
const root = tree.getHexRoot()
console.log('Reconstructed merkle root', root)
console.log('Root matches the one read from the JSON?', root === merkleRootHex)
