<template>
  <div>
    Выход
  </div>
</template>

<script>
export default {
  name: 'Logout',
  created() {
    this.$store.dispatch('auth/logoutUser')
  }
}
</script>
