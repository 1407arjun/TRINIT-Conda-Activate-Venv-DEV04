import { VStack } from "@chakra-ui/react"
import { NextPage } from "next"
import ClusterList from "../components/console/List"
import Navbar from "../components/Navbar"
import type Cluster from "../types/Cluster"
import Head from "../components/Head"

import { MongoClient, ServerApiVersion } from "mongodb"

const Console: NextPage<{ clusters: Cluster[] }> = ({ clusters }) => {
    return (
        <VStack
            backgroundImage="background.png"
            backgroundColor="#f6f7f9"
            backgroundSize="contain"
            backgroundRepeat="no-repeat"
            minH="100vh">
            <Head
                title="Clusterbase Console"
                desc="Console displaying all active clusters."
            />
            <Navbar />
            <ClusterList main title="Recent clusters" clusters={clusters} />
            <ClusterList title="All clusters" clusters={clusters} />
        </VStack>
    )
}

export const getServerSideProps = async () => {
    const mongoClient = new MongoClient(process.env.MONGODB_URI!, {
        //@ts-ignore
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverApi: ServerApiVersion.v1
    })

    try {
        const client = await mongoClient.connect()
        const collection = client.db("clusterbase").collection("clusters")
        const clusters = await collection.find().project({ _id: 0 }).toArray()
        await client.close()

        return {
            props: { clusters }
        }
    } catch (e: unknown) {
        console.log(e)
    }

    return { props: { clusters: [] } }
}

export default Console
