
    import { useMemo } from "react";

    // Hook to get all dates between start and end (inclusive)
    export function useDatesInRange(start: Date, end: Date): Date[] {
        return useMemo(() => {
            const dates = [];
            let current = new Date(start);
            while (current <= end) {
                dates.push(new Date(current));
                current.setDate(current.getDate() + 1);
            }
            return dates;
        }, [start, end]);
    }

    // Helper to get Sunday of the week
    function getSundayOfWeek(date: Date): Date {
        const sunday = new Date(date);
        const dayOfWeek = sunday.getDay();
        sunday.setDate(sunday.getDate() - dayOfWeek);
        return sunday;
    }

    // Helper to get all 7 days of a week starting from Sunday
    function getCompleteWeek(weekStart: Date): Date[] {
        const week: Date[] = [];
        for (let i = 0; i < 7; i++) {
            const day = new Date(weekStart);
            day.setDate(day.getDate() + i);
            week.push(day);
        }
        return week;
    }

    export function useGroupDatesByWeek(dates: Date[]): { weekStart: Date; dates: Date[] }[] {
        return useMemo(() => {
            const weeks: { weekStart: Date; dates: Date[] }[] = [];
            let currentWeek: Date[] = [];
            let currentWeekStart: Date | null = null;

            dates.forEach(date => {
                const sundayOfWeek = getSundayOfWeek(date);

                if (!currentWeekStart || sundayOfWeek.getTime() !== currentWeekStart.getTime()) {
                    if (currentWeek.length > 0) {
                        weeks.push({ weekStart: currentWeekStart!, dates: currentWeek });
                    }
                    currentWeek = [date];
                    currentWeekStart = sundayOfWeek;
                } else {
                    currentWeek.push(date);
                }
            });

            if (currentWeek.length > 0) {
                weeks.push({ weekStart: currentWeekStart!, dates: currentWeek });
            }

            return weeks;
        }, [dates]);
    }

    // New function that ensures complete weeks with all 7 days
    export function useCompleteWeeks(dates: Date[]): { weekStart: Date; dates: Date[] }[] {
        return useMemo(() => {
            if (dates.length === 0) return [];

            const weeks: { weekStart: Date; dates: Date[] }[] = [];
            const weekStarts = new Set<string>();

            // Find all unique week starts
            dates.forEach(date => {
                const sundayOfWeek = getSundayOfWeek(date);
                weekStarts.add(sundayOfWeek.toISOString());
            });

            // Create complete weeks for each week start
            weekStarts.forEach(weekStartISO => {
                const weekStart = new Date(weekStartISO);
                const completeWeek = getCompleteWeek(weekStart);
                weeks.push({ weekStart, dates: completeWeek });
            });

            // Sort weeks by start date
            weeks.sort((a, b) => a.weekStart.getTime() - b.weekStart.getTime());

            return weeks;
        }, [dates]);
    }