import type { BaseData, Entry } from "../../../../types"
import { Row } from "./Row"

interface RowsProps<T extends BaseData> {
    entries: Entry<T>[]
}

export const Rows = ({ entries}: RowsProps) => {
    return <div className="entry-rows"> 
        {entries.map((entry) => (
          <Row key={entry.id} entry={entry} />
        ))}
      </div>
}