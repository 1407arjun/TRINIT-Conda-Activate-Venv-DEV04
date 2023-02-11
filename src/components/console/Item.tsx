import { GridItem, Spacer, Text, VStack } from "@chakra-ui/react"
import type Cluster from "../../types/Cluster"

const Item = ({ name, id, rules }: Cluster) => {
    return (
        <GridItem bgColor="white" shadow="md" rounded="lg">
            <VStack spacing={0} alignItems="start" h={52} p={5}>
                <Text fontSize="xl" fontWeight="semibold">
                    {name}
                </Text>
                <Text fontSize="sm" fontWeight="medium" color="gray.500">
                    {id}
                </Text>
                <Spacer />
                <Text fontSize="sm" fontWeight="semibold" color="gray.500">
                    {rules.length} rules
                </Text>
            </VStack>
        </GridItem>
    )
}

export default Item
