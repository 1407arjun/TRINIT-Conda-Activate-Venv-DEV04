import { ArrowBackIcon, DeleteIcon } from "@chakra-ui/icons"
import {
    VStack,
    Heading,
    Text,
    HStack,
    IconButton,
    Link,
    Spacer,
    useToast
} from "@chakra-ui/react"
import { GetServerSidePropsContext, NextPage } from "next"
import { useEffect, useState } from "react"
import RuleList from "../../components/cluster/List"
import Navbar from "../../components/Navbar"
import Head from "../../components/Head"
import type ClusterType from "../../types/Cluster"
import Rule from "../../types/Rule"
import Plot from "../../components/cluster/Plot"
import { useRouter } from "next/router"

import { MongoClient, ServerApiVersion } from "mongodb"
import axios from "axios"
import { io } from "socket.io-client"
import { Socket } from "socket.io"
import { DefaultEventsMap } from "socket.io/dist/typed-events"

const Cluster: NextPage<{
    cluster: ClusterType
}> = ({ cluster }) => {
    const [rules, setRules] = useState<Rule[]>(cluster.rules)
    const [loading, setLoading] = useState(false)
    const toast = useToast()
    const router = useRouter()

    const [data, setData] = useState<{
        [key: string]: { [key: string]: string | number }
    }>({})

    // const [socketInstance, setSocketInstance] =
    //     useState<Socket<DefaultEventsMap, DefaultEventsMap>>()

    // useEffect(() => {
    //     const socket = io("127.0.0.1:5000/", {
    //         transports: ["websocket"],
    //         //@ts-ignore
    //         cors: {
    //             origin: "http://localhost:3000/"
    //         }
    //     })

    //     //@ts-ignore
    //     setSocketInstance(socket)

    //     socket.on("connect", () => {
    //         console.log("Connected")
    //     })

    //     socket.on("data", (data) => {
    //         console.log(data)
    //     })

    //     socket.on("disconnect", (data) => {
    //         console.log(data)
    //     })

    //     return function cleanup() {
    //         socket.disconnect()
    //     }
    // }, [])

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
            <VStack spacing={10} w="100%" px={24} py={4}>
                <VStack w="100%" color="white" alignItems="start">
                    <HStack w="100%">
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
                        <Spacer />
                        <IconButton
                            isLoading={loading}
                            onClick={async () => {
                                if (
                                    confirm(
                                        `Are you sure you want to delete the Cluster ${cluster.name}?`
                                    )
                                ) {
                                    setLoading(true)
                                    try {
                                        const {
                                            data
                                        }: { data: { error: boolean } } =
                                            await axios.post(
                                                "/api/delete/cluster",
                                                { id: cluster.id }
                                            )
                                        if (!data.error) {
                                            toast({
                                                title: "Success",
                                                description:
                                                    "Cluster deleted successfully",
                                                status: "success",
                                                duration: 5000,
                                                isClosable: true
                                            })
                                            setLoading(false)
                                            router.push("/console")
                                        } else {
                                            toast({
                                                title: "Please try again",
                                                description: "An error occured",
                                                status: "error",
                                                duration: 5000,
                                                isClosable: true
                                            })
                                            setLoading(false)
                                        }
                                    } catch (e) {
                                        console.log(e)
                                        toast({
                                            title: "Please try again",
                                            description: "An error occured",
                                            status: "error",
                                            duration: 5000,
                                            isClosable: true
                                        })
                                        setLoading(false)
                                    }
                                }
                            }}
                            bgColor="transparent"
                            fontSize="2xl"
                            rounded="full"
                            colorScheme="whiteAlpha"
                            aria-label="Delete cluster"
                            icon={<DeleteIcon />}
                        />
                    </HStack>
                    <Text fontSize="lg" fontWeight="medium" px={12}>
                        {cluster.endpoint}
                    </Text>
                </VStack>
                <RuleList
                    id={cluster.id}
                    title={cluster.name}
                    rules={rules}
                    setRules={setRules}
                    setData={setData}
                />
                <Plot
                    title={cluster.name}
                    data={data}
                    setData={setData}
                    rules={rules}
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
        await client.close()

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
