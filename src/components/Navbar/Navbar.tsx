import { Bit } from "../../assets/Bit";
import "./Navbar.css";

export const Navbar = (): JSX.Element => {
  return (
    <nav className="nav">
      <div className="nav__logo">
        <Bit />
        <div>Энергия</div>
      </div>
    </nav>
  );
};
