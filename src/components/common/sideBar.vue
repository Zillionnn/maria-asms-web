<template>
 <div class="side_bar">
     <div v-for="(item, index) in menu" :key="index">
         {{item.name}}
     </div>
 </div>
</template>

<script>
export default {
  name: 'SideBar',
  props: [
    'menu'
  ],
  data () {
    return {

    }
  },
  components: {

  }
}
</script>

<style scoped>
.side_bar {
  width: 256px;
  top: 50px;
  bottom: 0;
  background: #181717;
  color: azure;
  position: absolute;
}
</style>
