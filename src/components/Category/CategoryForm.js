import React,{useRef} from "react";
import { useCategoryContext } from "../../context/CategoryFormContext";
import { useTheme } from "../../context/ThemeContext";
import { API_BASE_URL } from "../../config";
import axios from "axios";
import { SweetAlert } from "../../Common/SweetAlert";

const CategoryForm = () => {
  const { form, updateForm,  createText, generateText,resetForm } = useCategoryContext();
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
  
    formData.append("name", form.name);
    formData.append("description", form.desc);  
    formData.append("image", form.image);

    const summary = generateText();
   

    try {
      await axios.post(`${API_BASE_URL}/ProductCategory/AddCategory`, formData, {
         headers: {
          "Content-Type": "multipart/form-data",
        },
        
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
  body: "<p>"+(error.message)+"</p>",
  icon: "error",
  confirmText: "Close",
});
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className={`p-6 rounded shadow ${currentThemeClasses.form}`}
    >
     
      <div className="mb-4">
        <label className={`block mb-1 ${currentThemeClasses.text}`}>Category Name:</label>
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
        Create Category
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

export default CategoryForm;
