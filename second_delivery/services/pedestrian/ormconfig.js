require('dotenv')

module.exports = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: 'pedestrianDB',
    synchronize: false,
    dropSchema: false,
    logging: false,
    entities: [
        "build/models/*.js"
    ],
    cli: {
        "entitiesDir": "src/models"
    }
} 