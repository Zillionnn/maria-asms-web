<template>
  <div style="width: 100%;height: 100%;">
    <baidu-map
      class="map"
      :center="center"
      :zoom="zoom"
      :scrollWheelZoom="true"
      @ready="handler"
      @moving="syncCenterAndZoom"
      @moveend="syncCenterAndZoom"
      @zoomend="syncCenterAndZoom"
    >
      <!--                  mapType="BMAP_SATELLITE_MAP" -->
      <!--  <cust-overlay
          :position="{lng:118.764351, lat:31.979523}"
          :zoom="zoom"
          :text="'B区03幢'" />
        <cust-overlay
          :position="{lng:118.764451, lat:31.980200}"
          :zoom="zoom"
          :text="'B区07幢'" />
        <cust-overlay
          :position="{lng:118.765300, lat:31.980200}"
          :zoom="zoom"
      :text="'B区08幢'" />-->
      <!-- <cust-overlay v-for="(item, index) in itemList" :key="index"
          :position="{lng:item.longitude, lat:item.latitude}"
          :zoom="zoom"
          :text="item.name"
      :itemInfo="item"/>-->
      <dev-point
        v-for="(item,index) in itemList"
        :key="index"
        :position="{lng:item.longitude, lat:item.latitude}"
        :zoom="zoom"
        :name="item.alias"
        :itemInfo="item"
      />
    </baidu-map>
  </div>
</template>

<script>
import CustOverlay from './custOverlay/custOverlay'
import DevPoint from './custOverlay/DevPoint'
export default {
  name: 'device-map-item',
  components: { CustOverlay, DevPoint },
  props: {
    itemList: {
      type: Array,
      required: false
    }
  },
  data () {
    return {
      active: false,
      center: {
        lng: 132.21009,
        lat: 37.37875
      },
      zoom: 3,
      markerPoint: {
        lng: 118.808875,
        lat: 31.9699
      }
    }
  },
  methods: {
    handler ({ BMap, map }) {
      console.log(BMap, map)
      this.center.lng = 118.783562
      this.center.lat = 32.059629
      this.zoom = 10
    },
    syncCenterAndZoom (e) {
      const { lng, lat } = e.target.getCenter()
      this.center.lng = lng
      this.center.lat = lat
      this.zoom = e.target.getZoom()
      // console.log(lng, lat)
    }
  },
  created () {}
}
</script>

<style scoped>
.map {
  width: 100%;
  height: 100%;
}
.BMap_mask {
  width: 100%;
}
</style>
