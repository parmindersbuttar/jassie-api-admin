import React from "react";
import CategoryProvider from "../contexts/CategoryContext";
import Category from "../components/category";

const CategoryPage = () => {
  return (
    <CategoryProvider>
      <Category />
    </CategoryProvider>
  );
};

export default CategoryPage;
