<template>
  <div class="head_bar">
      <div>
          <!-- <img class="logo" src=""> -->
          <h3>DASHBOARD</h3>
      </div>
      <div class="head_bar">
          <div class="bar_content">

            </div>
            <div class="bar_end">

            </div>
      </div>

  </div>
</template>

<script>
export default {
  name: 'headBar',
  components: {},
  data () {
    return {}
  }
}
</script>

<style scoped>
.head_bar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: #181717;
  color: azure;
}
</style>
