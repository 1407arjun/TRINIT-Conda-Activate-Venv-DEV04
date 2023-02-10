import { useState } from "react"
import {
    HStack,
    FormControl,
    Input,
    Select,
    FormHelperText,
    FormErrorMessage,
    VStack
} from "@chakra-ui/react"
import type Rule from "../../types/Rule"

const Item = ({ id, type, match }: Rule) => {
    const [idInput, setIdInput] = useState(id)
    const [typeInput, setTypeInput] = useState(type)
    const [matchInput, setMatchInput] = useState(match)

    const handleIdInputChange = (e) => setIdInput(e.target.value)
    const handleTypeInputChange = (e) => setTypeInput(e.target.value)
    const handleMatchInputChange = (e) => setMatchInput(e.target.value)

    const isIdError = idInput === ""
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
                    <FormErrorMessage pl={2}>ID is required</FormErrorMessage>
                )}
            </FormControl>
            <FormControl isInvalid={isMatchError}>
                <Select onChange={handleMatchInputChange}>
                    <option value="full" selected={match === "full"}>
                        Full
                    </option>
                    <option value="partial" selected={match === "partial"}>
                        Partial
                    </option>
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
                <Select onChange={handleMatchInputChange}>
                    <option value="string" selected={type === "string"}>
                        String
                    </option>
                    <option value="number" selected={type === "number"}>
                        Number
                    </option>
                </Select>
                {!isIdError ? (
                    <FormHelperText pl={2}>Attribute data type</FormHelperText>
                ) : (
                    <FormErrorMessage pl={2}>
                        Data type is required
                    </FormErrorMessage>
                )}
            </FormControl>
        </HStack>
    )
}

export default Item
