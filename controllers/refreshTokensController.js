import { tb_refresh_tokens } from "../model/userProfile.js"

export const manipulateRefreshToken = async (req, res) => {
    const {body} = req
    try {

        if (req.method === 'POST') {
            const result = await tb_refresh_tokens.create(body)
            result && res.json(result)
        } else {

            const item = await tb_refresh_tokens.findOne({
                where: {
                    fk_id_refresh_token: body.fk_id_refresh_token
                }
            })
            
            switch (req.method) {
                case 'DELETE':
                    item.destroy()
                    break
                case 'GET':
                    res.json(item)
                    break
                default:
                    res.json('No hay metodo que coincida')
                    break
            }
        }

    } catch (error) {
        res.json(error)
    }
}