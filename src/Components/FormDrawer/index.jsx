import React, {useState, useEffect, useRef, useContext} from "react";
import {Drawer, Select, Form, Input, Button} from "antd";
import "./form.css";
import Image from "../../assets/images/image.svg";
import Close from "../../assets/images/close.svg";
import BlogContext from "../../context/BlogContext";

const FormDrawer = () => {
  const {
    formDrawerOpen,
    closeFormDrawer,
    addArticle,
    isEditMode,
    setIsEditMode,
    editedArticle,
    setArticleData,
    showImageBox,
    setShowImageBox,
    setErrorMessage,
  } = useContext(BlogContext);

  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("");
  const [form] = Form.useForm();
  const [imageError, setImageError] = useState(false);

  const inputRef = useRef();

  const handleImageClose = () => {
    setImage("");
    setImageName("");
    setShowImageBox(true);
  };

  const uploadImage = () => {
    setShowImageBox(false);
    inputRef.current.click();
  };

  useEffect(() => {
    if (editedArticle) {
      setIsEditMode(true);
      form.setFieldsValue({
        title: editedArticle.title,
        country: editedArticle.country,
        description: editedArticle.description,
        author: editedArticle.author,
        category: editedArticle.category,
        imageName: editedArticle.imageName,
      });
      if (editedArticle.image) {
        setImage(editedArticle.image);
        setImageName(editedArticle.imageName);
        setShowImageBox(false);
      } else {
        setShowImageBox(true);
      }
    } else {
      setShowImageBox(true);
    }
  }, [formDrawerOpen, editedArticle, form]);

  const onFinish = (values) => {
    if (!image) {
      setImageError(true);
      return;
    }
    const newArticle = {
      ...values,
      image,
      date: new Date(),
      imageName,
    };
    if (isEditMode) {
      newArticle.id = editedArticle.id;
      updateArticle(newArticle);
    } else {
      addArticle(newArticle);
    }
    closeFormDrawer();
  };

  const handleImage = (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function () {
      setImage(reader.result);
      setImageName(e.target.files[0].name);
    };
    reader.onerror = function (error) {
      setErrorMessage("Error: ", error);
    };
  };

  const updateArticle = async (updatedArticle) => {
    try {
      const response = await fetch(
        `https://blog-pages.onrender.com/articleData/${updatedArticle.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedArticle),
        }
      );
      const data = await response.json();
      setArticleData((prevArticleData) =>
        prevArticleData.map((article) =>
          article.id === data.id ? data : article
        )
      );
    } catch (error) {
      setErrorMessage(error);
    }
  };
  return (
    <Drawer
      title={isEditMode ? "Edit Article" : "Add New Article"}
      placement="right"
      visible={formDrawerOpen}
      onClose={closeFormDrawer}
      className="custom-drawer"
    >
      <Form className="formDetails" onFinish={onFinish} form={form}>
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
                  message: "Choose at least one Country",
                },
              ]}
            >
              <Select
                showSearch
                placeholder="Select Country"
                className="formSelect"
                options={[
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
            name="image"
            initialValue={Image}
            validateStatus={imageError ? "error" : image ? "success" : ""}
            help={imageError ? "Please upload an image" : ""}
            rules={[
              {
                required: true,
                message: "Please upload an image",
              },
            ]}
            allowClear
          >
            <div className={showImageBox ? "hideImage" : "showImage"}>
              <div className="boxImage">
                <div className="imageBox">
                  <img src={Image} />
                  <p>{imageName}</p>
                </div>
                <div className="closeIcon">
                  <img src={Close} onClick={handleImageClose} />
                </div>
              </div>
            </div>
            <div
              onClick={uploadImage}
              className={showImageBox ? "showImage" : "hideImage"}
            >
              <img src={Image} alt="image" />
              <a>Browse Here</a>
              <p>Supports: JPG,JPEG, PNG</p>
            </div>

            <input
              type="file"
              className="uploadingImg"
              onChange={handleImage}
              ref={inputRef}
            />
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
          <Input
            className="textField"
            placeholder="Enter author name"
            // onChange={handleAuthorChange}
          />
        </Form.Item>

        <div className="formFilterCategory">
          <div className="formCategory">
            <Form.Item
              label="category"
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
              <Button className="cancelButton" onClick={closeFormDrawer}>
                Cancel
              </Button>
            </div>
            <div>
              <Button
                className="addArticleButton"
                type="primary"
                htmlType="submit"
              >
                {isEditMode ? "Save Article" : "Add Article"}
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </Drawer>
  );
};

export default FormDrawer;
