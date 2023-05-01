import { tb_incident, tb_rol_user, tb_task, tb_type_incident, tb_user } from "../model/userProfile.js";
import { SchemaIncident, SchemaRolUser, SchemaTask, SchemaTypeIncident, SchemaUser } from "../model/schemas.js";

class requestParams {
    constructor (database, dataSchema,pk) {
        this.database=database
        this.dataSchema=dataSchema
        this.pk=pk
    }
}

const manipulate = async (req, res, info) => {

    const {action} = req.params
    const {method} = req
    const {body} = req
    const {database, dataSchema, pk} = info

    try {
        if (method === 'POST') {

            const result = await database.create(body)
            result && res.json(result)

        } else if (method === 'GET') {

            switch (action) {

                case 'byPK':
                    const itemByPK = await database.findByPk(pk)
                    res.json(itemByPK)
                    break

                case 'byField':
                    const itemByField = await database.findOne({
                        where: {
                            [body.field]: body.payload
                        }
                    })
                    res.json(itemByField)
                    break

                case 'all':
                    const allItems = await database.findAll()
                    res.json(allItems)
                    break

                case 'allByFk':
                    const allItemsByFK = await database.findAll({
                        where: {
                            [body.field]:body.payload
                        }
                    })

                    res.json(allItemsByFK)

                    break
                default:
                    res.json('No hay un metodo disponible')
                    break

            }

        } else {

            if (!pk) return res.json('Necesitamos PK')

            const item = await database.findByPk(pk)

            switch (method) {

                case 'DELETE':
                    await item.destroy()
                    res.json('Item eliminado')
                    break

                case 'PUT':
                    item.update(dataSchema)
                    res.json(item)
                    break

                default:
                    res.json('No hay accion disponible')
                    break

            }
        }

    } catch (error) {
        res.json(error)
    }
}

export const mainController = (req, res) => {
    const {path} = req
    const {body} = req
    const {method} = req

    switch (path.split('/')[1]) {
        case 'users':

            const usersInfo = new requestParams(tb_user, new SchemaUser(body,method), body.pk_id_user)

            manipulate(req,res, usersInfo)
            break

        case 'tasks':

            const taskInfo = new requestParams(tb_task, new SchemaTask(body,method), body.pk_id_task)

            manipulate(req,res,taskInfo)
            break
        case 'rol':

            const rolInfo = new requestParams(tb_rol_user, new SchemaRolUser(body), body.pk_id_rol_user)

            manipulate(req,res,rolInfo)
            break
        case 'typeIncident':

            const typeIncidentInfo = new requestParams(tb_type_incident, new SchemaTypeIncident(body), body.pk_id_type_incident)

            manipulate(req, res, typeIncidentInfo)
            break
        case 'incidents':

            const incidentsInfo = new requestParams(tb_incident, new SchemaIncident(body,method), body.pk_id_incident)

            manipulate(req, res, incidentsInfo)
            break
        default:
            res.json('No funciono')
    }

}