import { Panel } from "../../assets/Panel";
import "./Sidebar.css";

export const Sidebar = (): JSX.Element => {
  return (
    <div className="sidebar-wrapper">
      <ul className="sidebar-navigation">
        <li className="sidebar-navigation__link">
          <Panel />
          <span>Панель</span>
        </li>
      </ul>
    </div>
  );
};
