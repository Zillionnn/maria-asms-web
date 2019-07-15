<template>
  <v-dialog v-model="_visible" persistent max-width="800px">
    <template v-slot:activator="{ on }">
      <!-- <v-btn color="primary" dark @click="openDialog">新增广告</v-btn> -->
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">{{this.dialog.mode === 'add'? '新增' : '修改'}}</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-form ref="form" v-model="valid" lazy-validation>
            <!-- name, co_id, location, lease_time, lease_time_unit, size-->
            <div class="flex_space_around">
              <div style="width: 80%;">
                <v-select
                  v-model="form.area_id"
                  :items="areaList"
                  item-text="name"
                  item-value="id"
                  label="小区"
                  disabled
                ></v-select>
                <!-- <v-select
                  v-model="form.co_id"
                  :items="coList"
                  item-text="name"
                  item-value="id"
                  :rules="[requireRules]"
                  label="公司"
                ></v-select> -->
                <!-- <v-select
                  v-model="form.advt_id"
                  :items="advtList"
                  item-text="name"
                  item-value="id"
                  label="广告"
                ></v-select> -->
                <!-- TODO  默认时间 -->
                <!-- <div style="display:flex;justify-content:space-between;">
                  <v-text-field v-model="form.expireDate" label="过期日期" required @click="datepicker=true"></v-text-field>
                <v-text-field v-model="form.expireHour" label="过期时间" required @click="timepicker=true"></v-text-field>
                </div> -->

                <!-- TODO? -->
                <!-- <v-dialog v-model="datepicker" max-width="290px">
                  <v-date-picker
                    v-model="form.expireDate"
                    @change="datepicker = false"
                    locale="zh"
                  ></v-date-picker>
                </v-dialog>
                 <v-dialog v-model="timepicker" max-width="290px">
                     <v-time-picker v-model="form.expireHour" @change="datepicker = false"  format="24hr"></v-time-picker>
                </v-dialog> -->

              <v-text-field v-model="form.advt_space_position" :counter="20" label="编号" required></v-text-field>
                <v-text-field
                  v-model="form.advt_space_position_des"
                  :counter="20"
                  label="位置描述"
                  required
                ></v-text-field>
                 <div class="flex_row_space_between">
                  <v-text-field v-model="form.width" :counter="20" label="长(m)" required></v-text-field>
                  <v-text-field v-model="form.height" :counter="20" label="高/宽(m)" required></v-text-field>
                </div>

                <div class="img">
                  <el-upload
                    class="avatar-uploader"
                    action="http://106.12.40.54:2999/api/v1/uploadImg"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                  >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </div>
              </div>
            </div>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="cancelDialog">取消</v-btn>
        <v-btn color="blue darken-1" :disabled="!valid" flat @click="validateBeforeSUB">提交</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import * as api from '@/api/index'
import { RULES } from '@/conf/rules.js'
import { toLocalDate, toLocalTime } from '@/utils/tool'
export default {
  name: 'DialogForm',
  components: {},
  props: {
    dialog: {
      type: Object,
      required: true
    }
  },
  computed: {
    _visible () {
      return this.dialog.visible
    }
  },
  data () {
    return {
      imageUrl: '',

      imgSrc: '',
      valid: true,
      requireRules: RULES.requireRule,
      nameRules: v => (v && v.length <= 20) || '长度过长',
      form: {
        area_name: null,
        area_location: null,
        light_size: null,
        co_name: null,
        isRented: null,
        area_id: null,
        co_id: null,
        advt_id: null,
        advt_space_position: null,
        advt_space_position_des: null,
        expire_time: null
      },
      leaseTimeUnitList: [
        {
          value: 0,
          name: '小时'
        },
        {
          value: 1,
          name: '天'
        },
        {
          value: 2,
          name: '周'
        },
        {
          value: 3,
          name: '月'
        },
        {
          value: 4,
          name: '年'
        }
      ],
      areaList: [],
      coList: [],
      advtList: [],
      datepicker: false,
      timepicker: false
    }
  },
  methods: {
    resetForm () {
      this.form = {
        area_name: null,
        area_location: null,
        light_size: null,
        co_name: null,
        isRented: null,
        area_id: null,
        co_id: null,
        advt_id: null,
        advt_space_position: null,
        advt_space_position_des: null,
        expire_time: null
      }
    },
    cancelDialog () {
      this.resetForm()
      this.$emit('cancel')
    },
    openDialog () {
      this.$emit('open')
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
          }
        })
        .catch(err => {
          this.$message({
            type: 'error',
            message: err
          })
          console.error('()', err)
        })
    },
    getCoList (val) {
      let offset = val === undefined ? 0 : val
      api.co
        .listL(offset)
        .then(r => {
          let list = r.data.data
          let total = r.data.total

          this.coList = [...this.coList, ...list]
          let nextOffset = offset + 500

          if (nextOffset < total) {
            this.getCoList(nextOffset)
          }
        })
        .catch(err => {
          this.$message({
            type: 'error',
            message: err
          })
          console.error('()', err)
        })
    },
    getAdvtList (val) {
      let offset = val === undefined ? 0 : val
      api.advt
        .listL(offset)
        .then(r => {
          let list = r.data.data
          let total = r.data.total

          this.advtList = [...this.advtList, ...list]
          let nextOffset = offset + 500
          if (nextOffset < total) {
            this.getAdvtList(nextOffset)
          }
        })
        .catch(err => {
          this.$message({
            type: 'error',
            message: err
          })
          console.error('()', err)
        })
    },
    validateBeforeSUB () {
      if (this.$refs.form.validate()) {
        this.snackbar = true
        this.form.light_size = [this.form.width, this.form.height]
        if (this.dialog.mode === 'add') {
          this.$emit('submit', this.form)
        } else {
          console.log(this.form)
          this.$emit('update', this.form)
        }
      }
    },

    handleAvatarSuccess (res, file) {
      console.log(res)
      this.imageUrl = URL.createObjectURL(file.raw)
      this.form.advt_position_image = res.data.path

      console.log(this.form)
    },
    beforeAvatarUpload (file) {
      // const isLt2M = file.size / 1024 / 1024 < 2
      // if (!isLt2M) {
      //   this.$message.error('上传头像图片大小不能超过 2MB!')
      // }
      // return isLt2M
    }
    // methods
  },
  watch: {
    _visible (val, oldVal) {
      if (val) {
        this.getAreaList()
        this.getCoList()
        this.getAdvtList()
        if (this.dialog.mode === 'edit') {
          this.form = { ...this.dialog.info }
          console.log(this.dialog.info)
          this.imageUrl = this.dialog.info.advt_position_image
          this.form.advt_position_image = this.dialog.info.advt_position_image
          if (this.form.light_size.length > 0) {
            this.form.width = this.form.light_size[0]
            this.form.height = this.form.light_size[1]
          }

          if (this.form.expire_time) {
            let time = this.form.expire_time
            this.form.expireDate = toLocalDate(time)
            this.form.expireHour = toLocalTime(time)
          }
        }
      } else {
        this.resetForm()
      }
    }
  }
}
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px #68ade6;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8a9099;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
