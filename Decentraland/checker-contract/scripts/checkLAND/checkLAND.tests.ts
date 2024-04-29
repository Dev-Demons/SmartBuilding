export function getTestsForNetwork(network: string) {
  switch (network) {
    case "mainnet":
      return [
        {
          params: {
            sender: "0xE37129c296F3348ADDf6061E4dFB4e4f2385a86f",
            x: -88,
            y: 12,
          },
          block: 16473574,
          expected: true,
        },
        {
          params: {
            sender: "0xa31f1f0d6bbd919bb3adab8da5835ed13e21f32a",
            x: -17,
            y: -37,
          },
          block: 16578039,
          expected: true,
        },
        {
          params: {
            sender: "0xa31f1f0d6bbd919bb3adab8da5835ed13e21f32a",
            x: -17,
            y: -37,
          },
          block: 16578015,
          expected: true,
        },
      ];
    default:
      throw new Error(`Network ${network} not supported`);
  }
}
