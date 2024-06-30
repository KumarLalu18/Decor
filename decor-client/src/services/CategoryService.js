import axios from 'axios';
import APIConfig from './APIConfig';

const getAllCategories = async () => {
  try {
    const response = await axios.get(`${APIConfig.baseURL}/api/categories`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const getCategoryById = async (categoryId) => {
  try {
    const response = await axios.get(`${APIConfig.baseURL}/api/categories/${categoryId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export { getAllCategories, getCategoryById };
