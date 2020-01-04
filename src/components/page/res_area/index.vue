<template>
  <div style="width:100%;">
    <keep-alive :include="'resarea'">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
export default {
  name: 'areaIndex',
  components: {

  },
  data () {
    return {

    }
  }
}
</script>

<style scoped>
</style>
