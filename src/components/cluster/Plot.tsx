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
                            y: Object.values(data["PRODUCTCODE"] || {}),
                            type: "scatter",
                            mode: "markers",
                            marker: {
                                color: Object.values(data["Cluster"] || {}),
                                sizemax: 30
                            },
                            opacity: 0.8,
                            hovertext: "STATUS"
                        }
                    ]}
                    layout={{
                        title
                    }}
                />
                )
            </VStack>
        </VStack>
    )
}

export default Plot
