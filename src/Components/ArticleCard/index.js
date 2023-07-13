import blogImage from "../../assets/images/blogImage.svg";
import flagIndia from "../../assets/images/flagIndia.svg";
import dottedIcon from "../../assets/images/dottedIcon.svg";
import flagGermany from "../../assets/images/flagGermany.svg";
import flagIndonesia from "../../assets/images/flagIndonesia.svg";
import author from "../../assets/images/author.svg";
import "./article.css";

const articleData = [
  {
    id: 1,
    title: "Top 7 Product Feedback Software Tools For 2023",
    description:
      "In this review, we'll be revealing the top product feedback software solutions for 2023. Learn what to look for when choose...",
    category: "Category 1",
    author: "Bruno Hills",
    date: "Apr 16th 2023",
  },
  {
    id: 2,
    title: "Top 7 affordable Canny.io alternatives in 2023",
    description:
      "Are you looking for a reliable & customizable Canny alternative that won't break the bank? Good news! This article compares all the...",
    category: "Category 2",
    author: "Bruno Hills",
    image: "flagGermany",
    date: "Apr 19th 2023",
  },
  {
    id: 3,
    title: "Best Nolt alternatives for SaaS startups in 2023",
    description:
      "Looking for a user feedback tool with affordable pricing and lots of customization options? We've got you covered! In this...",
    category: "Category 3",
    author: "Bruno Hills",
    date: "Apr 23th 2023",
  },
  {
    id: 4,
    title: "Top 7 Product Feedback Software Tools For 2023",
    description:
      "In this review, we'll be revealing the top product feedback software solutions for 2023. Learn what to look for when choose...",
    category: "Category 4",
    author: "Bruno Hills",
    date: "Apr 16th 2023",
  },
  {
    id: 5,
    title: "Top 7 Product Feedback Software Tools For 2023",
    description:
      "In this review, we'll be revealing the top product feedback software solutions for 2023. Learn what to look for when choose...",
    category: "Category 4",
    author: "Bruno Hills",
    date: "Apr 16th 2023",
  },
  {
    id: 6,
    title: "Top 7 Product Feedback Software Tools For 2023",
    description:
      "In this review, we'll be revealing the top product feedback software solutions for 2023. Learn what to look for when choose...",
    category: "Category 4",
    author: "Bruno Hills",
    date: "Apr 16th 2023",
  },
];

const ArticleCard = () => {
  return (
    <section className="blogWebsite">
      {articleData.map((article) => (
        <div className="articleBlog">
          <div className="blogImages">
            <img src={blogImage} />
            <div className="countryLogo">
              <div>
                <img src={flagIndia} />
              </div>
              <div>
                <p>IN</p>
              </div>
            </div>
          </div>
          <div className="blogCard">
            <div className="cardDescription">
              <div>
                <p>{article.title}</p>
              </div>
              <div>
                <img src={dottedIcon} alt="editIcon" />
              </div>
            </div>
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
                  <img src={author} alt="author" />
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
      ))}
    </section>
  );
};

export default ArticleCard;
