import { Heading, HStack, Spacer, Text } from "@chakra-ui/react"

const Navbar = ({ title }: { title: string }) => {
    return (
        <HStack w="100%" px={6} py={4} color="white">
            <Heading as="h1" size="md">
                {title}
            </Heading>
            <Spacer />
            <Text fontSize="lg" fontWeight="semibold">
                Conda Activate Venv
            </Text>
        </HStack>
    )
}

export default Navbar
