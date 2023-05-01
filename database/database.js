import Sequelize from "sequelize";
import { config } from 'dotenv'

config()

const sqlDB = new Sequelize("express2", "postgres", process.env.PG_PASSWORD, {
    host: '192.168.1.5',
    dialect: 'postgres'
})

export default sqlDB