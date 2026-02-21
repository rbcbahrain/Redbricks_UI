import React, { useRef, useState, useEffect } from "react";
import { useServiceFormContext } from "../../context/ServiceFormContext";
import { useTheme } from "../../context/ThemeContext";
import { categories } from "../../data/serviceData";
import { API_BASE_URL, Image_BASE_URL } from "../../config";
import axios from "axios";
import { SweetAlert } from "../../Common/SweetAlert";
import { useNavigate } from "react-router-dom";

const ServiceForm = () => {
  const { form, updateForm, resetForm, createText, generateText } =
    useServiceFormContext();

  const { currentThemeClasses } = useTheme();
  const fileRef = useRef(null);
  const navigate = useNavigate();

  const [preview, setPreview] = useState(null);

  // Handle text/select change
  const handleChange = (e) => {
    updateForm(e.target.name, e.target.value);
  };

  // Handle image change
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      updateForm("image", file);
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  };

  // Cleanup preview (prevent memory leak)
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  // Reset preview when switching to create mode
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
    formData.append("serviceTypeId", form.serviceTypeId);
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("rating", form.rating);

    if (form.image) {
      formData.append("image", form.image);
    } else if (form.fileName) {
      formData.append("fileName", form.fileName);
    }

    try {
      if (form.id) {
        // UPDATE
        await axios.put(
          `${API_BASE_URL}/Products/updateproduct/${form.id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        SweetAlert({
          title: "Updated",
          body: "<p>Service updated successfully.</p>",
          icon: "success",
        });
      } else {
        // CREATE
        await axios.post(
          `${API_BASE_URL}/Products/addproduct`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        SweetAlert({
          title: "Created",
          body: "<p>Service created successfully.</p>",
          icon: "success",
        });
      }

      generateText(); // optional if needed
      resetForm();
      setPreview(null);
      if (fileRef.current) fileRef.current.value = "";
      navigate("/ServiceList");

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
        <span>{form.id ? "Edit Service" : "Create Service"}</span>
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

        {/* Service Type */}
        <div className="mb-4">
          <label className={`block mb-1 ${currentThemeClasses.text}`}>
            Service Type:
          </label>
          <select
            name="serviceTypeId"
            value={form.serviceTypeId}
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
            Service Name:
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
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            className={`w-full p-2 border rounded ${currentThemeClasses.inputBorder} ${currentThemeClasses.text} bg-transparent`}
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className={`block mb-1 ${currentThemeClasses.text}`}>
            Price:
          </label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
            className={`w-full p-2 border rounded ${currentThemeClasses.inputBorder} ${currentThemeClasses.text} bg-transparent`}
          />
        </div>

        {/* Rating */}
        <div className="mb-4">
          <label className={`block mb-1 ${currentThemeClasses.text}`}>
            Rating:
          </label>
          <input
            type="number"
            name="rating"
            value={form.rating}
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

          {preview && (
            <div className="mb-2">
              <img src={preview} width="100" alt="Preview" />
            </div>
          )}

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

        <button type="submit" className={currentThemeClasses.button}>
          {form.id ? "Update Service" : "Create Service"}
        </button>

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

export default ServiceForm;