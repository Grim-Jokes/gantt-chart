import { useState, useCallback, useRef, useEffect } from "react";

interface InfiniteScrollState {
  isDragging: boolean;
  startX: number;
  scrollLeft: number;
}

interface InfiniteScrollOptions {
  onExtendStart?: (newStartDate: Date) => void;
  onExtendEnd?: (newEndDate: Date) => void;
  threshold?: number; // pixels from edge to trigger extension
  debounceMs?: number; // debounce time for extensions
  totalWidth?: number; // total width of content for percentage-based triggering
}

export function useInfiniteScroll(
  containerRef: React.RefObject<HTMLElement>,
  options: InfiniteScrollOptions = {}
) {
  const { onExtendStart, onExtendEnd, threshold = 100, debounceMs = 500, totalWidth = 0 } = options;
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const isMouseDown = useRef(false);
  const lastExtendTime = useRef(0);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    isMouseDown.current = true;
    setIsDragging(true);
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeft(containerRef.current?.scrollLeft || 0);
  }, [containerRef]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isMouseDown.current) return;
    
    e.preventDefault();
    const x = e.pageX - (containerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2; // Scroll speed multiplier
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollLeft - walk;
    }
  }, [containerRef, startX, scrollLeft]);

  const handleMouseUp = useCallback(() => {
    isMouseDown.current = false;
    setIsDragging(false);
  }, []);

  const handleScroll = useCallback((e: React.UIEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    const { scrollLeft, scrollWidth, clientWidth } = target;
    const now = Date.now();
    
    // Debounce extensions to prevent too many rapid calls
    if (now - lastExtendTime.current < debounceMs) {
      return;
    }
    
    // Calculate scroll percentage for more intelligent triggering
    const scrollPercentage = scrollLeft / (scrollWidth - clientWidth);
    
    // Check if we're near the start (extend backwards)
    // Trigger earlier if we're in the first 10% of scrollable area
    if ((scrollLeft < threshold || scrollPercentage < 0.1) && onExtendStart) {
      lastExtendTime.current = now;
      onExtendStart(new Date());
    }
    
    // Check if we're near the end (extend forwards)
    // Trigger earlier if we're in the last 10% of scrollable area
    if ((scrollLeft + clientWidth > scrollWidth - threshold || scrollPercentage > 0.9) && onExtendEnd) {
      lastExtendTime.current = now;
      onExtendEnd(new Date());
    }
  }, [threshold, onExtendStart, onExtendEnd, debounceMs]);

  return {
    isDragging,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleScroll,
  };
} 