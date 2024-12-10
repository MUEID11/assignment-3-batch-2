export const formatDate = (dateString) => {
  const date = new Date(dateString); // Convert the string to a Date object
  const options = { day: 'numeric', month: 'short', year: 'numeric' }; // Formatting options
  return date.toLocaleDateString('en-GB', options); // Format to '15 Dec 2024'
};

export const categoryStyles = {
  todo: { bg: "bg-indigo-600", text: "text-indigo-600" },
  onprogress: { bg: "bg-yellow-500", text: "text-yellow-500" },
  done: { bg: "bg-teal-500", text: "text-teal-500" },
  revised: { bg: "bg-rose-500", text: "text-rose-500" },
};
export const getSortedTasks = (tasks, sortOrder) => {
  return [...tasks].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
  });
};
// Utility function to sort tasks by date
export const sortByDate = (tasks, sortOrder = "desc") => {
  return tasks.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
  });
};