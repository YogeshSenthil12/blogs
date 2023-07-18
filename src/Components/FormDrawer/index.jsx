import React from "react";
import {Drawer, Upload, Select, Form, Input, Button} from "antd";
import image from "../../assets/images/image.svg";
import "./form.css";

const {Dragger} = Upload;

const FormDrawer = ({open, onClose, addArticle}) => {
  const onFinish = (values) => {
    console.log("Values", values);
    addArticle(values);
    onClose();
  };
  return (
    <Drawer
      title="Add New Article"
      placement="right"
      open={open}
      onClose={onClose}
      className="custom-drawer"
    >
      <Form className="formDetails" onFinish={onFinish}>
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: "Please enter the title",
            },
          ]}
        >
          <Input className="textField" placeholder="Enter the title" />
        </Form.Item>

        <div className="formFilterCategory">
          <div className="formCategory">
            <Form.Item
              label="Country"
              name="country"
              rules={[
                {
                  required: true,
                  message: "Choose atleast one Country",
                },
              ]}
            >
              <Select
                showSearch
                placeholder="Select Country"
                className="formSelect"
                options={[
                  {value: "All", label: "All"},
                  {value: "IN", label: "India"},
                  {value: "ID", label: "Indonesia"},
                  {value: "DE", label: "Germany"},
                ]}
              />
            </Form.Item>
          </div>
        </div>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please enter the description",
            },
          ]}
        >
          <Input.TextArea
            rows={3}
            className="textArea"
            placeholder="Enter the description"
          />
        </Form.Item>

        <div className="imageUploading">
          <Form.Item
            label="Article Image"
            rules={[
              {
                required: true,
                messages: "Please Upload an Image",
              },
            ]}
          >
            {/* <Dragger>
              <img className="uploadingImg" src={image} alt="ImageIcon" />
              <a className="">Browse Here</a>
              <p className="">Supports: JPG, JPEG, PNG</p>
            </Dragger> */}
            <input type="file" />
          </Form.Item>
        </div>

        <Form.Item
          label="Author"
          name="author"
          rules={[
            {
              required: true,
              message: "Please enter the author name",
            },
          ]}
        >
          <Input className="textField" placeholder="Enter author name" />
        </Form.Item>

        <div className="formFilterCategory">
          <div className="formCategory">
            <Form.Item
              label="Category"
              name="category"
              rules={[
                {
                  required: true,
                  message: "Please select at least one category",
                },
              ]}
            >
              <Select
                mode="multiple"
                placeholder="Select Category"
                className="formSelect"
                options={[
                  {value: "Category 1"},
                  {value: "Category 2"},
                  {value: "Category 3"},
                  {value: "Category 4"},
                ]}
              />
            </Form.Item>
          </div>
          <div className="formButton">
            <div>
              <Button className="cancelButton" onClick={onClose}>
                Cancel
              </Button>
            </div>
            <div>
              <Button
                className="addArticleButton"
                type="primary"
                htmlType="submit"
              >
                Add Article
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </Drawer>
  );
};

export default FormDrawer;
