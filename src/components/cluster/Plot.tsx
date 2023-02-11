import { Text, VStack } from "@chakra-ui/react"
import dynamic from "next/dynamic"

const Plotly = dynamic(() => import("react-plotly.js"), {
    ssr: false
})

const Plot = ({
    title,
    data
}: {
    title: string
    data: {
        [key: string]: { [key: string]: string | number }
    }
}) => {
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
                <Plotly
                    style={{ width: "100%" }}
                    data={[
                        {
                            x: Object.values(data["SALES"] || {}),
                            y: Object.values(data["QUANTITYORDERED"] || {}),
                            xaxis: "SALES",
                            yaxis: "QUANTITYORDERED",
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
                        xaxis: { title: "SALES" },
                        yaxis: { title: "QUANTITYORDERED" }
                    }}
                />
                )
            </VStack>
        </VStack>
    )
}

export default Plot
