import api from './api'; // Импорт axios из api.ts

// Функция для получения всех товаров
export const fetchProducts = async (searchTerm?: string) => {
    try {
      const response = await api.get('/products', {
        params: { search: searchTerm }, // Передаём параметр поиска
      });
      return response.data;
    } catch (error) {
      console.error('Ошибка при получении товаров:', error);
      throw error;
    }
  };
  

// Функция для добавления нового товара
export const addProduct = async (newProduct: { name: string; price: number }) => {
  try {
    const response = await api.post('/products', newProduct); // Запрос на добавление товара
    return response.data; // Возвращаем добавленный товар
  } catch (error) {
    console.error('Ошибка при добавлении товара:', error);
    throw error;
  }
};
