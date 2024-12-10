import { sortByDate } from ".";
import { ADD_TASK, DELETE_TASK, EDIT_TASK, SEARCH_QUERY, SORT_ORDER_TOGGLE } from "./action";
import { initialTaskData } from "./initialTaskData";


const initialState = {
  tasks: initialTaskData,
  allTasks: initialTaskData,
  sortOrder: "desc",
  searchQuery: "",
};

const TaskReducer = (state, action) => {
  switch (action.type) {
    case ADD_TASK: {
      // Add the new task and sort tasks after addition
      const addedTasks = [...state.tasks, action.payload];
      return {
        ...state,
        tasks: sortByDate(addedTasks, state.sortOrder), // Sort after adding task
        allTasks: sortByDate(addedTasks, state.sortOrder), // Ensure allTasks is also sorted
      };
    }

    case EDIT_TASK: {
      const updatedTasks = state.tasks.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
      return {
        ...state,
        tasks: sortByDate(updatedTasks, state.sortOrder), // Sort tasks after editing
      };
    }

    case DELETE_TASK: {
      const remainingTasks = state.tasks.filter((task) => task.id !== action.payload);
      return {
        ...state,
        tasks: sortByDate(remainingTasks, state.sortOrder), // Sort tasks after deletion
      };
    }

    case SORT_ORDER_TOGGLE: {
      const { category, sortOrder } = action.payload;
      const sortedTasks = [...state.tasks];
      const filteredTasks = sortedTasks.filter((task) => task.category === category);
      filteredTasks.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
      });

      return {
        ...state,
        tasks: [
          ...state.tasks.filter((task) => task.category !== category),
          ...filteredTasks,
        ],
      };
    }

    case SEARCH_QUERY: {
      const { searchQuery } = action.payload;
      if (searchQuery.trim() === "") {
        return {
          ...state,
          tasks: state.allTasks,
        };
      }

      const filteredTasks = state.tasks.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      );

      return {
        ...state,
        tasks: sortByDate(filteredTasks, state.sortOrder), // Sort filtered tasks after search
      };
    }

    default:
      return state;
  }
};

export { initialState, TaskReducer };
