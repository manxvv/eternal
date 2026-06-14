import api from "@/lib/axios";

export const productService = {
  // Fetch all products
  getProducts: async () => {
    const { data } = await api.get('/products');
    return data;
  },

  // Upload images first - Returns array of strings (the paths)
  uploadImages: async (formData: FormData) => {
    const { data } = await api.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data; // Expected: ["/product_images/123.jpg", ...]
  },

  // CRUD Operations
  createProduct: async (productData: any) => {
    const { data } = await api.post('/products', productData);
    return data;
  },

  updateProduct: async (id: string, productData: any) => {
    const { data } = await api.put(`/products/${id}`, productData);
    return data;
  },

  deleteProduct: async (id: string) => {
    const { data } = await api.delete(`/products/${id}`);
    return data;
  },
};