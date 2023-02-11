import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
    initialColorMode: "light",
    useSystemColorMode: false,
    colors: {
        light: {},
        dark: {}
    },
    fonts: {
        heading: "Questrial",
        body: "Questrial"
    }
})

export default theme
