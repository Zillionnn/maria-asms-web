<template>
  <v-dialog v-model="_visible" persistent max-width="800px">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" dark @click="openDialog">新增小区</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">
           {{this.dialog.mode === 'add'? '新增' : '修改'}}
        </span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-form ref="form" v-model="valid" lazy-validation>
            <!-- section, serial, name, "position", lnglat, category, live_size, parking_num, location, avg_daily_traffic, advertise_id, image -->
            <div class="flex_space_around">
              <div style="width:46%;">
                  <v-text-field
                  v-model="form.name"
                  :counter="20"
                  :rules="[requireRules, nameRules]"
                  label="名称"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="form.section"
                  label="区域"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="form.serial"
                  :counter="20"
                  label="编号"
                  required
                ></v-text-field>

                <!-- <v-text-field
                  v-model="form.position"
                  :counter="20"
                  label="位置"
                  required
                ></v-text-field> -->
                 <v-text-field
                  v-model="form.location"
                  label="地址"
                  required
                ></v-text-field>

                <div class="flex_space_around">
                  <v-text-field
                    v-model="form.lng"
                    label="经度"
                    style="margin:0 10px;"
                  ></v-text-field>
                  <v-text-field
                    v-model="form.lat"
                    label="纬度"
                    style="margin:0 10px;"
                  ></v-text-field>
                </div>

              </div>
              <div style="width:46%;">
                <v-select
                  v-model="form.category"
                  :items="categoryList"
                  item-text="name"
                  item-value="value"
                  label="类别"
                ></v-select>
                 <v-select
                  v-model="form.is_exclusive"
                  :items="realestateList"
                  item-text="name"
                  item-value="value"
                  label="是否排他"
                ></v-select>
                <v-text-field
                  v-model="form.live_size"
                  label="规模"
                ></v-text-field>
                <v-text-field
                  v-model="form.parking_num"
                  label="停车位"
                ></v-text-field>

                <v-text-field
                  v-model="form.avg_daily_traffic"

                  label="日活动"
                  required
                ></v-text-field>
                <!-- <div class="img">
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

               </div> -->
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
import {RULES} from '@/conf/rules.js'
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
      categoryList: [
        {
          name: '住宅',
          value: 0
        },
        {
          name: '商业中心',
          value: 1
        },
        {
          name: '写字楼',
          value: 2
        },
        {
          name: '商务中心',
          value: 3
        },
        {
          name: '酒店',
          value: 4
        }
      ],
      realestateList: [
        {
          name: '是',
          value: true
        },
        {
          name: '否',
          value: false
        }
      ],
      form: {
        name: null,
        section: null,
        serial: null,
        position: null,
        lng: null,
        lat: null,
        category: null,
        live_size: null,
        parking_num: null,
        location: null,
        avg_daily_traffic: null
      }
    }
  },
  methods: {
    resetForm () {
      this.form = {
        name: null,
        section: null,
        serial: null,
        position: null,
        lng: null,
        lat: null,
        category: null,
        live_size: null,
        parking_num: null,
        location: null,
        avg_daily_traffic: null
      }
    },
    cancelDialog () {
      this.resetForm()
      this.$emit('cancel')
    },
    openDialog () {
      this.$emit('open')
    },
    validateBeforeSUB () {
      if (this.$refs.form.validate()) {
        console.log(this.form)
        this.snackbar = true
        if (this.dialog.mode === 'add') {
          this.$emit('submit', this.form)
        } else {
          this.$emit('update', this.form)
        }
      }
    }

    // handleAvatarSuccess (res, file) {
    //   console.log(res)
    //   this.imageUrl = URL.createObjectURL(file.raw)
    //   this.form.image = res.data.path

    //   console.log(this.form.image)
    // },
    // beforeAvatarUpload (file) {
    //   const isLt2M = file.size / 1024 / 1024 < 2
    //   if (!isLt2M) {
    //     this.$message.error('上传头像图片大小不能超过 2MB!')
    //   }
    //   return isLt2M
    // }
    // methods
  },
  watch: {
    _visible (val, oldVal) {
      if (val) {
        if (this.dialog.mode === 'edit') {
          this.form = { ...this.dialog.info }
          console.log(this.dialog.info)
          if (this.dialog.info.lnglat) {
            this.form.lng = this.dialog.info.lnglat.y
            this.form.lat = this.dialog.info.lnglat.x
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
  border: 1px #ffffff;
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
