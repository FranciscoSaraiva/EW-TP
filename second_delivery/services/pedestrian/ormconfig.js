require('dotenv')

module.exports = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: "root",
    password: "RuiSantos03",
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