<script lang="ts">
const capitalize = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const helpers = {
  capitalize
}
</script>