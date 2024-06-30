import axios from 'axios';
import APIConfig from './APIConfig';
import AuthService from './AuthService';

const updateUser = async (userId, userData) => {
  try {
    const response = await axios.put(`${APIConfig.baseURL}/api/user/update/${userId}`, userData);
    const updatedUser = response.data;
    AuthService.setUser(updatedUser);
    return updatedUser;
  } catch (error) {
    throw error.response.data;
  }
};

const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${APIConfig.baseURL}/api/user/register`, userData);
    const newUser = response.data;
    AuthService.setUser(newUser);
    return newUser;
  } catch (error) {
    throw error.response.data;
  }
};

const loginUser = async (loginData) => {
  try {
    const response = await axios.post(`${APIConfig.baseURL}/api/user/login`, loginData);
    const loggedInUser = response.data;
    AuthService.setUser(loggedInUser);
    return loggedInUser;
  } catch (error) {
    throw error.response.data;
  }
};

const getUser = async (userId) => {
  try {
    const response = await axios.get(`${APIConfig.baseURL}/api/user/view/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export { updateUser, registerUser, loginUser, getUser };
