import NavBar from "../Components/Navbar/index";
import Filter from "../Components/Filter";
import TabComponent from "../Components/TabComponent";
import ArticleCard from "../Components/ArticleCard";
import "./blogPage.css";
import FormDrawer from "../Components/FormDrawer";

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
            <TabComponent />
            <ArticleCard />
          </div>

          <FormDrawer />
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
