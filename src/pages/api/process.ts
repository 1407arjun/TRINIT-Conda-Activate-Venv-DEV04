import axios from "axios"
import { NextApiRequest, NextApiResponse } from "next"

const process = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const { rules, count, endpoint } = req.body
        try {
            const { data } = await axios.post(
                "https://clusterbase-flask.onrender.com",
                {
                    rules,
                    count,
                    endpoint
                }
            )
            res.status(200).send(data)
        } catch (e) {
            console.log(e)
            res.status(500).send({})
        }
    }
}

export default process
