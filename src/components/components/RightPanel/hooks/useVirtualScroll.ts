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
  const buffer = Math.ceil(containerWidth / CELL_WIDTH) + 14; // Increased buffer for fast scrolling
  
  const visibleStartIndex = Math.max(0, Math.floor(scrollLeft / CELL_WIDTH) - buffer);
  const visibleEndIndex = Math.min(
    dates.length - 1,
    Math.ceil((scrollLeft + containerWidth) / CELL_WIDTH) + buffer
  );

  // Ensure we always render at least enough dates to fill the container
  const minVisibleCount = Math.ceil(containerWidth / CELL_WIDTH) + 7; // Minimum dates to render
  const actualVisibleCount = visibleEndIndex - visibleStartIndex + 1;
  
  // If we're not rendering enough dates, extend the range
  const finalVisibleEndIndex = Math.min(
    dates.length - 1,
    Math.max(visibleEndIndex, visibleStartIndex + minVisibleCount - 1)
  );

  return {
    visibleStartIndex,
    visibleEndIndex: finalVisibleEndIndex,
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