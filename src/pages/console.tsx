import { VStack } from "@chakra-ui/react"
import { NextPage } from "next"
import ConsoleList from "../components/console/List"
import Navbar from "../components/Navbar"

const Config: NextPage = () => {
    return (
        <VStack
            backgroundImage="background.png"
            backgroundColor="#f6f7f9"
            backgroundSize="contain"
            backgroundRepeat="no-repeat"
            minH="100vh">
            <Navbar />
            <ConsoleList />
        </VStack>
    )
}

export default Config
