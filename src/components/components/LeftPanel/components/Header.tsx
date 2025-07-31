
export interface HeaderProps {
    headers: string[];
}
export const Header = ({ headers }: HeaderProps) => {
  return <div className="gantt-header">
    {headers.map((header) => (
        <div key={header} className="gantt-header-item">{header}</div>
    ))}
  </div>;
};