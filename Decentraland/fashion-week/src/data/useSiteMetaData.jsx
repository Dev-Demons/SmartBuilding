import {graphql, useStaticQuery} from 'gatsby';

export const useSiteMetadata = () => {
    const data = useStaticQuery(graphql`
    {
      contentfulJson {
        metadata {
          title
          description
          image
        }
      }
    }
  `)

    return data.contentfulJson.metadata;
}
