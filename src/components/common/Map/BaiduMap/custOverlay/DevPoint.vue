<template>
  <bm-overlay
    ref="customOverlay"
    pane="labelPane"
    :class="{sample: true, active}"
    @draw="draw">
    <div class="marker"
       v-on:mouseover="showMarkLabel" v-on:mouseleave="hideMarkLabel">

      <div class="marker-label" v-show="mouseover">
        <div>类型：{{itemInfo.device_type_name}}</div>
        <div>型号：{{itemInfo.model_name}}</div>
        <div>ID：{{itemInfo.serial}}</div>
        <div>昵称：{{name}}</div>
      </div>
    </div>
  </bm-overlay>

</template>

<script>
// import * as api from '@/api'
export default {
  name: 'DevPoint',
  props: ['name', 'position', 'active', 'zoom', 'itemInfo'],
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
  text-align: center;
  position: absolute;
}

  .marker-label {
    opacity: 1;
    background: #ffffff;
    // box-shadow: 0 0 5px #000;
    width: 199px;
    height: auto;
    border-radius: 5px;
    position: absolute;
    top: -160px;
    left: -60px;
    text-align: left;
    padding: 15px 5px 17px 10px;
    z-index:99;
    &:after{
      content: '';
      position: absolute;
      bottom:-6px;
      left: 59px;
      width:15px;
      height: 15px;
      background: #ffffff;
      transform:rotate(45deg)

    }
  }

.marker {
  width: 19px;
  height: 25px;
  background: url('/static/marker.png');
  // border: 2.5px solid #24bbff;
  border-radius: 50%;
  cursor: pointer;
  position: relative;

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
