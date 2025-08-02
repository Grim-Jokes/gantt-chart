import { useRef, useState, useEffect } from "react";
import type { Entry } from "../../../types";
import { Header } from "./components/Header";
import { useVirtualScroll, useScrollHandler } from "./hooks/useVirtualScroll";
import { useDatesInRange } from "./hooks/dates";

interface RightPanelProps {
  entries: Entry[];
  width: number;
  startDate: Date,
  endDate: Date;
}

export const RightPanel = ({ width = 50, startDate, endDate }: RightPanelProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  
  // Get all dates in range
  const dates = useDatesInRange(startDate, endDate);
  
  // Calculate virtual scroll state
  const virtualScroll = useVirtualScroll(dates, containerWidth, scrollLeft);
  
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

  return (
    <div 
      ref={containerRef}
      style={{ 
        width: `${width}%`, 
        height: "100%",
        overflow: "auto",
        position: "relative"
      }}
    >
      <div style={{ width: `${virtualScroll.totalWidth}px`, height: "100%" }}>
        <svg width={virtualScroll.totalWidth} height="100%">
          <Header 
            startDate={startDate} 
            endDate={endDate} 
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