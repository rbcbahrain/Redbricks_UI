import React, { useRef, useState, useEffect } from "react";
import { useServiceTypeContext } from "../../context/ServiceTypeFormContext";
import { useTheme } from "../../context/ThemeContext";
import { API_BASE_URL, Image_BASE_URL } from "../../config";
import axios from "axios";
import { SweetAlert } from "../../Common/SweetAlert";
import { useNavigate } from "react-router-dom";

const ServiceTypeForm = () => {
  const { form, updateForm, createText, generateText, resetForm } =
    useServiceTypeContext();

  const { currentThemeClasses } = useTheme();
  const fileRef = useRef(null);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [preview, setPreview] = useState(null);

  // Handle text/select changes
  const handleChange = (e) => {
    updateForm(e.target.name, e.target.value);
  };
  
useEffect(() => {
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/ProductType/LoadCategory`
      );

      setCategories(response.data);
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };

  fetchCategories();
}, []);

  // Handle image change
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      updateForm("image", file);
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  };

  // Prevent memory leak
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  // Reset when switching to Create mode
  useEffect(() => {
    if (!form.id) {
      resetForm();
      setPreview(null);
    }
  }, [form.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("categoryId", form.categoryId);
    formData.append("name", form.name);
    formData.append("fileName", form.fileName);
    formData.append("description", form.desc);
      // If new image selected
    if (form.image) {
      formData.append("image", form.image);
    }
    // If editing and keeping old image
    else if (form.fileName) {
      formData.append("fileName", form.fileName);
    }

    try {
      if (form.id) {
        // UPDATE
        await axios.put(
          `${API_BASE_URL}/ProductType/UpdateType/${form.id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        SweetAlert({
          title: "Updated",
          body: "<p>Service Type updated successfully.</p>",
          icon: "success",
        });
      } else {
        // CREATE
        await axios.post(
          `${API_BASE_URL}/ProductType/AddType`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        SweetAlert({
          title: "Created",
          body: "<p>Service Type created successfully.</p>",
          icon: "success",
        });
      }

      generateText(); // Optional if needed
      resetForm();
      setPreview(null);
      if (fileRef.current) fileRef.current.value = "";
      navigate("/ServiceTypeList");

    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        "Something went wrong";

      SweetAlert({
        title: "Error",
        body: `<p>${errorMessage}</p>`,
        icon: "error",
        confirmText: "Close",
      });
    }
  };

  return (
    <div>
      {/* Breadcrumb */}
      <div className="mb-4 text-sm text-gray-600">
        <span
          className="text-blue-600 cursor-pointer hover:underline"
          onClick={() => navigate("/ServiceHomePage")}
        >
          🏠 Home
        </span>
        <span className="mx-1">&gt;</span>
        <span>{form.id ? "Edit Service Type" : "Create Service Type"}</span>
      </div>

      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className={`p-6 rounded shadow ${currentThemeClasses.form}`}
      >
        {/* Category */}
        <div className="mb-4">
          <label className={`block mb-1 ${currentThemeClasses.text}`}>
            Category:
          </label>
          <select
            name="categoryId"
            value={form.categoryId}
            onChange={handleChange}
            required
            className={`w-full p-2 border rounded ${currentThemeClasses.inputBorder} ${currentThemeClasses.text} bg-transparent`}
          >
            <option value="">-- Select --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Name */}
        <div className="mb-4">
          <label className={`block mb-1 ${currentThemeClasses.text}`}>
            Service Type Name:
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className={`w-full p-2 border rounded ${currentThemeClasses.inputBorder} ${currentThemeClasses.text} bg-transparent`}
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className={`block mb-1 ${currentThemeClasses.text}`}>
            Description:
          </label>
          <input
            type="text"
            name="desc"
            value={form.desc}
            onChange={handleChange}
            required
            className={`w-full p-2 border rounded ${currentThemeClasses.inputBorder} ${currentThemeClasses.text} bg-transparent`}
          />
        </div>

        {/* Image */}
        <div className="mb-4">
          <label className={`block mb-1 ${currentThemeClasses.text}`}>
            Image:
          </label>

          {/* New Preview */}
          {preview && (
            <div className="mb-2">
              <img src={preview} width="100" alt="Preview" />
            </div>
          )}

          {/* Existing Image (Edit Mode) */}
          {!preview && form.fileName && (
            <div className="mb-2">
              <img
                src={`${Image_BASE_URL}${form.fileName}`}
                width="100"
                alt="Current"
              />
            </div>
          )}

          <input
            type="file"
            ref={fileRef}
            name="image"
            onChange={handleFileChange}
            accept="image/*"
            className={`w-full p-2 border rounded ${currentThemeClasses.inputBorder} ${currentThemeClasses.text} bg-transparent`}
          />
        </div>

        {/* Submit */}
        <button type="submit" className={currentThemeClasses.button}>
          {form.id ? "Update Service Type" : "Create Service Type"}
        </button>

        {/* Generated Text */}
        {createText && (
          <div
            className={`mt-6 p-4 border rounded ${currentThemeClasses.inputBorder} ${currentThemeClasses.text}`}
          >
            <h4 className="font-semibold mb-2">Generated Text:</h4>
            <p>{createText}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default ServiceTypeForm;