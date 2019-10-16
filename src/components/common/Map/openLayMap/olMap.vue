<template>
 <div id='map' style="width: 100%;height:100%;">
      <cust-oloverlay v-for="(item, index) in itemList" :key="index" v-if="itemList.length>0"
       :id="'marker-'+index"  :text="item.name" :itemInfo="item"></cust-oloverlay>
      <!-- <div id="vienna">123</div> -->
 </div>
</template>

<script>
import {Map, View} from 'ol'
import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'
import {fromLonLat} from 'ol/proj'
import Overlay from 'ol/Overlay.js'
import CustOloverlay from './custOverlay/custOloverlay'
import env from '@/conf/env'
const offlineMapUrl = env.offlineMapUrl

export default {
  name: 'olMap',
  props: {
    itemList: {
      type: Array,
      required: false
    }
  },
  data () {
    return {
      pos: fromLonLat([118.808875, 31.9699]),
      map: {},
      mouseover: false
    }
  },
  computed: {
    itemList1st () {
      try {
        let r = this.itemList[0].topo_id
        return r
      } catch (e) {
        console.error(e)
      }
    }
  },
  components: {
    CustOloverlay
  },
  methods: {
    initMap () {
      // eslint-disable-next-line
      this.map = new Map({
        target: 'map',
        layers: [
          new TileLayer({
            source: new XYZ({
              url: offlineMapUrl
            })
          })
        ],
        // lng: 118.808875,
        // lat: 31.9699
        view: new View({
          center: fromLonLat([120.282, 31.528]),
          // center: fromLonLat([120.313, 31.459]),
          zoom: 10
        })
      })
    },

    initMaker (point, index) {
      const _self = this
      let lon = point.longitude
      let lat = point.latitude
      let pos = fromLonLat([lon, lat])
      console.log('___pos_', pos, index)
      let marker = new Overlay({
        position: pos,
        positioning: 'center-center',
        element: document.getElementById(`marker-${index}`),
        stopEvent: false
      })
      _self.map.addOverlay(marker)
    //   var vienna = new Overlay({
    //     position: _self.pos,
    //     element: document.getElementById('vienna')
    //   })
    //   _self.map.addOverlay(vienna)
    },

    showMarkLabel () {
      this.mouseover = true
    },
    hideMarkLabel () {
      this.mouseover = false
    }
  },
  mounted () {
    this.initMap()
    const _self = this
    _self.itemList.forEach((point, index) => {
      _self.initMaker(point, index)
    })
  },
  watch: {
    itemList: {
      handler (val, oldValue) {
        console.log('item list length has changed', val)
        const _self = this
        console.log(_self.map)
        _self.itemList.forEach((point, index) => {
          console.log(document.getElementById(`marker-${index}`))
          this.$nextTick(() => {
            _self.initMaker(point, index)
          })
        })
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.marker{
  width: 12px;
  height: 12px;
  /* border: 2.5px solid #24bbff; */
  background:#24bbff;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
}
  /* .marker:after {
    content: "";
    border-radius: 50%;
    background: #24bbff;
    width: 11px;
    height: 11px;
    position: absolute;
    top: 2.5px;
    left: 2.5px;
  } */

      #vienna {
        text-decoration: none;
        color: white;
        font-size: 11pt;
        font-weight: bold;
        text-shadow: black 0.1em 0.1em 0.2em;
      }
      .popover-content {
        min-width: 180px;
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
</style>
