import DataType from "./DataType"
import MatchType from "./MatchType"

type Rule = {
    id: string
    match: MatchType
    type: DataType
    priority: 0 | 1 | 2 | 3 | 4 | 5
}

export default Rule
