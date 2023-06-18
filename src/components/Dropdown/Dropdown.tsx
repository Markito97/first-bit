import { FC, ReactNode } from "react";
import "./Dropdown.css";

export const Dropdown: FC<{ isOpen: boolean; children: ReactNode }> = ({
  isOpen,
  children,
}): JSX.Element | undefined => {
  if (isOpen) return <div className="dropdown-wrapper">{children}</div>;
};
