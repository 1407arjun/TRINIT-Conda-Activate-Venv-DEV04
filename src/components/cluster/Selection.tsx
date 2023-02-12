import { FormControl, FormHelperText, HStack, Select } from "@chakra-ui/react"
import { Dispatch, FormEvent, SetStateAction, useState } from "react"
import type Rule from "../../types/Rule"

const Selection = ({
    rules,
    x,
    setX,
    y,
    setY
}: {
    rules: Rule[]
    x: string
    setX: Dispatch<SetStateAction<string>>
    y: string
    setY: Dispatch<SetStateAction<string>>
}) => {
    const handleXChange = (e: FormEvent<HTMLSelectElement>) =>
        setX((e.target as HTMLSelectElement).value)
    const handleYChange = (e: FormEvent<HTMLSelectElement>) =>
        setY((e.target as HTMLSelectElement).value)

    return (
        <HStack w="100%">
            <FormControl>
                <Select
                    onChange={handleXChange}
                    defaultValue={rules[0] ? rules[0].id : ""}>
                    {rules.map((r) => (
                        <option key={r.id} value={r.id}>
                            {r.id}
                        </option>
                    ))}
                </Select>
                <FormHelperText pl={2}>on X-axis</FormHelperText>
            </FormControl>
            <FormControl>
                <Select
                    onChange={handleYChange}
                    defaultValue={
                        rules[1] ? rules[1].id : rules[0] ? rules[0].id : ""
                    }>
                    {rules.map((r) => (
                        <option key={r.id} value={r.id}>
                            {r.id}
                        </option>
                    ))}
                </Select>
                <FormHelperText pl={2}>on Y-axis</FormHelperText>
            </FormControl>
        </HStack>
    )
}

export default Selection
