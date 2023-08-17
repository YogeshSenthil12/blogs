import {useContext} from "react";
import BlogContext from "../../context/BlogContext";

import flagIndia from "../../assets/images/flagIndia.svg";
import flagGermany from "../../assets/images/flagGermany.svg";
import flagIndonesia from "../../assets/images/flagIndonesia.svg";
import deleteIcon from "../../assets/images/delete.svg";
import dottedIcon from "../../assets/images/dottedIcon.svg";
import author from "../../assets/images/author.svg";

import React, {useState} from "react";
import {Dropdown, Modal, Popover} from "antd";
import "./article.css";
import moment from "moment";

const countryFlags = {
  IN: flagIndia,
  DE: flagGermany,
  ID: flagIndonesia,
};

const ArticleCard = () => {
  const {
    filteredArticleData,
    setArticleData,
    deleteArticle,
    selectedCountry,
    setErrorMessage,
    handleEdit,
  } = useContext(BlogContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleOk = async () => {
    if (deleteId !== null) {
      try {
        await deleteArticle(deleteId);
        const updatedData = filteredArticleData.filter(
          (article) => article.id !== deleteId
        );
        setArticleData(updatedData);
        setDeleteId(null);
        setIsModalOpen(false);
      } catch (error) {
        setErrorMessage(error);
      }
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setDeleteId(null);
  };

  const handleDelete = (id) => {
    setIsModalOpen(true);
    setDeleteId(id);
  };

  const filteredArticlesData = selectedCountry
    ? filteredArticleData.filter((article) => article.country === selectedCountry)
    : filteredArticleData;

  return (
    <section className="blogWebsite">
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <img src={deleteIcon} alt="delete" />
        <p>Are you sure you want to delete?</p>
      </Modal>

      {filteredArticlesData.length > 0 ? (
        filteredArticlesData?.map((article) => {
          return (
            <div key={article.id} className="articleBlog">
              <div className="blogImages">
                <img
                  src={article.image}
                  alt="Blog"
                  className="blogCardDetails"
                />
                <div className="countryLogo">
                  <div>
                    <img src={countryFlags[article.country]} alt="Flag" />
                  </div>
                  <div>
                    <p>{article.country}</p>
                  </div>
                </div>
              </div>
              <div className="blogCard">
                <div className="cardDescription">
                  <div>
                    <p>{article.title}</p>
                  </div>
                  <div className="editCard" title="BlogCard">
                    <Dropdown
                      placement="bottomRight"
                      menu={{
                        items: [
                          {
                            key: "1",
                            label: <a>Edit</a>,
                            onClick: () => handleEdit(article),
                          },
                          {
                            key: "2",
                            label: <p>Delete</p>,
                            onClick: () => handleDelete(article.id),
                          },
                        ],
                      }}
                      trigger={["click"]}
                    >
                      <img src={dottedIcon} alt="Edit" />
                    </Dropdown>
                  </div>
                </div>
                <div className="blogDetails">
                  <div className="blogDescription">
                    <p>{article.description}</p>
                  </div>
                  <div className="categoryData">
                    <div className="categorySection">
                      {article.category.map((category, i) => {
                        if (i > 2) {
                          return null;
                        }
                        return (
                          <div key={category}>
                            {i < 2 ? (
                              <p>{category}</p>
                            ) : (
                              <Popover
                                content={
                                  <p
                                    style={{
                                      color: "#0a0226",
                                      fontSize: "12px",
                                      fontFamily: "Inter",
                                    }}
                                  >
                                    {article.category.slice(2).join(", ")}
                                  </p>
                                }
                              >
                                <p>
                                  {article.category.length > 2
                                    ? `+${article.category.length - 2}`
                                    : category}
                                </p>
                              </Popover>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="authorData">
                    <div className="authorDetails">
                      <div>
                        <img src={author} alt="Author" />
                      </div>
                      <div>
                        <p>{article.author}</p>
                      </div>
                    </div>
                    <div>
                      <p>{moment(article.date).format("MMM Do YYYY")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p className="noCards">
          {selectedCountry
            ? `No data availabe for ${selectedCountry}`
            : "No data is available to show"}
        </p>
      )}
    </section>
  );
};

export default ArticleCard;
