import { ArrowBackIcon } from "@chakra-ui/icons"
import {
    VStack,
    Heading,
    Text,
    HStack,
    IconButton,
    Link
} from "@chakra-ui/react"
import { GetServerSidePropsContext, NextPage } from "next"
import { useState } from "react"
import RuleList from "../../components/cluster/List"
import Navbar from "../../components/Navbar"
import Head from "../../components/Head"
import type ClusterType from "../../types/Cluster"
import Rule from "../../types/Rule"

import { MongoClient, ServerApiVersion } from "mongodb"

const Cluster: NextPage<{ cluster: ClusterType }> = ({ cluster }) => {
    const [rules, setRules] = useState<Rule[]>(cluster.rules)
    return (
        <VStack
            backgroundImage="../blue.png"
            backgroundColor="#f6f7f9"
            backgroundSize="contain"
            backgroundRepeat="no-repeat"
            minH="100vh">
            <Head
                title={`${cluster.name} - Clusterbase console`}
                desc={`Configure cluster rules for ${cluster.name}`}
            />
            <Navbar />
            <VStack spacing={4} w="100%" px={24} py={4}>
                <HStack w="100%" pb={6}>
                    <IconButton
                        as={Link}
                        href="/console"
                        bgColor="transparent"
                        fontSize="4xl"
                        rounded="full"
                        colorScheme="whiteAlpha"
                        aria-label="Go back"
                        icon={<ArrowBackIcon />}
                    />
                    <Heading as="h1" size="xl" w="100%" color="white">
                        {cluster.name}
                    </Heading>
                </HStack>
                <Text
                    fontSize="lg"
                    w="100%"
                    fontWeight="semibold"
                    color="white">
                    Cluster rules
                </Text>
                <RuleList
                    title={cluster.name}
                    rules={rules}
                    setRules={setRules}
                />
            </VStack>
        </VStack>
    )
}

export const getServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    const { id } = context.query
    const mongoClient = new MongoClient(process.env.MONGODB_URI!, {
        //@ts-ignore
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverApi: ServerApiVersion.v1
    })

    try {
        const client = await mongoClient.connect()
        const collection = client.db("clusterbase").collection("clusters")
        const cluster = await collection.findOne(
            { id },
            { projection: { _id: 0 } }
        )

        if (cluster)
            return {
                props: { cluster }
            }
        else
            return {
                notFound: true
            }
    } catch (e: unknown) {
        console.log(e)
    }

    return { notFound: true }
}

export default Cluster
