<template>
  <div class="page">
    <h2>居民区</h2>
    <div style="width: 100%;height:900px;margin-top: 23px;">
      <!-- 添加的form -->
      <dialog-form
        :dialog="dialog"
        @open="openDialog()"
        @cancel="cancelDialog()"
        @submit="addCo"
        @update="updateCo"
      ></dialog-form>
      <v-data-table :headers="headers" :items="tableData" hide-actions>
        <template slot="headerCell" slot-scope="{ header }">
          <span class="subheading font-weight-light text--darken-3" v-text="header.text"/>
        </template>
        <template slot="items" slot-scope="{ item }">
          <!-- <td>{{ item.id }}</td> -->
          <td>{{ item.name }}</td>
          <td>{{item.section}}</td>
          <!-- <td>{{item.position}}</td> -->
          <td>
            <span v-if="item.category===0">住宅</span>
            <span v-if="item.category===1">商业中心</span>
          </td>
          <td>
            <span v-if="item.is_realestate">是</span>
            <span v-else>否</span>
          </td>
          <td>{{item.live_size}}</td>
          <td>{{item.parking_num}}</td>
          <td>{{item.location}}</td>
          <td>{{item.avg_daily_traffic}}</td>

          <td v-formatTs="item.update_time"></td>
          <td class="justify-center layout px-0">
            <v-icon small class="mr-2" @click="editItem(item)" title="修改">edit</v-icon>
            <v-icon small class="mr-2" @click="deleteItem(item)" title="删除">delete</v-icon>
            <v-icon small @click="toAdvtSpace(item.id)" title="查看广告位" color="#03a9f4">查看广告位</v-icon>
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
export default {
  name: 'resarea',
  components: {
    DialogForm
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
    }
  },
  data () {
    return {
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
        // { text: 'Id', value: 'id', sortable: false, width: '300px' },
        { text: '名称', value: 'name', sortable: false },
        { text: '区域', value: 'section', sortable: false },
        // { text: '位置', value: 'position', sortable: false },
        { text: '类型', value: 'category', sortable: false },
        { text: '楼盘', value: 'isRealestate', sortable: false },
        { text: '规模', value: 'live_size', sortable: false },
        { text: '停车位', value: 'parking_num', sortable: false },
        { text: '地址', value: 'location', sortable: false },
        { text: '日流量', value: 'avg_daily_traffic', sortable: false },
        { text: '更新时间', value: 'updatetime', sortable: false },
        { text: ' ', value: 'DO', sortable: false }
      ],
      tableData: []
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList (val) {
      this.pagination.page = val === undefined ? 1 : val
      let offset =
        val === undefined ? 0 : this.pagination.rowsPerPage * (val - 1)
      api.rdtlarea
        .list(offset)
        .then(r => {
          console.log('tag', r.data.data)
          this.tableData = r.data.data
          this.pagination.totalItems = r.data.total
        })
        .catch(err => {
          this.$message({
            type: 'error',
            message: err
          })
          console.error('()', err)
        })
    },
    doInput (a, b, c) {
      // console.log('do input', this.pagination.page)
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
        api.rdtlarea.deleteArea(item.id).then(r => {
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
      api.rdtlarea
        .addArea(form)
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
     * 更新co
     */
    updateCo (form) {
      console.log(form)
      //  更新按area id    area advt space列表也要修改
      //   删除同理
      api.rdtlarea
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
    // 查看广告位
    toAdvtSpace (id) {
      this.$router.push({ path: `/resdentialArea/${id}` })
    }
    // methods
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
</style>
