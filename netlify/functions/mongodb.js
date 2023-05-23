var data = JSON.stringify({
    "database": process.env.MONGODB_DB,
    "dataSource": process.env.MONGODB_CLUSTER,
});

var config = {
    method: 'post',
    url: process.env.MONGODB_ENDPOINT,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'api-key': process.env.MONGODB_API_KEY,
    },
    data: data
}

module.exports = { config, data };
