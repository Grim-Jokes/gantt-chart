import type { Entry } from "../../../types";

interface RightPanelProps {
  entries: Entry[];
  width: number;
}

export const RightPanel = ({ entries, width = 50 }: RightPanelProps) => {
  return <div style={{ width: `${width}%`, height: "100%" }}>
    <svg width="100%" height="100%">

    </svg>
    </div>
};