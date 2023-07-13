import plusIcon from "../../assets/images/plusIcon.svg";
import {Tabs} from "antd";
import "./tabs.css";
import {useState} from "react";

const Tab = () => {
  const [items, setItems] = useState([
    {
      key: "1",
      label: (
        <div>
          All <span className="editNumber">{28}</span>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div>
          Germany <span className="editNumbers">{28}</span>
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div>
          India <span className="editNumbers">{28}</span>
        </div>
      ),
    },
    {
      key: "4",
      label: (
        <div>
          Indonesia <span className="editNumbers">{28}</span>
        </div>
      ),
    },
  ]);
  return (
    <>
      <div className="tabSection">
        <div>
          <Tabs items={items} defaultActiveKey="1" />
        </div>

        <div className="newArticle">
          <div>
            <img src={plusIcon} alt="addIcon" />
          </div>
          <div>
            <p>Add New Article</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tab;
