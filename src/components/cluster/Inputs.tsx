import { Dispatch, FormEvent, SetStateAction, useState } from "react"
import {
    HStack,
    FormControl,
    Input,
    Select,
    FormHelperText,
    FormErrorMessage,
    IconButton
} from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"
import type Rule from "../../types/Rule"
import DataType from "../../types/DataType"
import MatchType from "../../types/MatchType"

const Inputs = ({
    rules,
    setRules
}: {
    rules: { [key: string]: Rule }
    setRules: Dispatch<SetStateAction<{ [key: string]: Rule }>>
}) => {
    const [idInput, setIdInput] = useState("")
    const [typeInput, setTypeInput] = useState<DataType>(DataType.String)
    const [matchInput, setMatchInput] = useState<MatchType>(MatchType.Full)

    const handleIdInputChange = (e: FormEvent<HTMLInputElement>) => {
        setIsIdError(false)
        setIdInput((e.target as HTMLInputElement).value)
    }
    const handleTypeInputChange = (e: FormEvent<HTMLSelectElement>) =>
        setTypeInput((e.target as HTMLSelectElement).value as DataType)
    const handleMatchInputChange = (e: FormEvent<HTMLSelectElement>) =>
        setMatchInput((e.target as HTMLSelectElement).value as MatchType)

    const [isIdError, setIsIdError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const isTypeError = false
    const isMatchError = false

    return (
        <HStack alignItems="start" w="100%">
            <FormControl isInvalid={isIdError}>
                <Input
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
            <FormControl isInvalid={isMatchError}>
                <Select
                    onChange={handleTypeInputChange}
                    defaultValue={MatchType.Full}>
                    <option value={MatchType.Full}>Full</option>
                    <option value={MatchType.Partial}>Partial</option>
                </Select>
                {!isIdError ? (
                    <FormHelperText pl={2}>Attribute match type</FormHelperText>
                ) : (
                    <FormErrorMessage pl={2}>
                        Match type is required
                    </FormErrorMessage>
                )}
            </FormControl>
            <FormControl isInvalid={isTypeError}>
                <Select
                    onChange={handleMatchInputChange}
                    defaultValue={DataType.String}>
                    <option value={DataType.String}>String</option>
                    <option value={DataType.Number}>Number</option>
                </Select>
                {!isIdError ? (
                    <FormHelperText pl={2}>Attribute data type</FormHelperText>
                ) : (
                    <FormErrorMessage pl={2}>
                        Data type is required
                    </FormErrorMessage>
                )}
            </FormControl>
            <IconButton
                onClick={() => {
                    if (idInput.trim() === "") {
                        setErrorMessage("ID is required")
                        setIsIdError(true)
                    } else {
                        if (Object.keys(rules).includes(idInput)) {
                            setErrorMessage("ID already exists")
                            setIsIdError(true)
                        } else {
                            setRules((prev) => {
                                return {
                                    ...prev,
                                    [idInput]: {
                                        id: idInput,
                                        type: typeInput,
                                        match: matchInput
                                    }
                                }
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
