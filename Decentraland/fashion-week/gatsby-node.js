const {fetchContent} = require('./src/data/contentful/content.js');

const fs = require('fs').promises;
const fetch = (...args) =>
    import(`node-fetch`).then(({default: fetch}) => fetch(...args))

require('dotenv').config({
    path: `.env`,
})


exports.sourceNodes = async ({
                                 actions: {createNode},
                                 createContentDigest,
                             }) => {

    //todo propping missing entries with json...
    let tempJson = await fs.readFile('./src/data/contentful/temp.json');
    tempJson = JSON.parse(tempJson);

    createNode({
        content: {
            ...tempJson,
        },
        id: `example-build-time-data`,
        parent: null,
        children: [],
        internal: {
            type: `Example`,
            contentDigest: createContentDigest(tempJson),
        },
    })
}
