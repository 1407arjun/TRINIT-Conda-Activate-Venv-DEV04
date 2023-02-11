import { NextApiRequest, NextApiResponse } from "next"
import { MongoClient, ServerApiVersion } from "mongodb"

const createCluster = async (
    req: NextApiRequest,
    res: NextApiResponse<{ error: boolean }>
) => {
    if (req.method === "POST") {
        const { id, name, endpoint } = req.body
        const mongoClient = new MongoClient(process.env.MONGODB_URI!, {
            //@ts-ignore
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverApi: ServerApiVersion.v1
        })

        try {
            const client = await mongoClient.connect()
            const collection = client.db("clusterbase").collection("clusters")
            const response = await collection.insertOne({
                id,
                name,
                endpoint,
                rules: []
            })
            await client.close()

            if (response.acknowledged) res.status(200).send({ error: false })
            else res.status(500).send({ error: true })
        } catch (e: unknown) {
            console.log(e)
            res.status(500).send({ error: true })
        }
    }
}

export default createCluster
