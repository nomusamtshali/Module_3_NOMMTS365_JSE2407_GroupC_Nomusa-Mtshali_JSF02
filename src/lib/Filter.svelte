<script>
    import { onMount } from 'svelte';
    import { productStore, setSearchTerm, fetchCategories } from '../productStore';
    import { get } from 'svelte/store';
  
    // props
    export let categories = []; // list of available categories
    export let selectedCategory = ''; // currently selected category
    export let searchTerm = ""; // search term entered by user
    export let onCategoryChange = () => {}; // callback function to handle category change
  
    // reactive variables
    $: ({ filterItem, searchTerm, categories } = get(productStore));
  
    // lifecycle method to fetch categories when the component is mounted
    onMount(async () => {
      await fetchCategories();
    });

    // function to handle category change event 
    const handleChange = (event) => {
      // @ts-ignore
      onCategoryChange(event.target.value);
    }
  </script>
  
  <form>
    <div class="flex lg:w-[31.25rem] sm:w-[95%] md:w-full relative">

      <div>
        <label for="category"  class="w-20 my-auto font-semibold"></label>
        <select id="category" on:change={handleChange} bind:value={selectedCategory} class="inline-flex w-full px-4 py-2 hover:bg-gray-100" >
          <option value="">All categories</option>
          {#each categories as category}
            <option value={category}>{category}</option>
          {/each}
        </select>
      </div>
  
      <div class="relative w-full max-w-xs">
        <input type="search" id="search-dropdown" name="searchInput" class="p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Search products..." bind:value={searchTerm} on:input={() => setSearchTerm(searchTerm)} />
        <button type="submit" class="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
          <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
          <span class="sr-only">Search</span>
        </button>
      </div>
    </div>
  </form>
  