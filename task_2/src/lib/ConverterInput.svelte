<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";
  import { createEventDispatcher } from "svelte";

  export let value: string;
  export let currency: string;
  export let currencyCodes: string[];
  export let disabled: boolean = false;
  let className: string = "";
  export { className as class };

  interface $$Props extends HTMLInputAttributes {
    value: string;
    currency: string;
    currencyCodes: string[];
    class?: string;
    disabled?: boolean;
  }

  const dispatch = createEventDispatcher<{
    valueChange: void;
    currencyChange: void;
  }>();

  const onBeforeInput = (e: InputEvent & {
    currentTarget: EventTarget & HTMLInputElement;
  }) => {
    const isInsertEvent = e.inputType.startsWith("insert");
    const value = e.currentTarget.value;
    const insertionData = e.data || "";
    const hasDot = (data: string) => /\./g.test(data);
    const isNanInput = (data: string) => !hasDot(data) && /[^\d]/g.test(data);
    if (isInsertEvent && (isNanInput(insertionData) || (hasDot(insertionData) && hasDot(value)))) {
      e.preventDefault();
    }
  }
</script>

<div class="converter-field {className}">
  <input
    bind:value={value}
    on:beforeinput={onBeforeInput}
    on:input={() => dispatch("valueChange")}
    {...$$restProps}
    {disabled}
    class="converter-field__input"
    inputmode="decimal"
    autocomplete="off"
    type="text"
    min="0"
    aria-label="Currency amount field"
  >

  <select
    bind:value={currency}
    on:change={() => dispatch("currencyChange")}
    class="converter-field__select"
    {disabled}
    aria-label="Currency type"
  >
    {#each currencyCodes as code}
      <option value={code}>
        {code}
      </option>
    {/each}
  </select>
</div>

<style>
  .converter-field {
    display: flex;
    border: 1px solid var(--clr-border);
    border-radius: 5px;
    overflow: hidden;
    color: var(--clr-text-accent);
    transition: border-color 0.1s ease-in-out;
  }
  
  .converter-field:where(:has(.converter-field__select:enabled, 
  .converter-field__input:enabled)):hover,
  .converter-field:where(:has(.converter-field__select:enabled, 
  .converter-field__input:enabled)):hover .converter-field__input:enabled {
    border-color: var(--clr-elements-border-hover);
  }

  .converter-field:focus-within {
    outline: 2px solid var(--clr-accent);
    outline-offset: -1px;
  }

  .converter-field__select {
    flex-basis: 20%;
  }

  .converter-field__select, 
  .converter-field__input {
    background-color: var(--clr-elements-bg);
    outline: none;
    border: none;
    padding: 0.35rem;
    font-size: 1.5rem;
    transition: border-color 0.1s ease-in-out;
  }

  .converter-field__select:disabled, 
  .converter-field__input:disabled {
    opacity: 0.5;
  }

  .converter-field__select:focus, 
  .converter-field__select:where(:enabled):hover {
    background-color: var(--clr-elements-bg-hover);
  }

  .converter-field__input:autofill {
    background-color: var(--clr-elements-bg);
  }

  .converter-field__input::selection {
    background-color: var(--clr-accent);
  }

  .converter-field__input {
    width: 100%;
    border-right: 1px solid var(--clr-border);
  }
</style>