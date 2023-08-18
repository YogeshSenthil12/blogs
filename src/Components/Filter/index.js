import {useContext} from "react";
import BlogContext from "../../context/BlogContext";

import {DatePicker, Select, Form} from "antd";
import "./filter.css";

const {RangePicker} = DatePicker;
const dateFormat = "DD/MM/YYYY";

const Filter = () => {
  const {
    setSelectedCategory,
    setSelectedAuthor,
    setSelectedDate,
    authorOptions,
    setAuthorOptions,
  } = useContext(BlogContext);

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  const handleAuthorChange = (value) => {
    setSelectedAuthor(value);
    if (value.length === 0) {
      setAuthorOptions(authorOptions);
    }
  };

  const handleDateChange = (dates) => {
    setSelectedDate(dates);
  };

  return (
    <div className="blogPage">
      <div className="filterSec">
        <p>Filters</p>
      </div>

      <div className="filterCard">
        <div className="dateFilter">
          <p>Select Date</p>
          <Form.Item className="datePicker">
            <RangePicker
              showTime
              placeholder={["StartDate", "EndDate"]}
              format={dateFormat}
              allowClear={true}
              onChange={handleDateChange}
            />
          </Form.Item>
        </div>

        <div className="filterCategory">
          <p>Category</p>
          <Form.Item className="categoryData">
            <Select
              mode="multiple"
              placeholder="Select Category"
              onChange={handleCategoryChange}
              options={[
                {value: "Category 1"},
                {value: "Category 2"},
                {value: "Category 3"},
                {value: "Category 4"},
              ]}
            />
          </Form.Item>
        </div>

        <div className="filterAuthor">
          <p>Author</p>
          <Form.Item className="categoryData">
            <Select
              mode="multiple"
              placeholder="Select Author"
              onChange={handleAuthorChange}
              options={authorOptions.map((author) => ({
                value: author,
                label: author,
              }))}
              showSearch={true}
            />
          </Form.Item>
        </div>
      </div>
    </div>
  );
};

export default Filter;
