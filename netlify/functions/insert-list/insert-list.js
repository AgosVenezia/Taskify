const axios = require('axios');
const { config, data } = require('../mongodb.js')

const handler = async function (event, context) {
    const { title } = event.queryStringParameters;
    const currentDate = new Date();

    const newData = {
        ...JSON.parse(data),
            "collection": "lists",
            "document": {
                "title": title,
                "createdAt": {
                    "$date": currentDate 
                },
                "updatedAt": {
                    "$date": currentDate 
                }
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
