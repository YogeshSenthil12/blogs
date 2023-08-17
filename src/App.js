import BlogPage from "./Containers/BlogPage";
import {BlogProvider} from "./context/BlogContext";

const App = () => {
  return (
    <div>
      <BlogProvider>
        <BlogPage />
      </BlogProvider>
    </div>
  );
};

export default App;
