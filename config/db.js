import Sequelize from 'sequelize'
import dontenv from 'dotenv'
dontenv.config({path:'.env'})

const db = new Sequelize(
    process.env.DB_BASE,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        define:{
            timestamps: true
        },
        pool:{
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
    }
)

export default db