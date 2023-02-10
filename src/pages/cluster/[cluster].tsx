import { VStack, Heading } from "@chakra-ui/react"
import { NextPage } from "next"
import RuleList from "../../components/cluster/List"
import Navbar from "../../components/cluster/Navbar"
import type ClusterType from "../../types/Cluster"

const cluster: ClusterType = {
    id: "cluster-0",
    name: "Cluster 0",
    rules: [{ id: "name", type: "number", match: "full" }]
}

const Cluster: NextPage = () => {
    return (
        <VStack
            backgroundImage="../blue.png"
            backgroundColor="#f6f7f9"
            backgroundSize="contain"
            backgroundRepeat="no-repeat"
            minH="100vh">
            <Navbar title={cluster.id} />
            <RuleList title={cluster.id} rules={cluster.rules} />
        </VStack>
    )
}

export default Cluster
