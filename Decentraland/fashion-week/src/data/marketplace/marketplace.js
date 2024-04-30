const {getMarketPlaceQuery} = require('./marketPlaceQuery.js');
const {formatWeiMANA} = require('./mana.js');

exports.fetchMarketPlace = async () => {

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    let res = await fetch('https://builder-api.decentraland.org/v1/addresses?tag=MVFW23', requestOptions);
    res = await res.json();

    const ids = res.data.filter(id => !!id);

    const query = getMarketPlaceQuery(ids);
    var graphql = JSON.stringify({
        query,
        variables: {}
    })

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: graphql,
        redirect: 'follow'
    };

    res = await fetch('https://api.thegraph.com/subgraphs/name/decentraland/collections-matic-mainnet', requestOptions)
    res = await res.json();

    const items = res.data.collections
        //flatten items from collections
        .reduce((acc, collection) => {
            acc = acc.concat(collection.items);
            return acc;
        }, [])
        .map(item => {
            const priceFormatted = formatWeiMANA(item.price);
            const id = item.id.split('-')[0];
            const index = item.id.split('-')[1];
            const uri = `https://market.decentraland.org/contracts/${id}/items/${index}`

            return {
                ...item,
                priceFormatted,
                uri
            }
        })
        //todo remove if no wearable?
        .filter(item => !!item.metadata.wearable)

    return items;
}
