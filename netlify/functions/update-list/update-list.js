const axios = require('axios');
const { config, data } = require('../mongodb.js')

const handler = async function (event, context) {
    const { id, title } = event.queryStringParameters;
    const currentDate = new Date();

    const newData = {
        ...JSON.parse(data),
            "collection": "lists",
            "filter": {
                "_id": {
                    "$oid": id
                }
            },
            "update": {
                "$set": {
                    "title": title,
                    "updatedAt": {
                        "$date": currentDate 
                    }
                }
            }
    }

    const newConfig = {
        ...config,
            url: `${config.url}/action/updateOne`,
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
