import {createContext, useState, useEffect} from "react";
import {v4 as uuidv4} from "uuid";
import moment from "moment";

const BlogContext = createContext();

export const BlogProvider = ({children}) => {
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
      const response = await fetch(
        "https://blog-pages.onrender.com/articleData"
      );
      const data = await response.json();
      setArticleData(data);
      const uniqueAuthors = [...new Set(data.map((article) => article.author))];
      setSelectedAuthor(uniqueAuthors);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteArticle = async (id) => {
    try {
      await fetch(`https://blog-pages.onrender.com/articleData/${id}`, {
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
      newArticle.date = new Date();
      const response = await fetch(
        "https://blog-pages.onrender.com/articleData",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newArticle),
        }
      );
      const data = await response.json();
      const updatedData = [...articleData, data];
      setArticleData(updatedData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <BlogContext.Provider
      value={{
        setSelectedCategory,
        setSelectedAuthor,
        setSelectedDate,
        authorOptions,
        setAuthorOptions,
        articleData,
        setArticleData,
        deleteArticle,
        selectedCountry,
        handleEdit,
        setSelectedCountry,
        openFormDrawer,   
        filteredArticleData,
        formDrawerOpen,
        closeFormDrawer,
        addArticle,
        isEditMode,
        setIsEditMode,
        editedArticle,
        showImageBox,
        setShowImageBox,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export default BlogContext;
