import {
    Button,
    Heading,
    IconButton,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Text,
    Tfoot,
    Th,
    Thead,
    Tr,
    VStack
} from "@chakra-ui/react"
import Item from "./Item"
import type Rule from "../../types/Rule"
import Inputs from "./Inputs"
import { DeleteIcon } from "@chakra-ui/icons"

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
                <Inputs />
                <TableContainer w="100%">
                    <Table variant="simple">
                        <TableCaption>Rules defined for {title}</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>ID</Th>
                                <Th>Match type</Th>
                                <Th>Data type</Th>
                                <Th>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {rules.map((r) => (
                                <Tr key={r.id}>
                                    <Td>{r.id}</Td>
                                    <Td>{r.match}</Td>
                                    <Td>{r.type}</Td>
                                    <Td>
                                        <IconButton
                                            colorScheme="red"
                                            size="sm"
                                            aria-label="Delete rule"
                                            icon={<DeleteIcon />}
                                        />
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
                <Button colorScheme="messenger">Save Rules</Button>
            </VStack>
        </VStack>
    )
}

export default List
