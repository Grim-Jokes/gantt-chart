import { CELL_WIDTH, HEADER_ROW_HEIGHT, WEEKDAY_ROW_HEIGHT } from "../../../../config"

interface WeeklyDaySegment {
    weekStartX: number, 
    week: {
        dates: Date[]
    }
}

export const WeeklyDaySegment = ({week, weekStartX}: WeeklyDaySegment) => {
    return <>
    {week.dates.map((date, dayIndex) => (
        <g key={date.toISOString()}>
            <rect
                x={weekStartX + dayIndex * CELL_WIDTH}
                y={HEADER_ROW_HEIGHT}
                width={CELL_WIDTH}
                height={WEEKDAY_ROW_HEIGHT}
                fill="#f5f5f5"
                stroke="#e0e0e0"
            />
            <text
                x={weekStartX + dayIndex * CELL_WIDTH + CELL_WIDTH / 2}
                y={HEADER_ROW_HEIGHT + WEEKDAY_ROW_HEIGHT / 2 + 2}
                textAnchor="middle"
                fontSize="12"
                fill="#888"
                dominantBaseline="middle"
            >
                {date.toLocaleDateString(undefined, { weekday: 'short' }).charAt(0)}
            </text>
        </g>))}
        </>
}