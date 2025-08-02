import type { RefObject } from "react";
import { useDatesInRange, useCompleteWeeks } from "../hooks/dates";
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
    
    // Use complete weeks to ensure all weeks have exactly 7 days
    const weeks = useCompleteWeeks(datesToUse);

    // Ensure we have at least one week to render
    if (weeks.length === 0) {
        return null;
    }

    return <>
        {weeks.map((week, weekIndex) => {
                // Calculate the actual start index for this week in the full date range
                let weekStartX: number;
                if (dates.length > 0 && typeof visibleEndIndex === 'number') {
                    // For virtual scrolling, calculate position based on visible start index
                    const weekStartDate = week.dates[0];
                    const weekStartIndexInVisible = datesToUse.indexOf(weekStartDate);
                    
                    // If the week start date is not in the visible dates, calculate based on week index
                    if (weekStartIndexInVisible === -1) {
                        weekStartX = (visibleStartIndex + weekIndex * 7) * CELL_WIDTH;
                    } else {
                        const weekStartIndexInFull = visibleStartIndex + weekStartIndexInVisible;
                        weekStartX = weekStartIndexInFull * CELL_WIDTH;
                    }
                } else {
                    // For non-virtual scrolling, find the index in the full date range
                    const weekStartIndex = dates.length > 0 ? dates.indexOf(week.dates[0]) : weekIndex * 7;
                    weekStartX = weekStartIndex * CELL_WIDTH;
                }
                
                // Ensure weekStartX is never negative
                weekStartX = Math.max(0, weekStartX);
                
                
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
                        >
                            <WeeklyDaySegment weekStartX={weekStartX}  week={week} key={week.weekStart.toISOString()} />
                        </WeekHeaderSegment>
                    </g>
                );
            })}
    </>
}