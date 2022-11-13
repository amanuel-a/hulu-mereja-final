import axios from "axios";
export default () => {
  return axios.create({
    baseURL: 'https://backend.hulumereja.com/api/v1/'
  });
};