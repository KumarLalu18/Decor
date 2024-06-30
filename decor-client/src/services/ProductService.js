import axios from 'axios';
import APIConfig from './APIConfig';

const getAllProducts = async () => {
  try {
    const response = await axios.get(`${APIConfig.baseURL}/api/products`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const getProductById = async (productId) => {
  try {
    const response = await axios.get(`${APIConfig.baseURL}/api/products/${productId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const getProductsByCategory = async (categoryId) => {
  try {
    const response = await axios.get(`${APIConfig.baseURL}/api/products/category/${categoryId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export { getAllProducts, getProductById, getProductsByCategory };
