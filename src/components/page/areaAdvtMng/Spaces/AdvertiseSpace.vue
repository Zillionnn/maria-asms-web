<template>
  <!-- ###############################################投放方案################################################# -->
  <div class="page">
    <h2 v-if="isPage">租赁 / 广告位</h2>
    <div style="width: 100%;height:900px;margin-top: 23px;">
      <div v-if="isPage">
        企业：
        <span style="font-size:20px;font-weight:bold;">{{selectedCO.name}}</span>
      </div>
      <!-- 添加的form -->
      <div v-if="isPage" style="display:flex;justify-content:space-around;">
        <v-btn color="primary" dark to="/resdentialArea/areas">添加更多广告位</v-btn>
        <advt-space-upload-xls/>
      </div>

      <dialog-form
        :dialog="dialog"
        @open="openDialog()"
        @cancel="cancelDialog()"
        @submit="addCo"
        @update="updateCo"
      ></dialog-form>
      <div class="query_tool">
        <v-combobox
          class="box"
          v-model="queryObj.section"
          :items="sectionList"
          label="区域"
          multiple
          chips
          :clearable="true"
          small-chips
        ></v-combobox>

        <v-combobox
          class="box"
          v-model="queryObj.area_name"
          :items="areaNameList"
          label="小区名"
          multiple
          chips
          :clearable="true"
          small-chips
        ></v-combobox>
        <v-combobox
          class="box"
          v-model="queryObj.area_location"
          label="地址"
          multiple
          chips
          :clearable="true"
          small-chips
        ></v-combobox>
        <v-combobox
          class="box"
          v-model="queryObj.advt_space_position"
          label="广告位置"
          multiple
          chips
          :clearable="true"
          small-chips
        ></v-combobox>
        <v-combobox
          class="box"
          v-model="queryObj.lightSize"
          label="广告位尺寸"
          multiple
          chips
          :clearable="true"
          small-chips
          :placeholder="'输入示例：3*1.5'"
        ></v-combobox>
        <v-select
          class="mr-2"
          v-model="queryObj.isExclusive"
          :items="isRealestateList"
          item-text="title"
          item-value="value"
          label="是否排他"
          clearable
        ></v-select>
        <v-select
          v-model="queryObj.isRented"
          :items="isRentedList"
          item-text="title"
          item-value="value"
          label="是否出租"
          clearable
        ></v-select>
      </div>
      <v-btn color="primary" @click="getList()">查询</v-btn>
      <v-btn v-if="isPage" @click="toRentPage()">出租</v-btn>
      <v-btn v-if="!isPage" @click="sendToPlan()">添加到方案</v-btn>
      <v-btn @click="clearSelected()">清空选中</v-btn>

      <v-data-table :headers="headers" :items="tableData" hide-actions selectAll v-model="selected">
        <template slot="headers" slot-scope="props">
          <tr>
            <th>
              <v-checkbox @change="toggleAll" v-model="toggleAllCkBox" style="margin-top:15px;"></v-checkbox>
            </th>
            <th
              style="font-size:15px;"
              v-for="header in props.headers"
              :key="header.text"
            >{{ header.text }}</th>
          </tr>
        </template>
        <template v-slot:items="props">
          <!-- name, co_id, location, lease_time, lease_time_unit, size -->
          <td>
            <v-checkbox
              v-model="props.selected"
              primary
              hide-details
              @change="checkSelectedSp(props.item,arguments)"
              :disabled="props.item.isrented===1"
            ></v-checkbox>
          </td>
          <td>{{ props.item.area_name }}</td>
          <td>{{props.item.section}}</td>
          <td>{{props.item.area_location}}</td>
          <td>{{props.item.co_name}}</td>
          <td>{{props.item.advt_name}}</td>
          <td>{{props.item.advt_space_position}}</td>
          <td>{{props.item.advt_space_position_des}}</td>
          <td>
            <!-- <span v-if="props.item.isrented===0" style="color:#000000;background:#cccccc;padding:7px;border-radius:2px;">否</span> -->
            <span v-if="props.item.isrented===0">否</span>
            <span v-if="props.item.isrented===1">是</span>
          </td>
          <td>
            <span v-if="props.item.is_exclusive">是</span>
            <span v-else>否</span>
          </td>
          <td>{{ftoLocalDate(props.item.expire_time)}}</td>

          <td>
            <span
              v-if="props.item.light_size"
            >{{props.item.light_size[0]}}*{{props.item.light_size[1]}}</span>
          </td>
          <td>
            <img :src="props.item.advt_position_image" width="200px" height="100px">
          </td>
          <td class="justify-center layout px-0">
            <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
            <v-icon small @click="stopREnt(props.item)" title="停止出租">trip_origin</v-icon>
          </td>
        </template>
      </v-data-table>
      <div>
        <v-pagination
          v-model="pagination.page"
          :length="pages"
          @input="doInput"
          style="float:right;"
        ></v-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import * as api from '@/api/index'
