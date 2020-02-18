import React from 'react';
import CategoryProvider from '../contexts/CategoryContext';
import Category from '../components/category';
// import Button from '@material-ui/core/Button';
// import { Link } from 'react-router-dom';
const CategoryPage = () => {
  return (
    <CategoryProvider>
        <Category/>
    </CategoryProvider>
  )
}

export default CategoryPage;