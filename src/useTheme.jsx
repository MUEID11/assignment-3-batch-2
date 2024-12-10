import { useContext } from "react";
import { ThemeContext } from "./assets/context";

export default function useTheme() {
  return useContext(ThemeContext);
}
