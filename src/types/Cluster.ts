import type Rule from "./Rule"

type Cluster = {
    name: string
    id: string
    rules: Rule[]
    endpoint: string
}

export default Cluster
