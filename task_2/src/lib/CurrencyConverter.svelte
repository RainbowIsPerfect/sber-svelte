<script lang="ts">
  import ConverterInput from "./ConverterInput.svelte";
  import Spinner from './Spinner.svelte';
  import ArrowsIcon from "./ArrowsIcon.svelte";
  import { ExchangeService, type ConversionRates } from "../api";
  import { useQuery } from "../store";
  import { formatCurrency, formatUpdateTime } from "../utils";

  let fromCurrencyValue = "1";
  let toCurrencyValue = "1";

  let fromCurrency = "USD";
  let toCurrency = "USD";

  let conversionRates: ConversionRates = { USD: 1, RUB: 2 };
  let lastUpdateTime = formatUpdateTime(new Date());

  const exchangeResult = useQuery(() => {
    return ExchangeService.getConversionRates(fromCurrency);
  }, (data) => {
      lastUpdateTime = formatUpdateTime(new Date(data.lastUpdate));
      conversionRates = data.conversionRates;
      setToCurrency();
  })

  const setToCurrency = () => {
    toCurrencyValue = (+fromCurrencyValue * conversionRates[toCurrency]).toFixed(2);
  }

  const setFromCurrency = () => {
    fromCurrencyValue = (+toCurrencyValue / conversionRates[toCurrency]).toFixed(2);
  }

  const switchCurrencies = async () => {
    const temp = fromCurrency;
    fromCurrency = toCurrency;
    toCurrency = temp;
  }

  $: exchangeResult.query(fromCurrency);
  $: currencyCodes = Object.keys(conversionRates);
  $: formattedFromCurrencyValue = formatCurrency(+fromCurrencyValue, fromCurrency);
  $: formattedToCurrencyValue = formatCurrency(+toCurrencyValue, toCurrency);
</script>

<div class="converter" aria-label="Currency exchange rate converter">
  {#if !$exchangeResult.isError}
    <div class="converter__info">
      <p class="from-currency">{formattedFromCurrencyValue} equals</p>
      <p class="to-currency" aria-busy={$exchangeResult.isLoading}>
        {#if $exchangeResult.isLoading}
          <Spinner/>
        {:else}
          {formattedToCurrencyValue}
        {/if}
      </p>
      <p class="update-time">{lastUpdateTime}</p>
    </div>

    <div class="converter__inputs">
      <ConverterInput 
        bind:value={fromCurrencyValue}
        bind:currency={fromCurrency}
        on:valueChange={setToCurrency}
        class="converter__field"
        disabled={$exchangeResult.isLoading}
        currencyCodes={currencyCodes}
      />

      <button 
        on:click={switchCurrencies} 
        class="button"
        disabled={$exchangeResult.isLoading}
        aria-label="Switch currencies"
      >
        <ArrowsIcon/>
      </button>

      <ConverterInput 
        bind:value={toCurrencyValue}
        bind:currency={toCurrency}
        on:valueChange={setFromCurrency}
        on:currencyChange={setToCurrency}
        class="converter__field"
        disabled={$exchangeResult.isLoading}
        {currencyCodes}
      />
    </div>
  {:else}
  <div class="converter__error">
    <p class="message">Something went wrong</p>
    <button 
      on:click={() => exchangeResult.query(fromCurrency)}
      class="button"
    >
      Try again
    </button> 
  </div>
  {/if}
</div> 

<style>
  .converter__inputs {
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
  }

  .converter__info {
    margin-bottom: 1rem;
  }

  .converter__error {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .from-currency {
    font-size: 1.2rem;
    word-break: break-word;
  }

  .to-currency {
    font-size: 2.5rem;
    color: var(--clr-text-accent);
    word-break: break-word;
  }

  .update-time {
    font-size: 1rem;
  }

  .button {
    align-self: center;
    display: flex;
    justify-content: center;
    border: 1px solid var(--clr-border);
    border-radius: 5px;
    font-size: 1.5rem;
    padding: 0.5rem;
    background-color: var(--clr-elements-bg);
    transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out;
  }

  .button:where(:enabled):hover {
    color: var(--clr-text-accent);
    cursor: pointer;
  }

  .button:focus-visible {
    outline: 2px solid var(--clr-accent);
    outline-offset: -2px;
  }
  
  .button:where(:enabled):active {
    background-color: var(--clr-elements-bg-hover);
  }

  .button:disabled {
    opacity: 0.5;
  }

  .message {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
</style>
