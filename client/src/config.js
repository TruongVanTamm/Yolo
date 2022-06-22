import axios from 'axios'

export const  axiosInstance = axios.create({
    baseURL: "https://project-yolo.herokuapp.com/"
    // baseURL: "https://localhost:5000"
  });