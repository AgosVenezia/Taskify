const axios = require('axios');
const { config, data } = require('../mongodb.js')

const handler = async function (event, context) {
    const { title, text, label, taskId } = event.queryStringParameters;
    const currentDate = new Date();

    const newData = {
        ...JSON.parse(data),
            "collection": "tasks",
            "filter": { "_id": { "$oid": taskId } },
            "update": {
                "$set": {
                    "title": title,
                    "text": text,
                    "label": label,
                    "updatedAt": { "$date": currentDate }
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
        console.log(err)
        return {
            statusCode: 404,
            body: JSON.stringify(err)
        }
    }
}

module.exports = { handler }
