import { Heading, HStack, Link, Spacer, Text } from "@chakra-ui/react"

const Navbar = ({ invert }: { invert: boolean }) => {
    return (
        <HStack
            w="100%"
            px={6}
            py={4}
            color={invert ? "gray" : "white"}
            bgColor={invert ? "white" : "initial"}>
            <Link href="/" _hover={{ textDecoration: "none" }}>
                <Heading as="h1" size="md">
                    Clusterbase
                </Heading>
            </Link>
            <Spacer />
            <Text fontSize="lg" fontWeight="semibold">
                Conda Activate Venv
            </Text>
        </HStack>
    )
}

export default Navbar
