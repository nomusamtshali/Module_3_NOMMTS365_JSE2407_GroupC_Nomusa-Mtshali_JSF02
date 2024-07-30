<script>
    import { navigate } from 'svelte-routing';
    import { createEventDispatcher } from 'svelte';
    export let product;
    const dispatch = createEventDispatcher();
  
    function addToFavorites() {
      dispatch('addToFavorites', product);
    }
  
    function addToCart() {
      dispatch('addToCart', product);
    }
  
    function openProductDetail() {
      navigate(`/product/${product.id}`);
    }
  </script>
  
  <div on:click={openProductDetail} class="flex flex-col h-full bg-white border border-slate-200 shadow shadow-slate-950/5 rounded-2xl overflow-hidden hover:-translate-y-1 hover:scale-105 transition duration-300">
    <div class="p-4 flex items-center justify-center h-48">
      <img class="object-contain h-full w-full" src={product.image} alt={product.title} />
    </div>
    <div class="flex-1 flex flex-col p-4">
      <div class="flex-1">
        <header class="mb-2">
          <h2 class="text-lg font-extrabold leading-snug line-clamp-2">
            <div class="text-slate-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300">{product.title}</div>
          </h2>
        </header>
  
        <div class="flex items-center mb-2">
          {#each Array(5) as _, i}
            <svg class="w-4 h-4 mr-1" class:i={i < Math.round(product.rating.rate) ? 'text-yellow-300' : 'text-gray-300'} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          {/each}
        </div>
  
        <div class="text-base font-extrabold text-slate-500 leading-snug mb-4">
          <h2>{`$${product.price}`}</h2>
        </div>
      </div>
  
      <div class="flex items-center justify-between mt-auto">
        <span class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">{product.category}</span>
  
        <div class="flex items-center space-x-2">
          <button on:click|stopPropagation={addToFavorites} class="p-1">
            <svg class="h-5 w-5 hover:fill-red-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
            </svg>
          </button>
          <button on:click|stopPropagation={addToCart} class="inline-flex justify-center whitespace-nowrap rounded-lg bg-cyan-700 px-3 py-2 text-sm font-medium text-white hover:bg-cyan-900 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors">
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  </div>
  