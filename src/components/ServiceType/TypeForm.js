import React,{useRef} from "react";
import { useServiceTypeContext } from "../../context/ServiceTypeFormContext";
import { useTheme } from "../../context/ThemeContext";
import { API_BASE_URL } from "../../config";
import { categories } from "../../data/serviceData";
import axios from "axios";
import {SweetAlert} from "../../Common/SweetAlert";
import { useNavigate } from "react-router-dom";

const ServiceTypeForm = () => {
  const { form, updateForm, createText, generateText,resetForm } = useServiceTypeContext();
  const { currentThemeClasses } = useTheme();
const fileRef = useRef(null);
const navigate = useNavigate();
  const handleChange = (e) => {
    updateForm(e.target.name, e.target.value);
  };

  const handleFileChange = (e) => {
    updateForm("image", e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("categoryId", form.categoryId);
    formData.append("name", form.name);
    formData.append("desc", form.desc);  
    formData.append("image", form.image);

    const summary = generateText();

    try {
      await axios.post(`${API_BASE_URL}/ProductType/AddType`, formData, {
        
      });

      SweetAlert({
           title: "Information",
           body: `
            <p>Category Created</p> 
           `,
            icon: "success",
         })
         .then(() => {
           resetForm();
           if (fileRef.current) fileRef.current.value = "";
         });
     

    } catch (error) {
      console.error("Upload error:", error);
       SweetAlert({
             title: "Error",
             body: "<p>Error uploading service.</p>",
             icon: "error",
             confirmText: "Close",
           });
    }
  };

  return (
      <div>
    {/* CLICKABLE HOME */}
    <div className="mb-4 text-sm text-gray-600">
      <span
        className="text-blue-600 cursor-pointer hover:underline"
        onClick={() => navigate("/ServiceHomePage")}
      >
        🏠 Home
      </span>
      <span className="mx-1">&gt;</span>
      <span>Service Type</span>
    </div>
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className={`p-6 rounded shadow ${currentThemeClasses.form}`}
    >
     <div className="mb-4">
        <label className={`block mb-1 ${currentThemeClasses.text}`}>Category:</label>
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
      <div className="mb-4">
        <label className={`block mb-1 ${currentThemeClasses.text}`}>Service Type Name:</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className={`w-full p-2 border rounded ${currentThemeClasses.inputBorder} ${currentThemeClasses.text} bg-transparent`}
        />
      </div>

      <div className="mb-4">
        <label className={`block mb-1 ${currentThemeClasses.text}`}>Description:</label>
        <input
          type="text"
          name="desc"
          value={form.desc}
          onChange={handleChange}
          required
          className={`w-full p-2 border rounded ${currentThemeClasses.inputBorder} ${currentThemeClasses.text} bg-transparent`}
        />
      </div>


      <div className="mb-4">
        <label className={`block mb-1 ${currentThemeClasses.text}`}>Image:</label>
        <input
          type="file"
          ref={fileRef}
          name="image"
          onChange={handleFileChange}
          accept="image/*"
          required
          className={`w-full p-2 border rounded ${currentThemeClasses.inputBorder} ${currentThemeClasses.text} bg-transparent`}
        />
      </div>

      <button type="submit" className={currentThemeClasses.button}>
        Create Service Type
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

export default ServiceTypeForm;
