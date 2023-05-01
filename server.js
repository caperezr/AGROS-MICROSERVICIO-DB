import sqlDB from "./database/database.js"
import { app } from "./app.js"
import fs from 'fs'
import path from 'path'
import { config } from 'dotenv'
import { tb_rol_user, tb_type_incident } from "./model/userProfile.js"

const create_default_roles = async (title, qs, database, file) => {
    const [result, created_result] = await database.findOrCreate({
        where: {
            [qs]: title
        }
    })
    if (created_result) return console.log(`Rol de usuario ${title} creado`)
    await fs.promises.appendFile(path.join('.', file), `Ha sido creado ${title} \n\n`, 'utf-8')
}

const created_roles = await fs.promises.readFile(path.join('.', 'created_Roles.txt'), 'utf-8') === '' ? true : false
const created_typeIncidents = await fs.promises.readFile(path.join('.', 'created_typeIncidents.txt'), 'utf-8') === '' ? true : false

const roles = [process.env.NAME_ADMIN, process.env.NAME_MEMBER]
const typeIncidents = [process.env.TYPE1, process.env.TYPE2, process.env.TYPE3]

const main = async () => {
    try {
        config()
        await sqlDB.authenticate()
        await sqlDB.sync({ force: false })

        created_roles && roles.map(rol => create_default_roles(rol, 'title_rol_user', tb_rol_user, 'created_Roles.txt'))
        created_typeIncidents && typeIncidents.map(incident => create_default_roles(incident, 'title_type_incident', tb_type_incident, 'created_typeIncidents.txt'))

        app.listen(4001)
        console.log('works')
    } catch (error) {
        console.log(error)
    }
}

main()