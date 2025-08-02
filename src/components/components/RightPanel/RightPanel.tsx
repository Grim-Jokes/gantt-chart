import { useRef, useState, useEffect } from "react";
import type { Entry } from "../../../types";
import { Header } from "./components/Header";
import { useVirtualScroll, useScrollHandler } from "./hooks/useVirtualScroll";
import { useInfiniteScroll } from "./hooks/useInfiniteScroll";
import { useDatesInRange } from "./hooks/dates";

interface RightPanelProps {
  entries: Entry[];
  width: number;
  startDate: Date,
  endDate: Date;
  onDateRangeChange?: (newStartDate: Date, newEndDate: Date) => void;
}

export const RightPanel = ({ 
  entries, 
  width = 50, 
  startDate, 
  endDate, 
  onDateRangeChange 
}: RightPanelProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [currentStartDate, setCurrentStartDate] = useState(startDate);
  const [currentEndDate, setCurrentEndDate] = useState(endDate);
  
  // Get all dates in range
  const dates = useDatesInRange(currentStartDate, currentEndDate);
  
  // Calculate virtual scroll state
  const virtualScroll = useVirtualScroll(dates, containerWidth, scrollLeft);
  
  // Handle infinite scroll
  const handleExtendStart = (newStartDate: Date) => {
    const extendedStartDate = new Date(newStartDate);
    extendedStartDate.setDate(extendedStartDate.getDate() - 365); // Add 1 year to start
    setCurrentStartDate(extendedStartDate);
    onDateRangeChange?.(extendedStartDate, currentEndDate);
  };

  const handleExtendEnd = (newEndDate: Date) => {
    const extendedEndDate = new Date(newEndDate);
    extendedEndDate.setDate(extendedEndDate.getDate() + 365); // Add 1 year to end
    setCurrentEndDate(extendedEndDate);
    onDateRangeChange?.(currentStartDate, extendedEndDate);
  };

  const infiniteScroll = useInfiniteScroll(containerRef as React.RefObject<HTMLElement>, {
    onExtendStart: handleExtendStart,
    onExtendEnd: handleExtendEnd,
    threshold: 500, // Increased threshold to trigger extension earlier
    debounceMs: 1000, // Increased debounce to prevent rapid extensions
    totalWidth: virtualScroll.totalWidth
  });
  
  // Handle scroll events
  useScrollHandler(containerRef as React.RefObject<HTMLElement>, setScrollLeft);
  
  // Update container width on resize
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };
    
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Update dates when props change
  useEffect(() => {
    setCurrentStartDate(startDate);
    setCurrentEndDate(endDate);
  }, [startDate, endDate]);

  return (
    <div 
      ref={containerRef}
      style={{ 
        width: `${width}%`, 
        height: "100%",
        overflow: "auto",
        position: "relative",
        cursor: infiniteScroll.isDragging ? "grabbing" : "grab",
        userSelect: "none"
      }}
      onMouseDown={infiniteScroll.handleMouseDown}
      onMouseMove={infiniteScroll.handleMouseMove}
      onMouseUp={infiniteScroll.handleMouseUp}
      onMouseLeave={infiniteScroll.handleMouseUp}
      onScroll={infiniteScroll.handleScroll}
    >
      <div style={{ width: `${virtualScroll.totalWidth}px`, height: "100%" }}>
        <svg width="100%" height="100%">
          <Header 
            startDate={currentStartDate} 
            endDate={currentEndDate} 
            svgRef={containerRef}
            visibleStartIndex={virtualScroll.visibleStartIndex}
            visibleEndIndex={virtualScroll.visibleEndIndex}
            dates={dates}
          />
        </svg>
      </div>
    </div>
  );
};