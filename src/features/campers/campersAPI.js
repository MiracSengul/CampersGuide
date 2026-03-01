import axios from "axios";

const BASE_URL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io";

export const fetchCampersAPI = async (params) => {
  const response = await axios.get(`${BASE_URL}/campers`, { params });
  return response.data;
};

export const fetchCamperByIdAPI = async (id) => {
  const response = await axios.get(`${BASE_URL}/campers/${id}`);
  return response.data;
};