import { Dispatch, FormEvent, SetStateAction, useState } from "react"
import {
    HStack,
    FormControl,
    Input,
    Select,
    FormHelperText,
    FormErrorMessage,
    IconButton,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper
} from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"
import type Rule from "../../types/Rule"
import DataType from "../../types/DataType"
import MatchType from "../../types/MatchType"

const Inputs = ({
    rules,
    setRules,
    disabled
}: {
    rules: Rule[]
    setRules: Dispatch<SetStateAction<Rule[]>>
    disabled: boolean
}) => {
    const [idInput, setIdInput] = useState("")
    const [typeInput, setTypeInput] = useState<DataType>(DataType.String)
    const [matchInput, setMatchInput] = useState<MatchType>(MatchType.Full)
    const [priorityInput, setPriorityInput] = useState<0 | 1 | 2 | 3 | 4 | 5>(0)

    const handleIdInputChange = (e: FormEvent<HTMLInputElement>) => {
        setIsIdError(false)
        setIdInput((e.target as HTMLInputElement).value)
    }
    const handleTypeInputChange = (e: FormEvent<HTMLSelectElement>) =>
        setTypeInput((e.target as HTMLSelectElement).value as DataType)
    const handleMatchInputChange = (e: FormEvent<HTMLSelectElement>) =>
        setMatchInput((e.target as HTMLSelectElement).value as MatchType)
    const handlePriorityInputChange = (str: string, num: number) =>
        setPriorityInput(num as 0 | 1 | 2 | 3 | 4 | 5)

    const [isIdError, setIsIdError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const isTypeError = false
    const isMatchError = false
    const isPriorityError = false

    return (
        <HStack alignItems="start" w="100%">
            <FormControl isInvalid={isIdError} isDisabled={disabled}>
                <Input
                    required
                    type="text"
                    value={idInput}
                    onChange={handleIdInputChange}
                    placeholder="ID"
                />
                {!isIdError ? (
                    <FormHelperText pl={2}>Attribute identifier</FormHelperText>
                ) : (
                    <FormErrorMessage pl={2}>{errorMessage}</FormErrorMessage>
                )}
            </FormControl>
            <FormControl isInvalid={isTypeError} isDisabled={disabled}>
                <Select
                    onChange={handleTypeInputChange}
                    defaultValue={DataType.String}>
                    <option value={DataType.String}>String</option>
                    <option value={DataType.Number}>Number</option>
                </Select>
                {!isTypeError ? (
                    <FormHelperText pl={2}>Attribute data type</FormHelperText>
                ) : (
                    <FormErrorMessage pl={2}>
                        Data type is required
                    </FormErrorMessage>
                )}
            </FormControl>
            <FormControl isInvalid={isMatchError} isDisabled={disabled}>
                <Select
                    onChange={handleMatchInputChange}
                    defaultValue={MatchType.Full}>
                    <option value={MatchType.Full}>Full</option>
                    <option value={MatchType.Partial}>Partial</option>
                </Select>
                {!isMatchError ? (
                    <FormHelperText pl={2}>Attribute match type</FormHelperText>
                ) : (
                    <FormErrorMessage pl={2}>
                        Match type is required
                    </FormErrorMessage>
                )}
            </FormControl>
            <FormControl isInvalid={isPriorityError} isDisabled={disabled}>
                <NumberInput
                    max={5}
                    min={0}
                    value={priorityInput}
                    onChange={handlePriorityInputChange}>
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
                {!isPriorityError ? (
                    <FormHelperText pl={2}>
                        Attribute priority (0-5)
                    </FormHelperText>
                ) : (
                    <FormErrorMessage pl={2}>
                        Priority should be between 0 and 5
                    </FormErrorMessage>
                )}
            </FormControl>
            <IconButton
                isDisabled={disabled}
                onClick={() => {
                    if (idInput.trim() === "") {
                        setErrorMessage("ID is required")
                        setIsIdError(true)
                    } else {
                        if (!rules.every((r) => r.id !== idInput)) {
                            setErrorMessage("ID already exists")
                            setIsIdError(true)
                        } else {
                            setRules((prev) => {
                                const arr = [
                                    ...prev,
                                    {
                                        id: idInput,
                                        type: typeInput,
                                        match: matchInput,
                                        priority: priorityInput ?? 0
                                    }
                                ]
                                arr.sort((r, s) => s.priority - r.priority)
                                return arr
                            })
                        }
                    }
                }}
                colorScheme="green"
                size="sm"
                p={5}
                aria-label="Add rule"
                icon={<AddIcon />}
            />
        </HStack>
    )
}

export default Inputs
