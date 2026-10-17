import axios from "../utils/axios";

export const getProducts = async ({ params, body = {} }) =>
  axios
    .post(`product/list?page=${params?.page}&limit=${params?.limit}`, body)
    .then((res) => res.data)
    .catch((err) => err);

export const getCategories = async () =>
  axios
    .get("categories", {})
    .then((res) => res.data)
    .catch((err) => err);

export const getSubCategories = async (id) =>
  axios
    .get("subcategories", {
      params: {
        categoryId: id,
      },
    })
    .then((res) => res.data)
    .catch((err) => err);

export const getBrands = async (params) =>
  axios
    .get("brands", {
      params,
    })
    .then((res) => res.data)
    .catch((err) => err);

export const getSingleProduct = async (id) =>
  axios
    .get(`product/${id}`)
    .then((res) => res.data)
    .catch((err) => err);

export const getNews = async (params) =>
  axios
    .get("news", {
      params,
    })
    .then((res) => res.data)
    .catch((err) => err);
