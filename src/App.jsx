import { TaskProvider } from "./assets/context";
import ProjectifyLayout from "./ProjectComponents/ProjectLayout";
import TaskBoard from "./ProjectComponents/Taskboard";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <TaskProvider>
        <ProjectifyLayout>
          <TaskBoard />
        </ProjectifyLayout>
        <ToastContainer />
      </TaskProvider>
    </>
  );
}

export default App;
