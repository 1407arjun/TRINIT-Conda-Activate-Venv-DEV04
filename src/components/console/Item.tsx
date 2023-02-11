import { GridItem, Link, Spacer, Text, VStack } from "@chakra-ui/react"
import type Cluster from "../../types/Cluster"

const Item = ({ name, id, rules }: Cluster) => {
    return (
        <GridItem
            bgColor="white"
            shadow="md"
            rounded="lg"
            as={Link}
            href={`/cluster/${id}`}
            _hover={{ bgColor: "#eeeeee", textDecoration: "none" }}>
            <VStack spacing={0} alignItems="start" h={52} p={5}>
                <Text fontSize="2xl" fontWeight="semibold">
                    {name}
                </Text>
                <Text fontSize="md" fontWeight="medium" color="gray.500">
                    {id}
                </Text>
                <Spacer />
                <Text fontSize="md" fontWeight="semibold" color="gray.500">
                    {rules.length} rules
                </Text>
            </VStack>
        </GridItem>
    )
}

export default Item
