const axios = require('axios');
const { config, data } = require('../mongodb.js')

const handler = async function (event, context) {
    const { listId, title, text, label } = event.queryStringParameters;
    const currentDate = new Date();

    const newData = {
        ...JSON.parse(data),
            "collection": "tasks",
            "document": {
                "title": title,
                "text": text,
                "label": label,
                "createdAt": {
                    "$date": currentDate 
                },
                "updatedAt": {
                    "$date": currentDate 
                },
                "listId": { "$oid": listId }
            }
    }

    const newConfig = {
        ...config,
            url: `${config.url}/action/insertOne`,
            data: newData
    }

    try {
        const res = await axios(newConfig)
        return {
            statusCode: 200,
            body: JSON.stringify(res.data)
        }
    } catch(err) {
        return {
            statusCode: 404,
            body: JSON.stringify(err)
        }
    }
}

module.exports = { handler }
