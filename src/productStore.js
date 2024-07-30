import { writable, get } from 'svelte/store';
import { getCategories, fetchSingleProduct } from './api';

export const productStore = writable({
  products: [],
  originalProducts: [],
  loading: false,
  error: false,
  sorting: "default",
  searchTerm: "",
  filterItem: "All categories",
  categories: []
});

export const setSorting = (sorting) => {
  productStore.update(store => {
    store.sorting = sorting;
    sortProducts();
    return store;
  });
};

export const setSearchTerm = (searchTerm) => {
  productStore.update(store => {
    store.searchTerm = searchTerm;
    searchProducts();
    return store;
  });
};

export const setFilterItem = (category) => {
  productStore.update(store => {
    store.filterItem = category;
    fetchProducts();
    return store;
  });
};

export const fetchProducts = async () => {
  const store = get(productStore);
  productStore.update(store => ({ ...store, loading: true }));
  
  try {
    const response = await fetch(
      store.filterItem !== "All categories"
        ? `https://fakestoreapi.com/products/category/${store.filterItem}`
        : `https://fakestoreapi.com/products`
    );
    if (!response.ok) throw new Error("Data fetching failed, please check your network connection");

    const data = await response.json();
    productStore.update(store => ({
      ...store,
      products: data,
      originalProducts: JSON.parse(JSON.stringify(data)),
      loading: false
    }));

    sortProducts();
    searchProducts();
  } catch (error) {
    productStore.update(store => ({ ...store, error: error.message, loading: false }));
  }
};

export const fetchCategories = async () => {
  const { response, error } = await getCategories();
  if (error) {
    productStore.update(store => ({ ...store, error }));
  } else {
    productStore.update(store => ({ ...store, categories: response }));
  }
};

const sortProducts = () => {
  productStore.update(store => {
    if (store.sorting !== "default") {
      store.products = store.products.sort((a, b) =>
        store.sorting === "low" ? a.price - b.price : b.price - a.price
      );
    } else {
      store.products = JSON.parse(JSON.stringify(store.originalProducts));
    }
    return store;
  });
};

const searchProducts = () => {
  const store = get(productStore);
  if (store.searchTerm.trim() !== "") {
    const filteredProducts = store.originalProducts.filter(product =>
      product.title.toLowerCase().includes(store.searchTerm.toLowerCase())
    );
    productStore.update(store => ({ ...store, products: filteredProducts }));
  }
};
