import { Text, VStack } from "@chakra-ui/react"
import dynamic from "next/dynamic"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import type Rule from "../../types/Rule"
import processRules from "../../util/processRules"
import Selection from "./Selection"

const Plotly = dynamic(() => import("react-plotly.js"), {
    ssr: false
})

const Plot = ({
    title,
    data,
    setData,
    rules
}: {
    title: string
    data: {
        [key: string]: { [key: string]: string | number }
    }
    setData: Dispatch<
        SetStateAction<{
            [key: string]: { [key: string]: string | number }
        }>
    >
    rules: Rule[]
}) => {
    const [x, setX] = useState(rules[0].id || "")
    const [y, setY] = useState(rules[1].id || rules[0].id || "")

    // useEffect(() => {
    //     processRules(rules, 3, setData)
    // })

    return (
        <VStack spacing={4} w="100%">
            <Text fontSize="lg" w="100%" fontWeight="semibold" color="#486282">
                Cluster vizualization
            </Text>
            <VStack
                w="100%"
                spacing={6}
                bgColor="white"
                shadow="md"
                rounded="lg"
                px={4}
                py={5}>
                <Selection rules={rules} x={x} setX={setX} y={y} setY={setY} />
                <Plotly
                    style={{ width: "100%" }}
                    data={[
                        {
                            x: Object.values(data[x] || {}),
                            y: Object.values(data[y] || {}),
                            xaxis: x,
                            yaxis: y,
                            type: "scatter",
                            mode: "markers",
                            marker: {
                                color: Object.values(data["Cluster"] || {}),
                                sizemax: 30
                            },
                            opacity: 0.8,
                            //@ts-ignore
                            hovertext: Object.values(data["STATUS"] || {})
                        }
                    ]}
                    layout={{
                        title,
                        xaxis: { title: x },
                        yaxis: { title: y }
                    }}
                />
                )
            </VStack>
        </VStack>
    )
}

export default Plot
