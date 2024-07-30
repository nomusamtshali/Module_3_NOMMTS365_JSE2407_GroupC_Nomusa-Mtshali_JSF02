<script>
    import { onMount } from 'svelte';
    import { navigate } from 'svelte-routing';
    import { fetchSingleProduct } from '../api';
  
    export let productId;
  
    let product = null;
    let loading = true;
    let error = null;
  
    onMount(async () => {
      await fetchProduct();
    });
  
    async function fetchProduct() {
      const { response, error } = await fetchSingleProduct(productId);
      if (error) {
        set({ error });
      } else {
        set({ product: response, loading: false });
      }
    }
  
    function goBack() {
      navigate('/');
    }
  </script>
  
  {#if loading}
    <div>Loading...</div>
  {/if}
  
  {#if error}
    <div class="mt-28 text-red-500 text-xl font-bold">{error}</div>
  {/if}
  
  {#if product}
    <div class="container mx-auto px-4 py-8">
      <button on:click={goBack} class="mb-4 p-2 bg-gray-200 rounded">Back to Products</button>
      <div class="flex flex-col md:flex-row">
        <div class="md:w-1/2 p-4">
          <img class="object-contain h-full w-full" src={product.image} alt={product.title} />
        </div>
        <div class="md:w-1/2 p-4">
          <h2 class="text-2xl font-bold mb-2">{product.title}</h2>
          <p class="text-lg text-gray-700 mb-4">{product.description}</p>
          <p class="text-lg font-bold mb-4">${product.price}</p>
          <div class="flex items-center mb-4">
            {#each Array(5) as _, i}
              <svg class="w-4 h-4 mr-1" class:i={i < Math.round(product.rating.rate) ? 'text-yellow-300' : 'text-gray-300'} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            {/each}
            <span class="text-sm text-gray-500 ml-2">{product.rating.count} reviews</span>
          </div>
          <span class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">{product.category}</span>
        </div>
      </div>
    </div>
  {/if}
  