import { NavLink as RouterNavLink } from "react-router-dom";
import type { ReactNode } from "react";

interface Props {
  to: string;
  children: ReactNode;
}

export default function NavLink({ to, children }: Props) {
  return (
    <RouterNavLink
      to={to}
      style={({ isActive }) => ({
        color: isActive ? "#a5b4fc" : "#9ca3af",
        textDecoration: "none",
        fontWeight: isActive ? "bold" : "normal",
      })}
    >
      {children}
    </RouterNavLink>
  );
}