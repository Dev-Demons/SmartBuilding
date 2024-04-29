export function getTestsForNetwork(network: string) {
  switch (network) {
    case "mainnet":
      return [
        {
          params: {
            sender: "0x2A5F1c45F0B8185a90bb0Fac999c66f8C8b8a4Ef",
            name: "Bear-2a5f1c",
          },
          block: 11384619,
          expected: true,
        },
      ];
    default:
      throw new Error(`Network ${network} not supported`);
  }
}
