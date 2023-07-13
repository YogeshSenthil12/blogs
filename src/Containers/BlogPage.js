import NavBar from "../Components/Navbar/index";
import Filter from "../Components/Filter";
import Tab from "../Components/Tab";
import ArticleCard from "../Components/ArticleCard";
import "./blogPage.css";

const BlogPage = () => {
  return (
    <div className="fixDesign">
      <NavBar />
      <div className="headingComponent">
        <h2>Articles</h2>
      </div>
      <div className="parentSection">
        <div className="filterTab">
          <div>
            <Filter />
          </div>
          <div className="addArticle">
            <Tab />
            <ArticleCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
