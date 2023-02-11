import axios from "axios"
import { NextApiRequest, NextApiResponse } from "next"

const process = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const { selection, schema } = req.body
        try {
            const { data } = await axios.post("http://127.0.0.1:5000", {
                selection,
                schema
            })
            res.status(200).send(data)
        } catch (e) {
            console.log(e)
            res.status(500).send({})
        }
    }
}

export default process
