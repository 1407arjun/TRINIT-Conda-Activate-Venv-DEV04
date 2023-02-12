import axios from "axios"
import { Dispatch, SetStateAction } from "react"
import type Rule from "../types/Rule"

const processRules = async (
    rules: Rule[],
    count: number,
    endpoint: string,
    setData: Dispatch<
        SetStateAction<{
            [key: string]: { [key: string]: string | number }
        }>
    >
) => {
    try {
        const { data } = await axios.post("/api/process", {
            rules,
            count,
            endpoint
        })
        setData(data)
    } catch (e) {
        console.log(e)
    }
}

export default processRules
