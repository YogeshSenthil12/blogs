import blogImage from "../../assets/images/blogImage.svg";
import flagIndia from "../../assets/images/flagIndia.svg";
import flagGermany from "../../assets/images/flagGermany.svg";
import flagIndonesia from "../../assets/images/flagIndonesia.svg";
import dottedIcon from "../../assets/images/dottedIcon.svg";
import deleteIcon from "../../assets/images/delete.svg";
import author from "../../assets/images/author.svg";
import {Dropdown, Modal} from "antd";
import "./article.css";

import {useState} from "react";

const countryFlags = {
  IN: flagIndia,
  DE: flagGermany,
  ID: flagIndonesia,
};

const ArticleCard = ({articleData, setArticleData, deleteArticle}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleOk = async () => {
    setIsModalOpen(false);
    if (deleteId !== null) {
      try {
        await deleteArticle(deleteId);
        const updatedData = articleData.filter(
          (article) => article.id !== deleteId
        );
        setArticleData(updatedData);
        setDeleteId(null);
      } catch (error) {
        console.log("Error deleting article:", error);
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

  return (
    <section className="blogWebsite">
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <img src={deleteIcon} alt="delete" />
        <p>Are you sure you want to delete?</p>
      </Modal>
      {articleData?.map((article) => {
        // const imageURL = `data:image/png;base64,${article.image}`;
        return (
          <div key={article.id} className="articleBlog">
            <div className="blogImages">
              <img src={article.image} alt="Blog" />
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
                    <div>
                      <p>{article.category}</p>
                    </div>
                  </div>
                  <div className="categorySection">
                    <div>
                      <p>{article.category}</p>
                    </div>
                  </div>
                  <div className="categoryLength">
                    <div>
                      <p>+2</p>
                    </div>
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
                    <p>{article.date}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default ArticleCard;
