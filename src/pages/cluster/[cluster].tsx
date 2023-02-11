import { ArrowBackIcon } from "@chakra-ui/icons"
import {
    VStack,
    Heading,
    Text,
    HStack,
    IconButton,
    Link
} from "@chakra-ui/react"
import { NextPage } from "next"
import { useState } from "react"
import RuleList from "../../components/cluster/List"
import Navbar from "../../components/Navbar"
import Head from "../../components/Head"
import type ClusterType from "../../types/Cluster"
import DataType from "../../types/DataType"
import MatchType from "../../types/MatchType"
import Rule from "../../types/Rule"

const cluster: ClusterType = {
    id: "cluster-0",
    name: "Cluster 0",
    rules: [
        {
            id: "name",
            type: DataType.Number,
            match: MatchType.Full,
            priority: 1
        }
    ]
}

const Cluster: NextPage = () => {
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

export default Cluster
