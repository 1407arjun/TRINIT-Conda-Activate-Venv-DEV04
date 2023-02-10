import { Grid, Text, VStack, GridItem } from "@chakra-ui/react"
import Item from "./Item"
import type ConsoleItem from "../../types/ConsoleItem"

const clusters: ConsoleItem[] = [
    { id: "cluster-0", name: "Cluster 0", rules: 5 }
]

const List = () => {
    return (
        <VStack color="white" spacing={4} w="100%" px={48} py={16}>
            <Text fontSize="lg" w="100%" fontWeight="semibold">
                All clusters
            </Text>
            <GridItem
                bgColor="white"
                shadow="lg"
                as={VStack}
                color="initial"
                rounded="lg"
                h={52}
                alignItems="start"
                px={4}
                py={5}></GridItem>
            <Grid w="100%" gap={6} templateColumns="repeat(3, 1fr)">
                {clusters.map((c) => (
                    <Item key={c.name} {...c} />
                ))}
                {clusters.map((c) => (
                    <Item key={c.name} {...c} />
                ))}
                {clusters.map((c) => (
                    <Item key={c.name} {...c} />
                ))}
            </Grid>
        </VStack>
    )
}

export default List
