import { VStack } from "@chakra-ui/react"
import { NextPage } from "next"
import ClusterList from "../components/console/List"
import Navbar from "../components/Navbar"
import Head from "../components/Head"

const Console: NextPage = () => {
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
            <ClusterList main title="Recent clusters" />
            <ClusterList title="All clusters" />
        </VStack>
    )
}

export default Console