import DialogForm from './component/DialogForm'
import AdvtSpaceUploadXls from './component/AdvtSpaceUploadXls'
import { toLocalDate } from '@/utils/tool'
export default {
  name: 'AdvertiseSpace',
  components: {
    DialogForm,
    AdvtSpaceUploadXls
  },
  props: {
    isPage: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  computed: {
    pages () {
      if (
        this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      ) {
        return 0
      }

      return Math.ceil(
        this.pagination.totalItems / this.pagination.rowsPerPage
      )
    },
    selectedSpace () {
      return this.$store.getters.selectedSpace
    },
    selectedCO () {
      return this.$store.getters.selectCO
    }
  },
  data () {
    return {
      selected: [],
      alert: {
        visible: false,
        type: ''
      },
      dialog: {
        mode: 'add',
        visible: false,
        info: null
      },
      pagination: {
        page: 1,
        rowsPerPage: 10,
        totalItems: 0
      },
      fake: null,
      headers: [
        { text: '小区', value: 'name', sortable: false },
        { text: '区域', value: 'name', sortable: false },
        { text: '地址', value: 'name', sortable: false },
        { text: '公司', value: 'co_id', sortable: false },
        { text: '广告', value: 'co_id', sortable: false },
        { text: '灯箱位置', value: 'position', sortable: false },
        { text: '位置描述', value: 'location', sortable: false },
        { text: '是否出租', value: 'isrented', sortable: false, filter: true },
        { text: '排他', value: 'is_exclusive', sortable: false, filter: true },
        { text: '到期时间', value: 'lease_time', sortable: false },
        { text: '尺寸', value: 'size', sortable: false },
        { text: '图片', value: 'advt_position_image', sortable: false },
        { text: 'DO', value: 'DO', sortable: false }
      ],
      tableData: [],
      isLoaded: false,
      isRentedList: [
        {
          title: '是',
          value: 1
        },
        {
          title: '否',
          value: 0
        }
      ],
      isRealestateList: [
        {
          title: '是',
          value: true
        },
        {
          title: '否',
          value: false
        }
      ],
      queryObj: {},
      sectionList: ['东区', '西区'],
      areaList: [],
      areaNameList: [],
      fileList: [],
      toggleAllCkBox: false
    }
  },
  created () {
    console.log('=============Spaces/index.vue===========')
    this.getAreaList()
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList (val) {
      console.log('SELECTED selectedSpace ', this.selectedSpace)
      console.log('this.queryObj.is_exclusive>>s', this.queryObj.is_exclusive)
      this.pagination.page = val === undefined ? 1 : val
      let offset =
        val === undefined ? 0 : this.pagination.rowsPerPage * (val - 1)
      // let isRented = this.queryObj.isRented
      if (this.queryObj.isRented > -1) {
        this.queryObj.isrented = [this.queryObj.isRented]
      } else {
        this.queryObj.isrented = []
      }

      if (this.queryObj.isExclusive === undefined) {
        this.queryObj.is_exclusive = []
      } else {
        this.queryObj.is_exclusive = [this.queryObj.isExclusive]
      }

      if (this.queryObj.lightSize) {
        this.queryObj.light_size = this.queryObj.lightSize.map(size => {
          let asterisk = size.indexOf('*')
          console.log('*>>', asterisk)
          let width = size.substring(0, asterisk)
          let height = size.substring(asterisk + 1, size.length)
          return `{${width},${height}}`
        })
      }
      console.log('QUERY OBJ>>', this.queryObj)

      api.areaAdvt
        .list({ ...this.queryObj, offset })
        .then(r => {
          console.log('tag', r.data.data)
          this.tableData = r.data.data
          this.pagination.totalItems = r.data.total
          this.selected = [...this.selectedSpace]
          this.isLoaded = true
          console.warn('api')
        })
        .catch(err => {
          this.$message({
            type: 'error',
            message: err
          })
          console.error('()', err)
        })
    },
    /**
     * CHANGE THE PAGE
     */
    doInput (a, b, c) {
      this.getList(this.pagination.page)
    },
    editItem (item) {
      this.dialog = {
        mode: 'edit',
        info: item,
        visible: true
      }
    },
    deleteItem (item) {
      var r = confirm('确认删除？')
      if (r === true) {
        api.areaAdvt.deleteArea(item.id).then(r => {
          this.$message({
            type: 'success',
            message: '操作成功'
          })
          this.getList()
        })
      }
    },
    /**
    添加
     */
    addCo (form) {
      api.areaAdvt
        .addAdvt(form)
        .then(r => {
          this.cancelDialog()
          this.$message({
            type: 'success',
            message: '操作成功'
          })
          this.getList()
        })
        .catch(err => {
          console.error('add co', err)
          this.$message({
            type: 'error',
            message: err
          })
        })
    },

    /**
     * 更新
     */
    updateCo (form) {
      console.log(form)
      api.areaAdvt
        .updateArea(form)
        .then(r => {
          this.cancelDialog()
          this.$message({
            type: 'success',
            message: '操作成功'
          })
          this.getList()
        })
        .catch(err => {
          this.$message({
            type: 'error',
            message: err
          })
          console.error(err)
        })
    },

    openDialog () {
      this.dialog = {
        mode: 'add',
        visible: true
      }
    },
    cancelDialog () {
      this.dialog.visible = false
    },
    formatUnit (p) {
      switch (p) {
        case 0:
          return '小时'
        case 1:
          return '天'
        case 2:
          return '周'
        case 3:
          return '月'
        case 4:
          return '年'
      }
    },
    stopREnt (item) {
      api.areaAdvt
        .stopRent(item.id)
        .then(r => {
          this.$message({
            type: 'success',
            message: '已停止出租'
          })
          this.getList()
        })
        .catch(err => {
          console.error(err)
          this.$message({
            type: 'error',
            message: err
          })
        })
    },
    ftoLocalDate (t) {
      return toLocalDate(t)
    },
    dofilter (i) {
      console.log(i)
      this.queryObj.isRented = [i.value]
      this.getList()
    },
    getAreaList (val) {
      let offset = val === undefined ? 0 : val
      api.rdtlarea
        .listL(offset)
        .then(r => {
          console.log('tag', r.data.data)
          let list = r.data.data
          let total = r.data.total

          this.areaList = [...this.areaList, ...list]
          let nextOffset = offset + 500
          if (nextOffset < total) {
            this.getAreaList(nextOffset)
          } else {
            this.areaNameList = this.areaList.map(o => {
              return o.name
            })
            console.log(this.areaNameList)
          }
        })
        .catch(err => {
          this.$message({
            type: 'error',
            message: err
          })
          console.error('areaList >>()', err)
        })
    },

    /**
     * 去租赁
     */
    toRentPage () {
      if (this.selectedSpace.length === 0) {
        this.$message({
          type: 'warning',
          message: '未选中一项'
        })
      } else {
        // this.$router.push({ path: `/areaAdvtMng/Lease` })
        this.toLease()
      }
    },
    sendToPlan () {
      if (this.selectedSpace.length === 0) {
        this.$message({
          type: 'warning',
          message: '未选中一项'
        })
      } else {
        // this.$router.push({ path: `/areaAdvtMng/Lease` })
        let advtSpaceList = this.$store.getters.selectedSpace
        console.log(advtSpaceList)
        this.$emit('doAddSpace', advtSpaceList)
      }
    },
    clearSelected () {
      console.log(this.toggleAllCkBox)
      this.toggleAllCkBox = false
      this.selected = []
      this.$store.dispatch('passClearSelected')
    },
    checkSelectedSp (item, args) {
      let checked = args[0]
      console.log(item, checked)
      if (checked) {
        this.$store.dispatch('passOneSpace', item)
      } else {
        this.$store.dispatch('passRmSpace', item)
      }
    },
    toggleAll (args) {
      console.log(args)
      if (args) {
        this.selected = this.tableData
        for (let i of this.tableData) {
          if (i.isrented === 0) {
            this.$store.dispatch('passOneSpace', i)
          }
        }
      } else {
        this.selected = []
        for (let i of this.tableData) {
          this.$store.dispatch('passRmSpace', i)
        }
      }
    },

    /**
     * 生成暂时方案
     * ->添加方案
     */
    toLease () {
      // console.log(this.$refs.table.filteredItems)
      // let advtSpaceList = this.$refs.table.filteredItems
      let advtSpaceList = this.$store.getters.selectedSpace
      console.log()
      console.log(this.selectedCO)
      this.$router.push({ path: `/areaAdvtMng/coplan/new/${this.selectedCO.id}` })

      for (let item of advtSpaceList) {
        item.co_id = this.selectedCO.id
        // item.expire_time = this.form.expireDate + ' ' + this.form.expireHour
        console.log(item)

        // api.areaAdvt
        //   .updateArea(item)
        //   .then(r => {
        //     this.$message({
        //       type: 'success',
        //       message: 'Next ????'
        //     })
        //     this.$router.push({ path: `/areaAdvtMng/coplan/${item.co_id}` })
        //   })
        //   .catch(err => {
        //     this.$message({
        //       type: 'error',
        //       message: err
        //     })
        //     console.error('tag', err)
        //   })
      }
    }
    // methods
  },
  watch: {
    // watch
  }
}
</script>

<style scoped>
.page {
  width: 100%;
}
.a_table {
  border: 1px solid;
}
.a_table tr {
  border-bottom: 1px solid;
}

.query_tool {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 7px;
}
.query_tool .box {
  width: 33%;
  margin-right: 20px;
}
</style>
