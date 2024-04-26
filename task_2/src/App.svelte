<script lang="ts">
  import CurrencyConverter from "./lib/CurrencyConverter.svelte"
</script>

<main>
  <div class="wrapper">
    <h1 class="heading">Currency converter</h1>
    <div class="panel">
      <CurrencyConverter />
    </div>
  </div>
</main>

<style>
  .wrapper {
    max-width: 60em;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  .heading {
    margin-bottom: 1rem;
    font-size: 3rem;
    color: var(--clr-text-accent);
  }
  
  .panel {
    background-color: var(--clr-panel-bg);
    border: 1px solid var(--clr-border);
    padding: 1rem;
    border-radius: 5px;
  }
</style>
