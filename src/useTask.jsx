import { useContext } from "react";
import { TasksContext } from "./assets/context";


export default function useTask() {
  return useContext(TasksContext);
}

