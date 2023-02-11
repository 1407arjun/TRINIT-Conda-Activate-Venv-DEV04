import { VStack, Heading } from "@chakra-ui/react"
import { NextPage } from "next"
import { useState } from "react"
import RuleList from "../../components/cluster/List"
import Navbar from "../../components/cluster/Navbar"
import type ClusterType from "../../types/Cluster"
import DataType from "../../types/DataType"
import MatchType from "../../types/MatchType"
import Rule from "../../types/Rule"

const cluster: ClusterType = {
    id: "cluster-0",
    name: "Cluster 0",
    rules: {
        name: { id: "name", type: DataType.Number, match: MatchType.Full }
    }
}

const Cluster: NextPage = () => {
    const [rules, setRules] = useState<{ [key: string]: Rule }>(cluster.rules)
    return (
        <VStack
            backgroundImage="../blue.png"
            backgroundColor="#f6f7f9"
            backgroundSize="contain"
            backgroundRepeat="no-repeat"
            minH="100vh">
            <Navbar title={cluster.id} />
            <RuleList title={cluster.id} rules={rules} setRules={setRules} />
        </VStack>
    )
}

export default Cluster
