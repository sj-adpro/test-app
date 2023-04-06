<script>
   import { onMount } from "svelte";
   import { loading, placeholder } from "$state/store";
   import Placeholder from "$api/Placeholder";

   // Svelte-store subscriptions
   $: loading;
   $: placeholder;

   // Page variables
   const api = new Placeholder(loading);

   /**
    * Set Limit
    * Sets the limit for the maximum images to retrieve.
    * @param value The limitting value
    */
   async function setLimit(value) {
      $placeholder = await api.setLimit(value);
   }

   /**
    * Previous Page
    * Fetches the previous page from Lorem Picsum
    */
   async function prevPage() {
      $placeholder = await api.prevPage();
   }

   /**
    * Next Page
    * Fetches the next page from Lorem Picsum
    */
   async function nextPage() {
      $placeholder = await api.nextPage();
   }

   /**
    * Initialize
    * Loads API data into a Svelte-store subscription.
    */
   async function initialize() {
      $placeholder = await api.fetch();
   }

   // On-mount lifecycle hook
   onMount(initialize);
</script>

<section class="grid">
   <button on:click={prevPage}>Previous Page</button>
   <label>
      <select on:change={e => setLimit(e.target.value)}>
         {#each {length: 10} as n, i}
         <option value={i+1} selected={i+1 === $placeholder.limit}>Limit {i+1}</option>
         {/each}
      </select>
   </label>
   <button on:click={nextPage}>Next Page</button>
</section>
<!-- Pagination Controls -->

<section class="grid container-fluid">
   {#if $placeholder.list}
      {#each $placeholder.list as image}
         <img alt={image.author} src={image.download_url} />
      {/each}
   {/if}
</section>
<!-- Image Grid -->

<section class="grid">
   <p>Page: {$placeholder.page}</p>
   <p>Limit: {$placeholder.limit}</p>
</section>
<!-- Pagination Data -->

<style>
   section.grid {
      text-align: center;
      margin: 1rem 0;
   }

   button {
      justify-self: center;
      max-width: fit-content;
   }
</style>
