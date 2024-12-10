import { createContext, useReducer, useState } from "react";
import { initialState, TaskReducer } from "./TaskReducer";
import { ADD_TASK, DELETE_TASK, EDIT_TASK, SEARCH_QUERY, SORT_ORDER_TOGGLE } from "./action";
import { categoryStyles } from ".";

const TasksContext = createContext();
const ThemeContext = createContext();
const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TaskReducer, initialState);
//States for components
  const [isEditing, setIsEditing] = useState(false);
  const [existingTask, setExistingTask] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [darkMode, setDarkMode] = useState(false)
//separating categories 
const categories = Object.keys(categoryStyles);

//dispatches 
  const addTask = (task) => dispatch({ type: ADD_TASK, payload: task });

  const editTask = (updateTask) =>
    dispatch({ type: EDIT_TASK, payload: updateTask });

  const deleteTask = (id) => dispatch({ type: DELETE_TASK, payload: id });

  const sortTask = (category, sortOrder) =>
    dispatch({
      type: SORT_ORDER_TOGGLE,
      payload: { category, sortOrder },
    });

  const searchTask = (searchQuery) => dispatch({type:SEARCH_QUERY, payload: {searchQuery}})
  return (
    <TasksContext.Provider
      value={{
        tasks: state.tasks,
        sortOrder: state.sortOrder,
        searchQuery: state.searchQuery,
        isEditing,
        existingTask,
        categories,
        showModal,
        setShowModal,
        sortTask,
        addTask,
        editTask,
        deleteTask,
        setIsEditing,
        setExistingTask,
        searchTask
      }}
    >
      <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
        {children}
      </ThemeContext.Provider>
    </TasksContext.Provider>
  );
};

export { TasksContext,ThemeContext, TaskProvider };
