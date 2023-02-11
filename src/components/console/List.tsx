import { Grid, Text, VStack, GridItem, Spacer, Divider } from "@chakra-ui/react"
import Item from "./Item"
import { AddIcon } from "@chakra-ui/icons"
import type Cluster from "../../types/Cluster"

const List = ({
    title,
    main,
    clusters
}: {
    title: string
    main?: boolean
    clusters: Cluster[]
}) => {
    return (
        <VStack spacing={4} w="100%" px={48} pt={main ? 16 : 0} pb={8}>
            <Text
                fontSize="lg"
                w="100%"
                fontWeight="semibold"
                color={main ? "white" : "#486282"}>
                {title}
            </Text>
            <Grid w="100%" gap={6} templateColumns="repeat(3, 1fr)">
                {main && (
                    <GridItem
                        bgColor="white"
                        shadow="md"
                        as={VStack}
                        rounded="lg"
                        h={52}
                        alignItems="center"
                        px={4}
                        py={5}
                        _hover={{ bgColor: "#eeeeee" }}>
                        <Spacer />
                        <AddIcon color="#1c73e8" boxSize={5} />
                        <Text
                            fontSize="sm"
                            fontWeight="semibold"
                            color="#1c73e8"
                            pt={2}>
                            Add cluster
                        </Text>
                        <Spacer />
                    </GridItem>
                )}
                {clusters.map((c) => (
                    <Item key={c.name} {...c} />
                ))}
            </Grid>
            {!main && <Divider borderColor="gray.400" pt={8} />}
        </VStack>
    )
}

export default List
