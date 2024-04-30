export const getMarketPlaceQuery = (ids) => `
query {
    collections(where: { id_in: ${JSON.stringify(ids)}, isApproved: true }) {
      id,
      name
      items {
        id
        blockchainId
        creator
        price
        image
        metadata {
          id
          wearable {
            name
            description
            rarity
            category
            bodyShapes
          }
          itemType
          emote {
            name
            description
            rarity
            category
          }
        }
      }
    }
  }
`;
