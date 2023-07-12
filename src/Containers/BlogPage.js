import NavBar from "../Components/Navbar/index";
import Filter from "../Components/Filter";
import "./blogPage.css";

const BlogPage = () => {
  return (
    <header>
      <NavBar />
      <div className="headingComponent">
        <h2>Articles</h2>
      </div>
      <Filter />
    </header>
  );
};

export default BlogPage;
