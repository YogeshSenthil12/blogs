import plusIcon from "../../assets/images/plusIcon.svg";
import {Tabs} from "antd";
import FormDrawer from "../FormDrawer";
import "./tabs.css";

import {useState} from "react";

const Tab = ({addArticle}) => {
  const [formDrawerOpen, setFormDrawerOpen] = useState(false);
  const [activeTab, setActivetab] = useState();

  const openFormDrawer = () => {
    setFormDrawerOpen(true);
  };

  const closeFormDrawer = () => {
    setFormDrawerOpen(false);
  };
  const handleTabChange = (key) => {
    setActivetab(key);
  };

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
          <Tabs
            items={items}
            activeKey={activeTab}
            onChange={handleTabChange}
          />
        </div>

        <div className="newArticle" onClick={openFormDrawer}>
          <div>
            <img src={plusIcon} alt="addIcon" />
          </div>
          <div>
            <p>Add New Article</p>
          </div>
        </div>
        <FormDrawer
          onClose={closeFormDrawer}
          open={formDrawerOpen}
          addArticle={addArticle}
        />
      </div>
    </>
  );
};

export default Tab;
