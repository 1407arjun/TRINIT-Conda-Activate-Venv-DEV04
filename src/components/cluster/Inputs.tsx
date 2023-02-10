import { useState } from "react"
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

const Inputs = () => {
    const [idInput, setIdInput] = useState("")
    const [typeInput, setTypeInput] = useState("")
    const [matchInput, setMatchInput] = useState("")

    const handleIdInputChange = (e) => {
        setIsIdError(false)
        setIdInput(e.target.value)
    }
    const handleTypeInputChange = (e) => setTypeInput(e.target.value)
    const handleMatchInputChange = (e) => setMatchInput(e.target.value)

    const [isIdError, setIsIdError] = useState(false)
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
                    <option value="full" selected>
                        Full
                    </option>
                    <option value="partial">Partial</option>
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
                    <option value="string" selected>
                        String
                    </option>
                    <option value="number">Number</option>
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
                    if (idInput.trim() === "") setIsIdError(true)
                    else {
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
