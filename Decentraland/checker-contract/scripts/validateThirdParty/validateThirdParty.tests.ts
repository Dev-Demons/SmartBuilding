export function getTestsForNetwork(network: string) {
  switch (network) {
    case "matic":
      return [
        {
          params: {
            tpId: "urn:decentraland:matic:collections-thirdparty:nyan-cat",
            root: [
              241, 39, 104, 56, 176, 226, 40, 202, 159, 20, 229, 243, 47, 143, 231, 8, 125, 94, 130, 249, 52, 189, 159,
              133, 153, 191, 98, 236, 126, 111, 48, 154,
            ],
          },
          block: 37750444,
          expected: true,
        },
      ];
    default:
      throw new Error(`Network ${network} not supported`);
  }
}
