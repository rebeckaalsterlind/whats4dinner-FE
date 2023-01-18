<script lang="ts">
const capitalize = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const generateId = (): number => {
  return Math.floor(Math.random() * 100000);
}

export const helpers = {
  capitalize,
  generateId
}
</script>