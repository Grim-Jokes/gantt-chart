import type { JSX } from "react"
import { WEEK_SEGMENT_HEIGHT } from "../../../../config"

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
        height={WEEK_SEGMENT_HEIGHT}
        fill="#f5f5f5"
        stroke="#e0e0e0"
    />
    <text
        x={weekStartX + weekWidth / 2}
        y={WEEK_SEGMENT_HEIGHT / 2 + 2}
        textAnchor="middle"
        fontSize="12"
        fontWeight="semibold"
        fill="#333"
        dominantBaseline="middle"
    >
        {weekStartDay}
    </text>
    {children}
</>
} 