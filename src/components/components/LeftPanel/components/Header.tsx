import { HEADER_ROW_HEIGHT } from "../../../../config";

export interface HeaderProps {
    headers: string[]
}

export const Header = ({ headers }: HeaderProps) => {
  return <div className="header-row" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: HEADER_ROW_HEIGHT }}>
        {headers.map((header) => (

        <div
          key={header}
          className="col"
          style={{ display: "flex", alignItems: "center", height: "100%" }}
        >
          {header}
        </div>
    ))}
  </div>;
};