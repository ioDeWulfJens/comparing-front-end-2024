<script lang="ts">
  type CheckboxProps = {
        label?: string;
        checked: boolean;
        onChange: (checked: boolean) => void;
    };

    let {
        label,
        checked,
        onChange
    } = $props<CheckboxProps>();

  const toggle = () => {
    onChange(!checked);
  };
</script>

{#if label}
  <label for="checkboxInput">{label}</label>
{/if}
<input
  id="checkboxInput"
  class="checkbox"
  type="checkbox"
  {checked}
  on:change={toggle}
/>
