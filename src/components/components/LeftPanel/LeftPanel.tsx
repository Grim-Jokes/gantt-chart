import type { Entry } from "../../../types";
import "./LeftPanel.css";

export type Header = string;

export type HeaderFieldMap = Record<Header, string>;

interface LeftPanelProps {  
    entries: Entry[];
    onDividerDrag: (e: React.MouseEvent<HTMLDivElement>) => void;
    width: number;
    className?: string;
    headers: Record<string, string>
}

export const LeftPanel = ({ entries, headers, width, className, onDividerDrag }: LeftPanelProps) => {

  const headerFields = Object.keys(headers)


  return (
    <div className={`left-panel ${className}`} style={{ width: `${width}%` }}>

      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {headerFields.map((header: string) => (<div key={header}>{header}</div>))}
      </div>

      {entries.map((entry) => (
        <div key={entry.id}>
          <div>{entry.content}</div>
        </div>
      ))}
      
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