import * as React from 'react';
import {useSiteMetadata} from '../../data/useSiteMetaData.jsx';
export const Meta = ({children}) => {

    const metaData = useSiteMetadata();

    //todo no image, description returned

    return (
        <>
            <title>{metaData?.title}</title>
            <meta name="description" content={metaData?.description} />
            <meta name="image" content={metaData?.image} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={metaData?.title} />
            <meta name="twitter:url" content={metaData?.url} />
            <meta name="twitter:description" content={metaData?.description} />
            <meta name="twitter:image" content={metaData?.image} />
            <meta name="twitter:creator" content={metaData?.twitterUsername} />
            {children}
        </>
    )

}
