/* eslint-disable react/prop-types */
import { useState } from "react";
import { formatDate } from "../assets";
import useTask from "../useTask";
import { toast } from "react-toastify";

const TaskCard = ({
  filteredTasks,
  category,
  bgColor,
  textColor,
}) => {
  const { deleteTask, sortTask, sortOrder, setIsEditing, setExistingTask ,setShowModal} =
    useTask();

  const [initialSortOrder, setInitialSortOrder] = useState(sortOrder);


  const handleSortToggle = () => {
    const updatedSortOrder = initialSortOrder === "desc" ? "asc" : "desc"; // Calculate new sort order
    setInitialSortOrder(updatedSortOrder);
    sortTask(category, updatedSortOrder);
  };

  const handleDeleteClick = (taskId) => {
    toast.dismiss(); // Close the confirmation toast when clicked
    deleteTask(taskId); // Call delete function
    toast.success('Item deleted successfully!');
  };

  const handleCancelClick = () => {
    toast.dismiss(); // Close the confirmation toast when clicked
    toast.info('Delete action canceled!');
  };

  const showDeleteToast = (taskId) => {
    toast.info(
      <div>
        <p>Are you sure you want to delete this item?</p>
        <button
          onClick={() => handleDeleteClick(taskId)}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
        >
          Yes, delete it!
        </button>
        <button
          onClick={handleCancelClick}
          className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 ml-2"
        >
          No, cancel
        </button>
      </div>,
      {
        autoClose: false, // Keeps the toast visible
        closeButton: false, // Hides the close button
        position: 'bottom-center',
        theme: 'dark',
      }
    );
  };
  const handleEditButton = (task) => {
    setIsEditing(true);
    setShowModal(true);
    setExistingTask(task);
  };

  return (
    <div className={`rounded-lg p-4 ${bgColor}`}>
      <div className="mb-2 flex items-center justify-between">
        <h3 className={`text-lg font-semibold capitalize text-white`}>
          {category} ({filteredTasks?.length})
        </h3>
        <svg
          onClick={() => handleSortToggle()}
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`icon icon-tabler icons-tabler-outline icon-tabler-sort-descending cursor-pointer`}
        >
          {initialSortOrder === "desc" ? (
            <>
              {" "}
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 6l9 0" />
              <path d="M4 12l7 0" />
              <path d="M4 18l7 0" />
              <path d="M15 15l3 3l3 -3" />
              <path d="M18 6l0 12" />
            </>
          ) : (
            <>
              {" "}
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 6l9 0" />
              <path d="M4 12l7 0" />
              <path d="M4 18l7 0" />
              <path d="M15 9l3 -3l3 3" />
              <path d="M18 18l0 -12" />
            </>
          )}
        </svg>
      </div>
      <div>
        {filteredTasks.length === 0 ? (
          <span className="font-medium flex justify-center">No Task Found</span>
        ) : (
          filteredTasks.map((task) => (
            <div key={task.id} className="mb-4 rounded-lg bg-gray-800 p-4">
              <div className="flex justify-between">
                <h4 className={`mb-2 flex-1 font-semibold ${textColor}`}>
                  {task.title}
                </h4>
                <div className="flex gap-2">
                  {/* Delete Button */}
                  <svg
                    onClick={() => showDeleteToast(task.id)}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 cursor-pointer text-zinc-300 hover:text-red-500"
                    title="Delete"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M4 7l16 0" />
                    <path d="M10 11l0 6" />
                    <path d="M14 11l0 6" />
                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                  </svg>
                  {/* Edit Button */}
                  <svg
                    onClick={() => handleEditButton(task)}
                    className="h-4 w-4 cursor-pointer text-zinc-300 hover:text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    title="Edit"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    ></path>
                  </svg>
                </div>
              </div>
              <p className="mb-2 text-sm text-zinc-200">{task.description}</p>
              <p className="mt-6 text-xs text-zinc-400">
                {formatDate(task.date)}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskCard;
