<template>
   <div  class="marker"   v-on:mouseover="showMarkLabel" v-on:mouseleave="hideMarkLabel" v-on:click="toDevicePage()">
      <div class="marker-label" v-show="mouseover">
        <span :title="text" style="padding-top:2px;
        white-space:wrap;font-size:20px;">{{text}}</span><br/>
        <span style="font-size: 16px;">{{itemInfo.location}}</span>
        <hr style="margin: 10px 0;"/>
        <span class="sub-text">
          传感器状态：
        </span>
        <br/>
        <span class="sub-text" v-if="this.itemInfo.status.hasOwnProperty('total')">
            传感器: {{overviewTotal}}
        </span>
        <br v-if="this.itemInfo.status.hasOwnProperty('total')"/>
        <span class="sub-text">
            正常传感器: {{normalNum}}
        </span>
        <br/>
        <div class="sub-text" style="color: red;">
          <span class="error-text">
            故障: {{itemInfo.status.total_outage}}
          </span>
          <br/>
          <span class="error-text">
            掉线: {{itemInfo.status.total_offline}}
          </span>
          <br/>
          <span class="error-text">
            告警：{{itemInfo.status.total_warning}}
          </span>

        </div>
        <span class="sub-text">
          <!-- 监测数据：正常？？？ -->
        </span>
      </div>
      </div>

</template>

<script>
// import * as api from '@/api'
export default {
  name: 'cust-oloverlay',
  props: ['text', 'itemInfo'],
  computed: {
    outageNum () {
      let r = this.itemInfo.status.total_outage
      return r
    },

    offlineNum () {
      let r = this.itemInfo.status.total_offline
      return r
    },

    warningNum () {
      let r = this.itemInfo.status.total_warning
      return r
    },

    normalNum () {
      let r = this.itemInfo.status.total_normal
      if (r) {
        return r
      } else {
        return 0
      }
    },

    overviewTotal () {
      try {
        let r = this.itemInfo.status.total

        if (r) {
          return r
        } else {
          return 0
        }
      } catch (error) {

      }
    }
  },
  data () {
    return {
      mouseover: false
    }
  },
  mounted () {
  },

  watch: {
    position: {
      handler () {
        this.$refs.customOverlay.reload()
      },
      deep: true
    },
    zoom: {
      handler () {
        this.$refs.customOverlay.reload()
      }
    }
  },
  methods: {
    showMarkLabel () {
      this.mouseover = true
    },
    hideMarkLabel () {
      this.mouseover = false
    }

    /**
     * 点击图标跳转到站点页面
     */
    // toDevicePage () {
    //   this.$store.dispatch('passStationTopoId', this.itemInfo.topo_id)
    //   this.$store.dispatch('getTopoId', this.itemInfo.topo_id)

    //   let topoId = this.itemInfo.topo_id
    //   api.topo.queryTopoDetail({topoId})
    //     .then((res) => {
    //       let result = res.data.data
    //       console.log(result)
    //       let categoryId = result.topo_category_id
    //       this.$store.dispatch('getCategoryId', categoryId)
    //       this.$store.dispatch('passSelectedDevice', this.itemInfo)
    //       this.$store.dispatch('getCategory', {
    //         name: result.topo_category_name,
    //         topo_category_id: categoryId
    //       })
    //       this.$store.dispatch('passStationName', result.name)
    //       this.$store.dispatch('passStationSubName', result.topo_category_name)

    //       this.$router.push({path: `/workboard/terminalEquipment/devicePanel/station/${topoId}`})
    //     })
    //     .catch()
    // }
  }
}
</script>

<style scoped lang="scss">
.sample {
  width: 25px;
  height: 25px;
  line-height: 28px;
  /*  background: rgba(0,0,0,0.5);
      overflow: hidden;
      box-shadow: 0 0 5px #000;*/
  color: #fff;
  text-align: center;
  position: absolute;
}

  .marker-label {
    opacity: 1;
    background: rgba(0, 0, 0, 0.5);
    box-shadow: 0 0 5px #000;
    width: 280px;
    height: auto;
    min-height: 240px;
    border-radius: 5px;
    position: absolute;
    top: 10px;
    left: 10px;
    text-align: left;
    padding: 15px;
    z-index:99;
    color: #ffffff;
  }

// .marker {
//   width: 11px;
//   height: 11px;
//   border-radius: 50%;
//   cursor: pointer;

//   position: relative;
//   // &:after {
//   //   content: "";
//   //   border-radius: 50%;
//   //   background: #24bbff;
//   //   width: 6px;
//   //   height: 6px;
//   //   position: absolute;
//   //   top: 2.5px;
//   //   left: 2.5px;
//   // }
// }

.marker-not-good {
  width: 16px;
  height: 16px;
  border: 2.5px solid #ff0000;
  border-radius: 50%;
  cursor: pointer;

  position: relative;
  &:after {
    content: "";
    border-radius: 50%;
    background: #ff0000;
    width: 11px;
    height: 11px;
    position: absolute;
    top: 2.5px;
    left: 2.5px;
  }
}

// .marker:hover {
//   .marker-label {
//     opacity: 1;
//     background: rgba(0, 0, 0, 0.5);
//     box-shadow: 0 0 5px #000;
//     width: 120px;
//     height: auto;
//     border-radius: 5px;
//     position: absolute;
//     top: -50px;
//     left: -125px;
//     text-align: left;
//     padding: 2px;
//   }
// }

.sub-text{
  display: inline-block;
  font-size: 16px;
  line-height: 29px;
}
</style>
