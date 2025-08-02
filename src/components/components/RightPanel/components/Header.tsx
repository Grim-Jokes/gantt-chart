import type { RefObject } from "react";
import { useDatesInRange, useGroupDatesByWeek } from "../hooks/dates";
import { WeekHeaderSegment } from "./WeekHeaderSegment";
import { WeeklyDaySegment } from "./WeeklyHeadDaySegement";

interface HeaderProps  {
    startDate?: Date,
    endDate?: Date
    svgRef: RefObject<HTMLElement | null> 
    visibleStartIndex?: number
    visibleEndIndex?: number
    dates?: Date[]
}

export const Header = (props: HeaderProps) => {
    const { startDate, endDate, visibleStartIndex = 0, visibleEndIndex, dates = [] } = props;

    if (!startDate || !endDate) {
        return null;
    }

    const CELL_WIDTH = 40;

    // If we have virtual scroll data, use only visible dates
    // Otherwise, fall back to rendering all dates
    const datesToUse = dates.length > 0 && typeof visibleEndIndex === 'number' 
        ? dates.slice(visibleStartIndex, visibleEndIndex + 1)
        : useDatesInRange(startDate, endDate);
    
    const weeks = useGroupDatesByWeek(datesToUse);

    return <>
        {weeks.map((week) => {
                // Calculate the actual start index for this week in the full date range
                let weekStartX: number;
                if (dates.length > 0 && typeof visibleEndIndex === 'number') {
                    // For virtual scrolling, calculate position based on visible start index
                    const weekStartDate = week.dates[0];
                    const weekStartIndexInVisible = datesToUse.indexOf(weekStartDate);
                    const weekStartIndexInFull = visibleStartIndex + weekStartIndexInVisible;
                    weekStartX = weekStartIndexInFull * CELL_WIDTH;
                } else {
                    // For non-virtual scrolling, find the index in the full date range
                    const weekStartIndex = dates.length > 0 ? dates.indexOf(week.dates[0]) : 0;
                    weekStartX = weekStartIndex * CELL_WIDTH;
                }
                
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