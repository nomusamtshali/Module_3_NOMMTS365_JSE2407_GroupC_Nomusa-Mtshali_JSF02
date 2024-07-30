<script>
  import { Router, Route } from 'svelte-routing';
  import Header from './lib/Header.svelte';
  import Filter from './lib/Filter.svelte';
  import Sort from './lib/Sort.svelte';
  import ProductList from './lib/ProductList.svelte';
  import ProductDetail from './lib/ProductDetail.svelte';
  import { productStore, fetchProducts } from './productStore';

  import { onMount } from 'svelte';
  onMount(async () => {
    await fetchProducts();
  });
</script>

<Header />

<Router>
  <main class="container mx-auto mt-8">
    <Route path="/">
      <div class="grid lg:flex gap-y-4 gap-x-48 lg:items-start mt-3 mx-auto justify-center">
        <Filter />
        <Sort />
      </div>
      <ProductList />
    </Route>
    <Route path="product/:productId" component={ProductDetail} />
  </main>
</Router>
