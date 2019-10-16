<template>
  <bm-overlay
    ref="customOverlay"
    pane="labelPane"
    :class="{sample: true, active}"
    @draw="draw">
    <div :class="{
       'marker': warningNum === 0 && offlineNum === 0 && outageNum === 0,
       'marker-not-good': offlineNum > 0 && outageNum > 0 && warningNum > 0 }"
       v-on:mouseover="showMarkLabel" v-on:mouseleave="hideMarkLabel" v-on:click="toDevicePage()">
      <div style="height: 18px; width:60px; ">
        <div :class="{'local-fa warn': warningNum > 0}" style="float:left;"></div>
        <div :class="{'local-fa offline': offlineNum > 0}" style="float:left;"></div>
        <div :class="{'local-fa exclamation': outageNum > 0}" style="float:left;"></div>
      </div>

      <div class="marker-label" v-show="mouseover">
        <span :title="text" style="padding-top:2px;
        white-space:wrap;">{{text}}</span>
        <span style="font-size: 0.5rem;">{{itemInfo.location}}</span>
        <hr/>
        <span class="sub-text">
          传感器状态：
        </span>
        <br/>
        <div class="sub-text" style="color: red;">
          <span class="error-text">
            故障:{{itemInfo.status.total_outage}}
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
  </bm-overlay>

</template>

<script>
// import * as api from '@/api'
export default {
  name: 'cust-overlay',
  props: ['text', 'position', 'active', 'zoom', 'itemInfo'],
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
    }
  },
  data () {
    return {
      mouseover: false
    }
  },
  mounted () {
    console.log('POSITION>>', this.position)
  },

  watch: {
    position: {
      handler (val) {
        // console.log('---------------------', val)
        if (val.lat) {
          this.$refs.customOverlay.reload()
        }
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
    /* handleClick () {
      global.alert('Well done.')
    }, */
    draw ({ el, BMap, map }) {
      const { lng, lat } = this.position
      const pixel = map.pointToOverlayPixel(new BMap.Point(lng, lat))
      // console.log('pixedl,,,,,,,,,,,,', pixel, 'zoom ... ', this.zoom)
      el.style.left = pixel.x - 20 + 'px'
      el.style.top = pixel.y - 20 + 'px'
    },

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
    width: 120px;
    height: auto;
    border-radius: 5px;
    position: absolute;
    top: -50px;
    left: -125px;
    text-align: left;
    padding: 2px;
    z-index:99;
  }

.marker {
  width: 16px;
  height: 16px;
  border: 2.5px solid #24bbff;
  border-radius: 50%;
  cursor: pointer;

  position: relative;
  &:after {
    content: "";
    border-radius: 50%;
    background: #24bbff;
    width: 11px;
    height: 11px;
    position: absolute;
    top: 2.5px;
    left: 2.5px;
  }
}

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
  font-size: 0.7rem;
  line-height: 0.7rem !important;
}

.error-text{
  line-height: 14px;
}
</style>
