import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
    initialColorMode: "light",
    useSystemColorMode: false,
    colors: {
        light: {},
        dark: {}
    },
    fonts: {
        heading: "Montserrat",
        body: "Montserrat"
    }
})

export default theme
