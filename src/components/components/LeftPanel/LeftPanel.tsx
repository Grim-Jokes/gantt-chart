import { useMemo } from "react";
import type { BaseData, Entry } from "../../../types";
import { Header } from "./components/Header";
import { Rows } from "./components/Rows";
import "./LeftPanel.css";

export type Header = string;

export type HeaderFieldMap = Record<Header, string>;

interface LeftPanelProps<T extends BaseData> {  
    entries: Entry<T>[];
    onDividerDrag: (e: React.MouseEvent<HTMLDivElement>) => void;
    width: number;
    className?: string;
    headers: Record<string, string>
}

export const LeftPanel = <T extends BaseData,>({ entries, headers, width, className, onDividerDrag }: LeftPanelProps<T>) => {
  const headerFields = useMemo(() => Object.keys(headers), [headers])

  return (
    <div className={`left-panel ${className}`} style={{ width: `${width}%` }}>
      <Header headers={headerFields} />

      <Rows entries={entries} />
      
      <div 
        className="drag-handle" 
        onMouseDown={onDividerDrag}
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: '4px',
          cursor: 'col-resize',
          backgroundColor: 'transparent'
        }}
      />
    </div>
  );
};