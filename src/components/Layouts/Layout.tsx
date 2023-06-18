import { Outlet } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";
import { Sidebar } from "../Sidebar/Sidebar";
import "./Layout.css";

export const Layout = (): JSX.Element => {
  return (
    <div className="wrapper">
      <header>
        <Navbar />
      </header>
      <main>
        <div className="layout-container">
          <Sidebar />
          <Outlet />
        </div>
      </main>
    </div>
  );
};
