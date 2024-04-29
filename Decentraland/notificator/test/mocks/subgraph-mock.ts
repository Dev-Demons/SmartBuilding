import { ISubgraphComponent } from '@well-known-components/thegraph-component'

export function createMockRentalsSubGraph(mockedResponse?: any): ISubgraphComponent {
  return {
    query<T>(): Promise<T> {
      return Promise.resolve({
        rentals: mockedResponse || []
      } as T)
    }
  }
}
