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
  const [showImageBox, setShowImageBox] = useState(true);
  const [authorOptions, setAuthorOptions] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const openFormDrawer = () => {
    setFormDrawerOpen(true);
  };

  const closeFormDrawer = () => {
    setFormDrawerOpen(false);
    setIsEditMode(false);
    setEditedArticle(null);
    setShowImageBox(true);
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

  useEffect(() => {
    const authors = [...new Set(articleData.map((article) => article.author))];
    setAuthorOptions(authors);
  }, [articleData]);

  const fetchArticleData = async () => {
    try {
      const response = await fetch("http://localhost:3001/articleData");
      const data = await response.json();
      setArticleData(data);
      const uniqueAuthors = [...new Set(data.map((article) => article.author))];
      setSelectedAuthor(uniqueAuthors);
    } catch (error) {
      setErrorMessage(error);
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
      setErrorMessage(error);
    }
  };

  const addArticle = async (newArticle) => {
    try {
      newArticle.id = uuidv4();
      newArticle.date = new Date();
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
      setErrorMessage(error);
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
              authorOptions={authorOptions}
              setAuthorOptions={setAuthorOptions}
            />
          </div>
          <div className="addArticle">
            <TabComponent
              setSelectedCountry={setSelectedCountry}
              filteredArticleData={filteredArticleData}
              openFormDrawer={openFormDrawer}
            />
            <ArticleCard
              articleData={filteredArticleData}
              setArticleData={setArticleData}
              deleteArticle={deleteArticle}
              selectedCountry={selectedCountry}
              handleEdit={handleEdit}
              setErrorMessage={setErrorMessage}
            />
          </div>
          {formDrawerOpen && (
            <FormDrawer
              open={formDrawerOpen}
              onClose={closeFormDrawer}
              addArticle={addArticle}
              initialData={editedArticle}
              setIsEditMode={setIsEditMode}
              isEditMode={isEditMode}
              setArticleData={setArticleData}
              showImageBox={showImageBox}
              setShowImageBox={setShowImageBox}
              setErrorMessage={setErrorMessage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
