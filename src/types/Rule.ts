import DataType from "./DataType"
import MatchType from "./MatchType"

type Rule = {
    id: string
    match: MatchType
    type: DataType
}

export default Rule
