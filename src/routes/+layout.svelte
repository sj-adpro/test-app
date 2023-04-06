<script>
    import { loading } from "$state/store";
    import Navbar from "$lib/components/Navbar.svelte";
    
    // Svelte-store subscriptions
    $: loading;
    
    // Toggle this for server-side rendering
    export const ssr = false;
</script>

<Navbar />
<!-- Nav Menu -->

<main class="container">
    <slot />
</main>
<!-- Page Slot -->

{#if $loading}
    <progress />
{/if}
<!-- Progress Bar -->

<style>
    @import '$lib/styles/pico.min.css';

    progress {
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 1000;
    }
</style>