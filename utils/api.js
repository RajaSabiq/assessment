import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import envConfig from './envConfig';

const API_LINK = envConfig.REACT_APP_API_URL;

const api = axios.create({
  baseURL: API_LINK,
});

api.interceptors.request.use(async (request) => {
  const value = await AsyncStorage.getItem('@token');
  console.log(value);
  if (value)
    request.headers = {
      Authorization: `bearer ${value}`,
    };
  return request;
});

export default api;
