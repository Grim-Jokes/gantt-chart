import { ROW_HEIGHT } from "../../../../config"
import type { BaseData, Entry } from "../../../../types"

interface RowProps<T extends BaseData> {
    entry: Entry<T>
}

export const Row = <T extends BaseData,>({ entry }: RowProps<T>) => {
    return <div className="entry-row" style={{ display: "flex", alignItems: "center", height: ROW_HEIGHT }}>
        <span className="col">
            {entry.content}
        </span>
        <span className="col">
            {entry.data?.startDate?.toLocaleDateString()}
        </span>
        <span className="col">
            {entry.data?.endDate?.toLocaleDateString()}
        </span>
    </div>
}