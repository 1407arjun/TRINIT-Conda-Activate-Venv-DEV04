import type Rule from "./Rule"

type Cluster = {
    name: string
    id: string
    rules: {
        [key: string]: Rule
    }
}

export default Cluster
