import type { RefObject } from "react";
import { useDatesInRange, useGroupDatesByWeek } from "../hooks/dates";
import { WeekHeaderSegment } from "./WeekHeaderSegment";
import { WeeklyDaySegment } from "./WeeklyHeadDaySegement";

interface HeaderProps  {
    startDate?: Date,
    endDate?: Date
    svgRef: RefObject<HTMLOrSVGElement | null> 
}

export const Header = (props: HeaderProps) => {
    const { startDate, endDate } = props;

    if (!startDate || !endDate) {
        return null;
    }



    const CELL_WIDTH = 40;

    const dates = useDatesInRange(startDate, endDate)
    const weeks = useGroupDatesByWeek(dates);



    return <>
        {weeks.map((week, weekIndex) => {
                const weekStartX = weekIndex === 0 ? 0 : weeks.slice(0, weekIndex).reduce((sum, w) => sum + w.dates.length * CELL_WIDTH, 0);
                const weekWidth = week.dates.length * CELL_WIDTH;
                
                // Get the start of week day name
                const weekStartDay = week.weekStart.toLocaleDateString(undefined, { 
                    month: 'short', 
                    day: 'numeric' ,
                    year: 'numeric'
                });

                return (
                    <g key={week.weekStart.toISOString()}>
                        <WeekHeaderSegment
                            weekStartX={weekStartX}
                            weekStartDay={weekStartDay}
                            weekWidth={weekWidth}
                        >
                            <WeeklyDaySegment weekStartX={weekStartX}  week={week} key={week.weekStart.toISOString()} />
                        </WeekHeaderSegment>
                    </g>
                );
            })}
            </>
}