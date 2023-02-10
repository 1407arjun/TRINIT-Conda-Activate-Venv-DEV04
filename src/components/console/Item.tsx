import { GridItem, Spacer, Text, VStack } from "@chakra-ui/react"
import type ConsoleItem from "../../types/ConsoleItem"

const Item = ({ name, id, rules }: ConsoleItem) => {
    return (
        <GridItem
            bgColor="white"
            shadow="lg"
            as={VStack}
            color="initial"
            rounded="lg"
            h={52}
            alignItems="start"
            px={4}
            py={5}>
            <Text fontSize="xl" fontWeight="semibold">
                {name}
            </Text>
            <Text fontSize="xs" color="gray.500">
                {id}
            </Text>
            <Spacer />
            <Text fontSize="sm" fontWeight="semibold" color="gray.400">
                {rules} rules
            </Text>
        </GridItem>
    )
}

export default Item
