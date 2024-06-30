import axios from 'axios';
import APIConfig from './APIConfig';

const placeOrder = async (orderData) => {
  try {
    const response = await axios.post(`${APIConfig.baseURL}/api/order/place`, orderData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const getOrdersByUser = async (userId) => {
  try {
    const response = await axios.get(`${APIConfig.baseURL}/api/order/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export { placeOrder, getOrdersByUser };
