import React, {useState} from "react";
import {Tabs} from "antd";
import FormDrawer from "../FormDrawer";
import plusIcon from "../../assets/images/plusIcon.svg";
import "./tabs.css";

const {TabPane} = Tabs;

const TabComponent = ({
  addArticle,
  setSelectedCountry,
  filteredArticleData,
  handleEdit,
  openFormDrawer,
}) => {
  const [activeTab, setActiveTab] = useState("1");

  const handleTabChange = (key) => {
    setActiveTab(key);
    if (key === "1") {
      setSelectedCountry(null);
    } else {
      const countries = ["DE", "IN", "ID"];
      setSelectedCountry(countries[key - 2]);
    }
  };
  const totalBlogcard = (country) => {
    if (country) {
      const filterData = filteredArticleData.filter(
        (article) => article.country === country
      );
      return filterData.length;
    } else {
      return filteredArticleData.length > 0 ? filteredArticleData.length : 0;
    }
  };

  const items = [
    {
      key: "1",
      label: (
        <div>
          All <span className="editNumber">{totalBlogcard()}</span>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div>
          Germany <span className="editNumbers">{totalBlogcard("DE")}</span>
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div>
          India <span className="editNumbers">{totalBlogcard("IN")}</span>
        </div>
      ),
    },
    {
      key: "4",
      label: (
        <div>
          Indonesia <span className="editNumbers">{totalBlogcard("ID")}</span>
        </div>
      ),
    },
  ];

  return (
    <div className="tabSection">
      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        {items.map((item) => (
          <TabPane tab={item.label} key={item.key} />
        ))}
      </Tabs>

      <div className="newArticle" onClick={openFormDrawer}>
        <div>
          <img src={plusIcon} alt="addIcon" />
        </div>
        <div>
          <p>Add New Article</p>
        </div>
      </div>
    </div>
  );
};

export default TabComponent;
