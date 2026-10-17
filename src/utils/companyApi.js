import api from './axios';

export async function companyList(resource, params, signal) {
  const response = await api.get(resource, { params, signal, timeout: 12000 });
  if (!Array.isArray(response.data?.data)) throw new Error('Invalid list response');
  return response.data.data;
}

export async function companyProducts({ page, body, signal }) {
  const response = await api.post(`product/list?page=${page}&limit=12`, body, { signal, timeout: 12000 });
  if (!Array.isArray(response.data?.data)) throw new Error('Invalid product response');
  return response.data.data;
}

export async function companyProduct(id, signal) {
  const response = await api.get(`product/${encodeURIComponent(id)}`, { signal, timeout: 12000 });
  const product = response.data?.data;
  if (!product || !product.product_id) throw new Error('Product unavailable');
  return product;
}
