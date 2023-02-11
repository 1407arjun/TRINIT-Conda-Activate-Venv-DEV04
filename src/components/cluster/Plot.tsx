import { Text, VStack } from "@chakra-ui/react"
import dynamic from "next/dynamic"

const Plotly = dynamic(() => import("react-plotly.js"), {
    ssr: false
})

const sample = {
    Name: {
        "0": 7,
        "1": 3,
        "2": 1,
        "3": 8,
        "4": 2,
        "5": 4,
        "6": 0,
        "7": 9,
        "8": 5,
        "9": 6
    },
    Age: {
        "0": 0,
        "1": 0,
        "2": -1.8257418584,
        "3": 0,
        "4": 0.9128709292,
        "5": -1.8257418584,
        "6": 0.9128709292,
        "7": 0.9128709292,
        "8": 0,
        "9": 0.9128709292
    },
    gender: {
        "0": 1,
        "1": 1,
        "2": 1,
        "3": 1,
        "4": 1,
        "5": 0,
        "6": 1,
        "7": 0,
        "8": 0,
        "9": 1
    },
    Dob: {
        "0": 0,
        "1": 9,
        "2": 4,
        "3": 2,
        "4": 8,
        "5": 1,
        "6": 5,
        "7": 6,
        "8": 7,
        "9": 3
    },
    City: {
        "0": 1,
        "1": 7,
        "2": 5,
        "3": 0,
        "4": 4,
        "5": 3,
        "6": 8,
        "7": 2,
        "8": 6,
        "9": 3
    },
    State: {
        "0": 0,
        "1": 5,
        "2": 3,
        "3": 1,
        "4": 8,
        "5": 2,
        "6": 6,
        "7": 7,
        "8": 4,
        "9": 2
    },
    Country: {
        "0": 0,
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
        "6": 0,
        "7": 0,
        "8": 0,
        "9": 1
    },
    email: {
        "0": 9,
        "1": 5,
        "2": 1,
        "3": 4,
        "4": 2,
        "5": 6,
        "6": 0,
        "7": 3,
        "8": 7,
        "9": 8
    },
    "IP Address": {
        "0": 4,
        "1": 7,
        "2": 0,
        "3": 9,
        "4": 2,
        "5": 8,
        "6": 3,
        "7": 1,
        "8": 6,
        "9": 5
    },
    "time of access (YYYY-MM-DDTHH-MM-SS)": {
        "0": 1,
        "1": 6,
        "2": 2,
        "3": 2,
        "4": 4,
        "5": 5,
        "6": 3,
        "7": 7,
        "8": 0,
        "9": 3
    },
    "Browser Detail": {
        "0": 0,
        "1": 2,
        "2": 0,
        "3": 0,
        "4": 1,
        "5": 3,
        "6": 0,
        "7": 0,
        "8": 0,
        "9": 0
    },
    Cluster: {
        "0": 0,
        "1": 1,
        "2": 1,
        "3": 0,
        "4": 1,
        "5": 0,
        "6": 1,
        "7": 1,
        "8": 1,
        "9": 0
    }
}

const subset0 = {
    Name: { "0": 7, "3": 8, "5": 4, "9": 6 },
    Age: { "0": 0, "3": 0, "5": -1.8257418584, "9": 0.9128709292 },
    gender: { "0": 1, "3": 1, "5": 0, "9": 1 },
    Dob: { "0": 0, "3": 2, "5": 1, "9": 3 },
    City: { "0": 1, "3": 0, "5": 3, "9": 3 },
    State: { "0": 0, "3": 1, "5": 2, "9": 2 },
    Country: { "0": 0, "3": 0, "5": 0, "9": 1 },
    email: { "0": 9, "3": 4, "5": 6, "9": 8 },
    "IP Address": { "0": 4, "3": 9, "5": 8, "9": 5 },
    "time of access (YYYY-MM-DDTHH-MM-SS)": { "0": 1, "3": 2, "5": 5, "9": 3 },
    "Browser Detail": { "0": 0, "3": 0, "5": 3, "9": 0 },
    Cluster: { "0": 0, "3": 0, "5": 0, "9": 0 }
}

const subset1 = {
    Name: { "1": 3, "2": 1, "4": 2, "6": 0, "7": 9, "8": 5 },
    Age: {
        "1": 0,
        "2": -1.8257418584,
        "4": 0.9128709292,
        "6": 0.9128709292,
        "7": 0.9128709292,
        "8": 0
    },
    gender: { "1": 1, "2": 1, "4": 1, "6": 1, "7": 0, "8": 0 },
    Dob: { "1": 9, "2": 4, "4": 8, "6": 5, "7": 6, "8": 7 },
    City: { "1": 7, "2": 5, "4": 4, "6": 8, "7": 2, "8": 6 },
    State: { "1": 5, "2": 3, "4": 8, "6": 6, "7": 7, "8": 4 },
    Country: { "1": 0, "2": 0, "4": 0, "6": 0, "7": 0, "8": 0 },
    email: { "1": 5, "2": 1, "4": 2, "6": 0, "7": 3, "8": 7 },
    "IP Address": { "1": 7, "2": 0, "4": 2, "6": 3, "7": 1, "8": 6 },
    "time of access (YYYY-MM-DDTHH-MM-SS)": {
        "1": 6,
        "2": 2,
        "4": 4,
        "6": 3,
        "7": 7,
        "8": 0
    },
    "Browser Detail": { "1": 2, "2": 0, "4": 1, "6": 0, "7": 0, "8": 0 },
    Cluster: { "1": 1, "2": 1, "4": 1, "6": 1, "7": 1, "8": 1 }
}

const Plot = ({ title }: { title: string }) => {
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
                            x: Object.values(sample["Name"]),
                            y: Object.values(sample["Age"]),
                            type: "scatter",
                            mode: "markers",
                            marker: { color: "Cluster", sizemax: 30 }
                        }
                    ]}
                    layout={{
                        title,
                        shapes: [
                            {
                                type: "circle",
                                xref: "x",
                                yref: "y",
                                x0: Math.min(...Object.values(subset0["Name"])),
                                y0: Math.min(...Object.values(subset0["Age"])),
                                x1: Math.max(...Object.values(subset0["Name"])),
                                y1: Math.max(...Object.values(subset0["Age"])),
                                opacity: 0.3,
                                fillcolor: "blue",
                                line: { color: "blue" }
                            },
                            {
                                type: "circle",
                                xref: "x",
                                yref: "y",
                                x0: Math.min(...Object.values(subset1["Name"])),
                                y0: Math.min(...Object.values(subset1["Age"])),
                                x1: Math.max(...Object.values(subset1["Name"])),
                                y1: Math.max(...Object.values(subset1["Age"])),
                                opacity: 0.3,
                                fillcolor: "red",
                                line: { color: "red" }
                            }
                        ]
                    }}
                />
                )
            </VStack>
        </VStack>
    )
}

export default Plot
