// src/components/Category/CategoryFormWrapper.jsx
import { FormProvider } from "../../context/FormContext";
import CategoryForm from "./CategoryForm";

const CategoryFormWrapper = () => {
  const initialState = {
    name: "",
    desc: "",
    image: null,
  };

  return (
    <FormProvider initialState={initialState}>
      <CategoryForm />
    </FormProvider>
  );
};

export default CategoryFormWrapper;
