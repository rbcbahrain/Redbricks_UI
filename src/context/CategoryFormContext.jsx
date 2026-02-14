import React, { createContext, useContext, useState } from "react";

// 1️⃣ Create context
const CategoryContext = createContext();

// 2️⃣ Hook to use context
export const useCategoryContext = () => useContext(CategoryContext);

// 3️⃣ Initial state
const initialState = {
  name: "",
  desc: "",
  image: null,
  status:null,
};

// 4️⃣ Provider component
export const CategoryFormProvider = ({ children }) => {
  const [form, setForm] = useState(initialState);
  const [createText, setCreateText] = useState("");

  const updateForm = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const resetForm = () => {
    setForm(initialState);
    setCreateText("");
  };

  const generateText = () => {
    const summary = `Category "${form.name}".`;
    console.log("Desc:+ `${form.description}`");
    setCreateText(summary);
    return summary;
  };

  
  return (
    <CategoryContext.Provider
      value={{
        form,
        updateForm,
        createText,
        generateText,
        resetForm,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
