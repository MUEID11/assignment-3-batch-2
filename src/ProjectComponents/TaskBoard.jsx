import { categoryStyles } from "../assets";
import useTask from "../useTask";
import AddButton from "./AddButton";
import TaskCard from "./TaskCard"; 
import Modal from "./Modal";

export default function TaskBoard() {
  const { tasks,categories,showModal } = useTask();
  
  return (
    <div className="mx-auto max-w-7xl p-6">
      {/* Add Button */}
      <AddButton />
      {/*Add and Edit modal*/}
      {showModal && <Modal />}

      {/* Render Task Cards */}
      <div className="-mx-2 mb-6 flex flex-wrap">
        {categories.map((category) => {
          // Filter tasks for the current category
          const filteredTasks = tasks.filter(
            (task) => task.category === category
          );
          return (
            <div key={category} className="w-full sm:w-1/2 lg:w-1/4 px-2">
              <TaskCard
                filteredTasks={filteredTasks}
                category={category}
                bgColor={categoryStyles[category].bg}
                textColor={categoryStyles[category].text}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
