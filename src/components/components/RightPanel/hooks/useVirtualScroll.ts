import { useEffect, useCallback } from "react";
import { CELL_WIDTH } from "../../../../config";

interface VirtualScrollState {
  visibleStartIndex: number;
  visibleEndIndex: number;
  totalWidth: number;
  scrollLeft: number;
}

export function useVirtualScroll(
  dates: Date[],
  containerWidth: number,
  scrollLeft: number = 0
): VirtualScrollState {
  const totalWidth = dates.length * CELL_WIDTH;
  
  // Calculate which dates are visible based on scroll position
  // Add buffer to ensure all days in visible weeks are rendered
  const buffer = Math.ceil(containerWidth / CELL_WIDTH) + 7; // Add extra buffer for week boundaries
  
  const visibleStartIndex = Math.max(0, Math.floor(scrollLeft / CELL_WIDTH) - buffer);
  const visibleEndIndex = Math.min(
    dates.length - 1,
    Math.ceil((scrollLeft + containerWidth) / CELL_WIDTH) + buffer
  );

  return {
    visibleStartIndex,
    visibleEndIndex,
    totalWidth,
    scrollLeft,
  };
}

export function useScrollHandler(
  containerRef: React.RefObject<HTMLElement>,
  onScrollChange: (scrollLeft: number) => void
) {
  const handleScroll = useCallback((event: Event) => {
    const target = event.target as HTMLElement;
    onScrollChange(target.scrollLeft);
  }, [onScrollChange]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [containerRef, handleScroll]);
} 