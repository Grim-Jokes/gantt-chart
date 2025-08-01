
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