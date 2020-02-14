import React from 'react';
import CategoryProvider from '../contexts/CategoryContext';
import Category from '../components/category';

const CategoryPage = () => {
  return (
    <CategoryProvider>
        <h3>category page</h3>
        <Category/>
  </CategoryProvider>
    
      
  )
}

export default CategoryPage;