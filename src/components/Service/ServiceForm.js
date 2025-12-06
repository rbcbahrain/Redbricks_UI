import React,{useRef} from "react";
import { useFormContext } from "../../context/FormContext";
import { useTheme } from "../../context/ThemeContext";
import { categories } from "../../data/serviceData";
import { API_BASE_URL } from "../../config";
import axios from "axios";

const ServiceForm = () => {
  const { form, updateForm, resetForm, createText, generateText } = useFormContext();
  const { currentThemeClasses } = useTheme();
const fileRef = useRef(null);

  const handleChange = (e) => {
    updateForm(e.target.name, e.target.value);
  };

  const handleFileChange = (e) => {
    updateForm("image", e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("type", form.categoryId);
    formData.append("name", form.name);
    formData.append("desc", form.desc);
    formData.append("price", form.price);
    formData.append("duration", form.duration);
    formData.append("image", form.image);

    const summary = generateText();

    try {
      await axios.post(`${API_BASE_URL}/Products/addproduct`, formData, {
        
      });

      alert("Service created!\n\n" + summary);
 resetForm();
if(fileRef.current)fileRef.current.value="";

    } catch (error) {
      console.error("Upload error:", error);
      alert("Error uploading service.");
    }
  };

  return (
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
        <label className={`block mb-1 ${currentThemeClasses.text}`}>Service Name:</label>
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
        <label className={`block mb-1 ${currentThemeClasses.text}`}>Price:</label>
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          required
          className={`w-full p-2 border rounded ${currentThemeClasses.inputBorder} ${currentThemeClasses.text} bg-transparent`}
        />
      </div>

      <div className="mb-4">
        <label className={`block mb-1 ${currentThemeClasses.text}`}>Duration:</label>
        <input
          type="number"
          name="duration"
          value={form.duration}
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
        Create Service
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
  );
};

export default ServiceForm;
