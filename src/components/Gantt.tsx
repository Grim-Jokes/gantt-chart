import { useRef } from "react";
import type { BaseData, Entry } from "../types";
import { LeftPanel } from "./components/LeftPanel";
import { RightPanel } from "./components/RightPanel";
import { useWidth } from "./hooks/useWidth";

import "./Gantt.css"

interface GanttProps<T extends BaseData> {
  entries: Entry<T>[];
  headers: Record<string, string>
  leftPanelClassName?: string;
}

export const Gantt = ({ headers={}, entries  = [], leftPanelClassName }: GanttProps<BaseData> ) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width, handleResize } = useWidth({ containerRef });

  return <div className="gantt" style={{ width: "100%", height: "100vh", display: "flex" }} ref={containerRef}>
    <LeftPanel 
      className={leftPanelClassName}  
      headers={headers} 
      entries={entries} 
      width={width} 
      onDividerDrag={handleResize} />
    <RightPanel entries={entries} width={100 - width} />
  </div>;
};