require('dotenv')

module.exports = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: 'crosswalkDB',
    synchronize: true,
    dropSchema: true,
    logging: false,
    entities: [
        "build/models/*.js"
    ],
    cli: {
        "entitiesDir": "src/models"
    }
} 