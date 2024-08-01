<script>
  import { Router, Route } from 'svelte-routing';
  import Header from './lib/Header.svelte';
  import ProductDetail from './lib/ProductDetail.svelte';
  // import { productStore, fetchProducts } from './productStore';

  import { onMount } from 'svelte';
  import ProductCard from './lib/ProductCard.svelte';
</script>

<Header />

<Router>
  <main class="container mx-auto mt-8">
    <Route path="/">
       <ProductCard/>
    </Route>
    <Route path="products/:id" component={ProductDetail} />
  </main>
</Router>
