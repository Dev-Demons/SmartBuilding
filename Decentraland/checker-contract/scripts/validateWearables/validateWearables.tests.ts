export function getTestsForNetwork(network: string) {
  switch (network) {
    case "matic":
      return [
        {
          params: {
            sender: "0xb3ab3a2f58a7d91fe3dcf9abad53c0dd1603b847",
            collection: "0x09d4ff98bdf09d3ee1fd88d31f8bdedfdf79c121",
            itemId: "1",
            contentHash: "bafkreig4h6ofbbdsxnx42vwucu5m66gn6z3fvz2pysceaehwhylxdyifre",
          },
          block: 15754060,
          expected: true,
        },
        {
          params: {
            sender: "0xb3ab3a2f58a7d91fe3dcf9abad53c0dd1603b847",
            collection: "0x09d4ff98bdf09d3ee1fd88d31f8bdedfdf79c121",
            itemId: "1",
            contentHash: "bafkreig4h6ofbbdsxnx42vwucu5m66gn6z3fvz2pysceaehwhylxdyifre",
          },
          block: 15753913,
          expected: true,
        },
      ];
    default:
      throw new Error(`Network ${network} not supported`);
  }
}
