import {
    Button,
    Heading,
    HStack,
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
    rules: Rule[]
    setRules: Dispatch<SetStateAction<Rule[]>>
}) => {
    return (
        <VStack spacing={4} w="100%">
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
                            {rules.length} rule
                            {rules.length === 1 ? "" : "s"} defined for {title}
                        </TableCaption>
                        <Thead>
                            <Tr>
                                <Th>Priority</Th>
                                <Th>ID</Th>
                                <Th>Match type</Th>
                                <Th>Data type</Th>
                                <Th>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {rules.map((rule) => (
                                <Tr key={rule.id}>
                                    <Td>{rule.priority}</Td>
                                    <Td>{rule.id}</Td>
                                    <Td>{rule.match}</Td>
                                    <Td>{rule.type}</Td>
                                    <Td as={HStack}>
                                        <IconButton
                                            onClick={() => {
                                                setRules((prev) => {
                                                    return prev.filter(
                                                        (r) => r.id !== rule.id
                                                    )
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
