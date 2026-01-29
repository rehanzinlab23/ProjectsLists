import Navbar from "./components/Navbar";
import ProjectCards from "./components/ProjectCards";
import { ProjectProvider } from "./context/ProjectContext";

const App = () => {
  return (
    <ProjectProvider>
      <Navbar />
      <ProjectCards />
    </ProjectProvider>
  );
};

export default App;
