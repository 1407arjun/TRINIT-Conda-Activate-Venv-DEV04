import {
    Button,
    HStack,
    IconButton,
    Spacer,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useToast,
    VStack
} from "@chakra-ui/react"
import {
    FormControl,
    FormHelperText,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper
} from "@chakra-ui/react"
import type Rule from "../../types/Rule"
import Inputs from "./Inputs"
import { DeleteIcon } from "@chakra-ui/icons"
import { Dispatch, SetStateAction, useState } from "react"
import axios from "axios"
import processRules from "../../util/processRules"

const List = ({
    id,
    title,
    rules,
    setRules,
    setData
}: {
    id: string
    title: string
    rules: Rule[]
    setRules: Dispatch<SetStateAction<Rule[]>>
    setData: Dispatch<
        SetStateAction<{
            [key: string]: { [key: string]: string | number }
        }>
    >
}) => {
    const [count, setCount] = useState(3)
    const [loading, setLoading] = useState(false)
    const toast = useToast()

    const handleCountChange = (str: string, num: number) => setCount(num)

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
                py={5}
                align="start">
                <Inputs rules={rules} setRules={setRules} disabled={loading} />
                <TableContainer w="100%">
                    <Table variant="simple">
                        <TableCaption>
                            {rules.length} rule
                            {rules.length === 1 ? "" : "s"} defined for {title}
                        </TableCaption>
                        <Thead>
                            <Tr>
                                {/* <Th>Priority</Th> */}
                                <Th>ID</Th>
                                <Th>Match type</Th>
                                <Th>Data type</Th>
                                <Th>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {rules.map((rule) => (
                                <Tr key={rule.id}>
                                    {/* <Td>{rule.priority}</Td> */}
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
                <HStack w="100%" spacing={6}>
                    <FormControl w={64}>
                        <NumberInput
                            max={rules.length}
                            min={2}
                            value={count}
                            onChange={handleCountChange}>
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                        <FormHelperText pl={2}>
                            No. of clusters {`(max ${rules.length})`}
                        </FormHelperText>
                    </FormControl>
                    <Spacer />
                    <Button
                        w={64}
                        alignSelf="self-start"
                        colorScheme="messenger"
                        isLoading={loading}
                        onClick={async () => {
                            setLoading(true)
                            try {
                                const { data }: { data: { error: boolean } } =
                                    await axios.post("/api/update/rules", {
                                        id,
                                        rules
                                    })
                                if (!data.error) {
                                    toast({
                                        title: "Success",
                                        description:
                                            "Rules updated successfully",
                                        status: "success",
                                        duration: 5000,
                                        isClosable: true
                                    })
                                    await processRules(rules, count, setData)
                                } else {
                                    toast({
                                        title: "Please try again",
                                        description: "An error occured",
                                        status: "error",
                                        duration: 5000,
                                        isClosable: true
                                    })
                                }
                            } catch (e) {
                                console.log(e)
                                toast({
                                    title: "Please try again",
                                    description: "An error occured",
                                    status: "error",
                                    duration: 5000,
                                    isClosable: true
                                })
                            } finally {
                                setLoading(false)
                            }
                        }}>
                        Save Rules
                    </Button>
                </HStack>
            </VStack>
        </VStack>
    )
}

export default List
