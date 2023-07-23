import React, {useEffect, useState} from "react";
import NavBar from "../Components/Navbar/index";
import Filter from "../Components/Filter";
import TabComponent from "../Components/TabComponent";
import ArticleCard from "../Components/ArticleCard";
import "./blogPage.css";
import {v4 as uuidv4} from "uuid";
import FormDrawer from "../Components/FormDrawer";
import moment from "moment";

const BlogPage = () => {
  const [articleData, setArticleData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [filteredArticleData, setFilteredArticleData] = useState([]);
  const [formDrawerOpen, setFormDrawerOpen] = useState(false);
  const [editedArticle, setEditedArticle] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const openFormDrawer = () => {
    setFormDrawerOpen(true);
  };

  const handleEdit = (article) => {
    setEditedArticle(article);
    setIsEditMode(true);
    openFormDrawer();
  };

  useEffect(() => {
    fetchArticleData();
  }, []);

  useEffect(() => {
    const filteredData = articleData.filter((article) => {
      const isCategoryMatched =
        selectedCategory.length === 0 ||
        selectedCategory.every((selectedCategory) =>
          article.category.includes(selectedCategory)
        );

      const isAuthorMatched =
        selectedAuthor.length === 0 || selectedAuthor.includes(article.author);

      const isDateMatched =
        !selectedDate ||
        (selectedDate[0]?.$d &&
          selectedDate[1]?.$d &&
          moment(article.date).isBetween(
            moment(selectedDate[0].$d).startOf("day"),
            moment(selectedDate[1].$d).endOf("day")
          ));

      return isCategoryMatched && isAuthorMatched && isDateMatched;
    });

    setFilteredArticleData(filteredData);
    setSelectedCountry(selectedCountry);
  }, [
    selectedCategory,
    selectedAuthor,
    selectedDate,
    selectedCountry,
    articleData,
  ]);

  const fetchArticleData = async () => {
    try {
      const response = await fetch("http://localhost:3001/articleData");
      const data = await response.json();
      setArticleData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteArticle = async (id) => {
    try {
      await fetch(`http://localhost:3001/articleData/${id}`, {
        method: "DELETE",
      });
      const updatedData = articleData.filter((article) => article.id !== id);
      setArticleData(updatedData);
    } catch (error) {
      console.log(error);
    }
  };

  const addArticle = async (newArticle) => {
    try {
      newArticle.id = uuidv4();
      newArticle.date = new Date(); // Set the date property
      const response = await fetch("http://localhost:3001/articleData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newArticle),
      });
      const data = await response.json();
      const updatedData = [...articleData, data];
      setArticleData(updatedData);
    } catch (error) {
      console.log(error);
    }
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
            <Filter
              setSelectedCategory={setSelectedCategory}
              setSelectedAuthor={setSelectedAuthor}
              setSelectedDate={setSelectedDate}
              setSelectedCountry={setSelectedCountry}
              articleData={articleData}
              setFilteredArticleData={setFilteredArticleData}
            />
          </div>
          <div className="addArticle">
            <TabComponent
              addArticle={addArticle}
              articleData={articleData}
              setSelectedCountry={setSelectedCountry}
              filteredArticleData={filteredArticleData}
              openFormDrawer={openFormDrawer}
            />
            <ArticleCard
              articleData={filteredArticleData}
              setArticleData={setArticleData}
              deleteArticle={deleteArticle}
              addArticle={addArticle}
              selectedCountry={selectedCountry}
              handleEdit={handleEdit}
            />
          </div>
          {formDrawerOpen && (
            <FormDrawer
              open={formDrawerOpen}
              onClose={() => setFormDrawerOpen(false)}
              addArticle={addArticle}
              initialData={editedArticle}
              setIsEditMode={setIsEditMode}
              setEditedArticle={setEditedArticle}
              setArticleData={setArticleData}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
