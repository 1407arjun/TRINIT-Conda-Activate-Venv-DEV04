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
import type Rule from "../../types/Rule"
import Inputs from "./Inputs"
import { DeleteIcon } from "@chakra-ui/icons"
import { Dispatch, SetStateAction } from "react"

const List = ({
    title,
    rules,
    setRules
}: {
    title: string
    rules: { [key: string]: Rule }
    setRules: Dispatch<SetStateAction<{ [key: string]: Rule }>>
}) => {
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
                <Inputs rules={rules} setRules={setRules} />
                <TableContainer w="100%">
                    <Table variant="simple">
                        <TableCaption>
                            {Object.keys(rules).length} rule
                            {Object.keys(rules).length === 1 ? "" : "s"} defined
                            for {title}
                        </TableCaption>
                        <Thead>
                            <Tr>
                                <Th>ID</Th>
                                <Th>Match type</Th>
                                <Th>Data type</Th>
                                <Th>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {Object.keys(rules).map((r) => (
                                <Tr key={rules[r].id}>
                                    <Td>{rules[r].id}</Td>
                                    <Td>{rules[r].match}</Td>
                                    <Td>{rules[r].type}</Td>
                                    <Td>
                                        <IconButton
                                            onClick={() => {
                                                setRules((prev) => {
                                                    delete prev[r]
                                                    return { ...prev }
                                                })
                                            }}
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
