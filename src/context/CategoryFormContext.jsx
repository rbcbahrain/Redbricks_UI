import React, { createContext, useContext, useState } from "react";

// 1️⃣ Create context
const FormContext = createContext();

// 2️⃣ Hook to use context
export const useFormContext = () => useContext(FormContext);

// 3️⃣ Initial state
const initialState = {
  name: "",
  desc: "",
  image: null,
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
    setCreateText(summary);
    return summary;
  };

  // ✅ Use FormContext.Provider, not CategoryFormProvider.Provider
  return (
    <FormContext.Provider
      value={{
        form,
        updateForm,
        resetForm,
        createText,
        generateText,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
