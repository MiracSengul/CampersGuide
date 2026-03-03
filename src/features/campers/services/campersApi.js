import axios from 'axios';

const BASE_URL = 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io';

// convert filters into query strings
const buildQueryString = (params) => {
  const searchParams = new URLSearchParams();
  
  if (params.location) searchParams.append('location', params.location);
  if (params.form) searchParams.append('form', params.form);
  if (params.features && params.features.length) {
    params.features.forEach(feature => {
      searchParams.append(feature, true);
    });
  }
  if (params.page) searchParams.append('page', params.page);
  if (params.limit) searchParams.append('limit', params.limit);
  
  return searchParams.toString();
};

export const fetchCampers = async (filters) => {
  const query = buildQueryString(filters);
  const response = await axios.get(`${BASE_URL}/campers?${query}`);
  return response.data; // { total, items }
};

export const fetchCamperById = async (id) => {
  const response = await axios.get(`${BASE_URL}/campers/${id}`);
  return response.data;
};