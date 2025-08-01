import type { JSX } from "react"
import { HEADER_ROW_HEIGHT } from "../../../../config"

interface WeekHeaderProps {
    weekStartX: number,
    weekStartDay: string,
    weekWidth: number
    children :JSX.Element
}

export const WeekHeaderSegment = ({weekStartX, weekWidth, weekStartDay, children}: WeekHeaderProps) => {
    return  <>
    <rect
        x={weekStartX}
        y={0}
        width={weekWidth}
        height={HEADER_ROW_HEIGHT}
        fill="#f5f5f5"
        stroke="#e0e0e0"
    />
    <text
        x={weekStartX + weekWidth / 2}
        y={HEADER_ROW_HEIGHT / 3}
        textAnchor="middle"
        fontSize="12"
        fontWeight="bold"
        fill="#333"
        dominantBaseline="middle"
    >
        {weekStartDay}
    </text>
    <g transform={`translate(0, ${HEADER_ROW_HEIGHT})`}>
        {children}
    </g>
</>
} 