import { CELL_WIDTH, WEEK_DAY_SEGMENT_HEIGHT, WEEK_SEGMENT_HEIGHT } from "../../../../config"

interface WeeklyDaySegment {
    weekStartX: number, 
    week: {
        dates: Date[]
    }
}

export const WeeklyDaySegment = ({week, weekStartX}: WeeklyDaySegment) => {
    return <>
    {week.dates.map((date, dayIndex) => {
        const dayX = weekStartX + dayIndex * CELL_WIDTH;
        
        return (
            <g key={date.toISOString()}>
                <rect
                    x={dayX}
                    y={WEEK_SEGMENT_HEIGHT}
                    width={CELL_WIDTH}
                    height={WEEK_DAY_SEGMENT_HEIGHT}
                    fill="#f5f5f5"
                    stroke="#e0e0e0"
                />
                <text
                    x={dayX + CELL_WIDTH / 2}
                    y={WEEK_SEGMENT_HEIGHT + WEEK_DAY_SEGMENT_HEIGHT / 2 + 2}
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="semibold"
                    fill="#888"
                    dominantBaseline="middle"
                >
                    {date.toLocaleDateString(undefined, { weekday: 'short' }).charAt(0)}
                </text>
            </g>
        );
    })}
    </>
}