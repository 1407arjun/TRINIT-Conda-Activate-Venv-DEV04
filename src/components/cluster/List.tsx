import { Heading, Text, VStack } from "@chakra-ui/react"
import Item from "./Item"
import type Rule from "../../types/Rule"

const List = ({ title, rules }: { title: string; rules: Rule[] }) => {
    return (
        <VStack spacing={4} w="100%" px={24} py={4}>
            <Heading as="h1" size="xl" w="100%" color="white" pb={6}>
                {title}
            </Heading>
            <Text fontSize="lg" w="100%" fontWeight="semibold" color="white">
                Cluster rules
            </Text>
            <VStack
                w="100%"
                spacing={6}
                bgColor="white"
                shadow="md"
                rounded="lg"
                px={4}
                py={5}>
                {rules.map((r) => (
                    <Item key={r.id} {...r} />
                ))}
            </VStack>
        </VStack>
    )
}

export default List
