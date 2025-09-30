import api from './api';

export const fetchProducts = async (searchTerm?: string) => {
    try {
      const response = await api.get('/products', {
        params: { search: searchTerm },
      });
      return response.data;
    } catch (error) {
      console.error('error:', error);
      throw error;
    }
  };
  

export const addProduct = async (newProduct: { name: string; price: number }) => {
  try {
    const response = await api.post('/products', newProduct);
    return response.data;
  } catch (error) {
    console.error('erero:', error);
    throw error;
  }
};
