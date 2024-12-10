import Sidebar from "./Sidebar";
import Header from "./Header";
import useTheme from "../useTheme";

const ProjectifyLayout = ({ children }) => {
  const { darkMode } = useTheme();
  return (
   
      <div className={`flex h-screen text-white ${darkMode ? "bg-gray-900" : "light"}`}>
        <Sidebar />
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <Header />
          {children}
        </main>
      </div>
  );
};

export default ProjectifyLayout;
