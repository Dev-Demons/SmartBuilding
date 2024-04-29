import RequestManager, { ContractFactory, HTTPProvider, bytesToHex } from 'eth-connect'
import {
  listAbi,
  getPoisFromContract,
  l1Contracts,
  l2Contracts,
  PoiContract,
  NameDenylistContract,
  CatalystContract,
  getCatalystServersFromDAO,
  CatalystByIdResult,
  catalystAbi,
  getNameDenylistFromContract
} from '../src'
import { createFetchComponent } from '@well-known-components/fetch-component'

const timeout = 100000

describe('e2e', () => {
  let mainnet: HTTPProvider
  let sepolia: HTTPProvider
  let polygon: HTTPProvider
  let amoy: HTTPProvider

  beforeAll(async () => {
    const fetch = createFetchComponent()
    const opts = { fetch: fetch.fetch }
    mainnet = new HTTPProvider('https://rpc.decentraland.org/mainnet?project=catalyst-contracts-ci', opts)
    sepolia = new HTTPProvider('https://rpc.decentraland.org/sepolia?project=catalyst-contracts-ci', opts)
    polygon = new HTTPProvider('https://rpc.decentraland.org/polygon?project=catalyst-contracts-ci', opts)
    amoy = new HTTPProvider('https://rpc.decentraland.org/amoy?project=catalyst-contracts-ci', opts)
  })

  describe('names denylist', () => {
    async function createContract(address: string, provider: HTTPProvider): Promise<NameDenylistContract> {
      const requestManager = new RequestManager(provider)
      const factory = new ContractFactory(requestManager, listAbi)
      return (await factory.at(address)) as any
    }

    it(
      'mainnet',
      async () => {
        const contract = await createContract(l1Contracts.mainnet.nameDenylist, mainnet)
        const denylist = await getNameDenylistFromContract(contract)
        expect(denylist.length).toBeGreaterThan(1)
      },
      timeout
    )

    it(
      'sepolia',
      async () => {
        const contract = await createContract(l1Contracts.sepolia.nameDenylist, sepolia)
        const denylist = await getNameDenylistFromContract(contract)
        expect(denylist.length).toBeGreaterThanOrEqual(1)
        expect(denylist).toContain('banned')
      },
      timeout
    )
  })

  describe('poi list', () => {
    async function createContract(address: string, provider: HTTPProvider): Promise<PoiContract> {
      const requestManager = new RequestManager(provider)
      const factory = new ContractFactory(requestManager, listAbi)
      return (await factory.at(address)) as any
    }

    it(
      'polygon',
      async () => {
        const contract = await createContract(l2Contracts.polygon.poi, polygon)
        const pois = await getPoisFromContract(contract)
        expect(pois.length).toBeGreaterThan(1)
      },
      timeout
    )

    it(
      'amoy',
      async () => {
        const contract = await createContract(l2Contracts.amoy.poi, amoy)
        const pois = await getPoisFromContract(contract)
        expect(pois.length).toBe(0) // 0 POIs in Amoy at the moment
      },
      timeout
    )
  })

  describe('server list', () => {
    async function createContract(address: string, provider: HTTPProvider): Promise<CatalystContract> {
      const requestManager = new RequestManager(provider)
      const factory = new ContractFactory(requestManager, catalystAbi)
      const contract = (await factory.at(address)) as any
      return {
        async catalystCount(): Promise<number> {
          return contract.catalystCount()
        },
        async catalystIds(i: number): Promise<string> {
          return contract.catalystIds(i)
        },
        async catalystById(catalystId: string): Promise<CatalystByIdResult> {
          const [id, owner, domain] = await contract.catalystById(catalystId)
          return { id: '0x' + bytesToHex(id), owner, domain }
        }
      }
    }

    it(
      'mainnet',
      async () => {
        const contract = await createContract(l1Contracts.mainnet.catalyst, mainnet)
        const servers = await getCatalystServersFromDAO(contract)
        expect(servers).toHaveLength(11)
        const addresses = new Set(servers.map((s) => s.address))
        expect(addresses).toContain('https://peer-ec1.decentraland.org')
        expect(addresses).toContain('https://peer-ec2.decentraland.org')
      },
      timeout
    )

    it(
      'sepolia',
      async () => {
        const contract = await createContract(l1Contracts.sepolia.catalyst, sepolia)
        const servers = await getCatalystServersFromDAO(contract)
        expect(servers).toHaveLength(3)
        const addresses = new Set(servers.map((s) => s.address))
        expect(addresses).toContain('https://peer-ap1.decentraland.zone')
        expect(addresses).toContain('https://peer.decentraland.zone')
      },
      timeout
    )
  })
})
