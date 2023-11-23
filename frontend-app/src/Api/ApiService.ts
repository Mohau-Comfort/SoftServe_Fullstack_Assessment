import axios from 'axios';

const API_BASE_URL = 'https://localhost:7023'; // API base URL

const apiService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createCustomer = async (customer: any) => {
  try {
    const response = await apiService.post('/customers', customer);
    return response.data;
  } catch (error) {
    console.error('Error creating customer:', error);
    throw error;
  }
};

export const getCustomers = async () => {
  try {
    const response = await apiService.get('/customers');
    return response.data;
  } catch (error) {
    console.error('Error in getCustomers:', error);
    throw error;
  }
};

export const getCustomerById = async (id: string) => {
  try {
    const response = await apiService.get(`/customers/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error getting customer by ID:', error);
    throw error;
  }
};

export const updateCustomer = async (id: string, updatedCustomer: any) => {
  try {
    const response = await apiService.put(`/customers/${id}`, updatedCustomer);
    return response.data;
  } catch (error) {
    console.error('Error updating customer:', error);
    throw error;
  }
};

export const deleteCustomer = async (id: string) => {
  try {
    await apiService.delete(`/customers/${id}`);
  } catch (error) {
    console.error('Error deleting customer:', error);
    throw error;
  }
};