import { Text, VStack } from "@chakra-ui/react"
import type Rule from "../../types/Rule"
import { Dispatch, SetStateAction } from "react"

const Plot = () => {
    return (
        <VStack spacing={4} w="100%">
            <Text fontSize="lg" w="100%" fontWeight="semibold" color="#486282">
                Cluster vizualization
            </Text>
            <VStack
                w="100%"
                spacing={6}
                bgColor="white"
                shadow="md"
                rounded="lg"
                px={4}
                py={5}></VStack>
        </VStack>
    )
}

export default Plot
