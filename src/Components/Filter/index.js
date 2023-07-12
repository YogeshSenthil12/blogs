import "./filter.css";
import "react-datepicker/dist/react-datepicker.css";
import {DatePicker, Select, Space} from "antd";
import downArrow from "../../assets/images/downArrow.svg";
import Multiselect from "multiselect-react-dropdown";

const {RangePicker} = DatePicker;
const dateFormat = "DD/MM/YYYY";

const Filter = () => {
  return (
    <div className="blogPage">
      <div className="filterSec">
        <p>Filters</p>
      </div>

      <div className="filterCard">
        <div className="dateFilter">
          <p>Select Date</p>
          <div className="datePicker">
            <RangePicker
              showTime
              placeholder={["StartDate", "EndDate"]}
              format={dateFormat}
              allowClear={false}
            />
          </div>
        </div>

        <div className="filterCategory">
          <p>Category</p>
          <div className="categoryData">
            <Select
              mode="multiple"
              placeholder="Select Category"
              options={[
                {value: "Category 1"},
                {value: "Category 2"},
                {value: "Category 3"},
                {value: "Category 4"},
              ]}
            />
          </div>
        </div>

        <div className="filterAuthor">
          <p>Author</p>
          <div className="categoryData">
            <Select mode="multiple" placeholder="Select Author" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
