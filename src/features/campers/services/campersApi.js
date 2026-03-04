import axios from 'axios';

// Base URL for the mock API
const BASE_URL = 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io';

/**
 * Builds a query string from filter parameters.
 * @param {Object} params - Filter parameters (location, form, features, page, limit)
 * @returns {string} - Query string (e.g., "location=Kyiv&transmission=automatic&page=1")
 */
const buildQueryString = (params) => {
  const searchParams = new URLSearchParams();
  
  // Add location filter if provided
  if (params.location) searchParams.append('location', params.location);
  
  // Add vehicle type filter if provided (e.g., 'alcove', 'fullyIntegrated', 'panelTruck')
  if (params.form) searchParams.append('form', params.form);
  
  // Process feature filters (e.g., AC, kitchen, TV, etc.)
  if (params.features && params.features.length) {
    params.features.forEach(feature => {
      // Special case: 'automatic' should be sent as 'transmission=automatic'
      if (feature === 'automatic') {
        searchParams.append('transmission', 'automatic');
      } else {
        // All other features are boolean fields (e.g., AC=true, kitchen=true)
        searchParams.append(feature, true);
      }
    });
  }
  
  // Pagination parameters
  if (params.page) searchParams.append('page', params.page);
  if (params.limit) searchParams.append('limit', params.limit);
  
  // Convert to string (e.g., "location=Kyiv&transmission=automatic&page=1")
  return searchParams.toString();
};

/**
 * Fetches a paginated list of campers based on filters.
 * @param {Object} filters - Filter and pagination parameters
 * @returns {Promise<Object>} - Response containing { total, items }
 */
export const fetchCampers = async (filters) => {
  const query = buildQueryString(filters);
  console.log('🔍 API Request:', query); // For debugging purposes
  const response = await axios.get(`${BASE_URL}/campers?${query}`);
  return response.data; // Expected format: { total, items }
};

/**
 * Fetches a single camper by its ID.
 * @param {string} id - Camper ID
 * @returns {Promise<Object>} - Camper details
 */
export const fetchCamperById = async (id) => {
  const response = await axios.get(`${BASE_URL}/campers/${id}`);
  return response.data;
};