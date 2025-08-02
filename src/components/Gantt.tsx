import { useRef, useState } from "react";
import type { BaseData, Entry } from "../types";
import { LeftPanel } from "./components/LeftPanel";
import { RightPanel } from "./components/RightPanel";
import { useWidth } from "./hooks/useWidth";

import "./Gantt.css"

interface GanttProps<T extends BaseData> {
  entries: Entry<T>[];
  headers: Record<string, string>
  leftPanelClassName?: string;
  startDate?: Date,
  endDate?: Date
}

export const Gantt = ({ headers={}, entries  = [], leftPanelClassName, startDate = new Date(), endDate =new Date(new Date().setDate(365)) }: GanttProps<BaseData> ) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width, handleResize } = useWidth({ containerRef });
  const [currentStartDate, setCurrentStartDate] = useState(startDate);
  const [currentEndDate, setCurrentEndDate] = useState(endDate);

  const handleDateRangeChange = (newStartDate: Date, newEndDate: Date) => {
    setCurrentStartDate(newStartDate);
    setCurrentEndDate(newEndDate);
  };

  return (
    <div className="gantt" style={{ width: "100%", height: "100vh", position: "relative" }} ref={containerRef}>
      {/* Right panel - scrollable and positioned behind left panel */}
      <div style={{ 
        position: "absolute", 
        left: 0, 
        top: 0, 
        right: 0, 
        bottom: 0,
        zIndex: 1
      }}>
        <RightPanel 
          entries={entries} 
          width={100} 
          startDate={currentStartDate} 
          endDate={currentEndDate}
          onDateRangeChange={handleDateRangeChange}
        />
      </div>
      
      {/* Left panel - fixed position, overlaps right panel */}
      <div style={{ 
        position: "absolute", 
        left: 0, 
        top: 0, 
        bottom: 0,
        zIndex: 10,
        width: `${width}%`
      }}>
        <LeftPanel 
          className={leftPanelClassName}  
          headers={headers} 
          entries={entries} 
          width={100} 
          onDividerDrag={handleResize} 
        />
      </div>
    </div>
  );
};