import React, {useState} from "react";
import NavBar from "../Components/Navbar/index";
import Filter from "../Components/Filter";
import Tab from "../Components/Tab";
import ArticleCard from "../Components/ArticleCard";
import "./blogPage.css";
import {v4 as uuidv4} from "uuid";
import moment from "moment";

const BlogPage = () => {
  const [articleData, setArticleData] = useState([
    {
      id: 1,
      title: "Top 7 Product Feedback Software Tools For 2023",
      description:
        "In this review, we'll be revealing the top product feedback software solutions for 2023. Learn what to look for when choose...",
      category: "Category 1",
      country: "IN",
      author: "Bruno Hills",
      date: new Date(""),
    },
  ]);

  const deleteArticle = (id) => {
    const updatedData = articleData.filter((article) => article.id !== id);
    setArticleData(updatedData);
  };

  const addArticle = (newArticle) => {
    const id = uuidv4();
    newArticle.id = id;
    setArticleData([...articleData, newArticle]);
    console.log("Generated ID:", id);
  };

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
            <Tab addArticle={addArticle} />
            <ArticleCard
              articleData={articleData.map((article) => ({
                ...article,
                date: moment(article.date).format("MMM DD YYYY"),
              }))}
              setArticleData={setArticleData}
              deleteArticle={deleteArticle}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
