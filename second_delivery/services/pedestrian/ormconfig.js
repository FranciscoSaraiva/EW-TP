require('dotenv')

module.exports = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.PASSWORD,
    database: 'pedestrianDB',
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