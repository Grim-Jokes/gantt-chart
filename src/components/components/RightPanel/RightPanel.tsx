import { useRef } from "react";
import type { Entry } from "../../../types";
import { Header } from "./components/Header";

interface RightPanelProps {
  entries: Entry[];
  width: number;
  startDate: Date,
  endDate: Date;
}

export const RightPanel = ({ entries, width = 50, startDate, endDate }: RightPanelProps) => {
  const svgRef = useRef(null)

  return <div style={{ width: `${width}%`, height: "100%" }}>
    <svg width="100%" height="100%" ref={svgRef}>
      <Header startDate={startDate} endDate={endDate} svgRef={svgRef}  />
    </svg>
    </div>
};