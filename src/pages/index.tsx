import { ArrowForwardIcon } from "@chakra-ui/icons"
import { Button, Center, Heading, Link, Text, VStack } from "@chakra-ui/react"
import type { NextPage } from "next"
import Head from "../components/Head"
import Navbar from "../components/Navbar"

const Home: NextPage = () => {
    return (
        <VStack minH="100vh" bgColor="#1c73e8">
            <Head title="Clusterbase" desc="This is Clusterbase" />
            <Navbar invert />
            <Center minH="75vh" color="white" as={VStack}>
                <Heading as="h1" size="2xl" pb={2}>
                    This is Clusterbase
                </Heading>
                <Text fontSize="lg" fontWeight="medium" pb={8}>
                    One platform to clusterize and visualze all your data in
                    real-time hassle free
                </Text>
                <Button
                    size="lg"
                    as={Link}
                    href="/console"
                    bgColor="white"
                    color="#1c73e8"
                    colorScheme="whiteAlpha"
                    _hover={{
                        textDecoration: "none",
                        background: "rgba(255, 255, 255, 0.4)",
                        color: "white"
                    }}
                    rightIcon={<ArrowForwardIcon />}>
                    Go to console
                </Button>
            </Center>
        </VStack>
    )
}

export default Home
