import axios from 'axios';
import APIConfig from './APIConfig';

const addOrUpdateCart = async (cartItemData) => {
  try {
    const response = await axios.post(`${APIConfig.baseURL}/api/cart`, cartItemData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const getUserCart = async (userId) => {
  try {
    const response = await axios.get(`${APIConfig.baseURL}/api/cart/view/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const clearCart = async (userId) => {
  try {
    const response = await axios.delete(`${APIConfig.baseURL}/api/cart/clear/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export { addOrUpdateCart, getUserCart, clearCart };
