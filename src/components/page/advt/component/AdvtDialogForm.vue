<template>
  <v-dialog v-model="_visible" persistent max-width="800px">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" dark @click="openDialog">新增广告</v-btn>
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
            <!-- name, co_id, location, lease_time, lease_time_unit, size-->
            <div class="flex_space_around">
              <div style="width: 80%;">
                  <v-text-field
                  v-model="form.name"
                  :counter="20"
                  :rules="[requireRules, nameRules]"
                  label="名称"
                  required
                ></v-text-field>
                  <v-select
                  v-model="form.co_id"
                  :items="coList"
                  item-text="name"
                  item-value="id"
                  :rules="[requireRules]"
                  label="公司"
                ></v-select>
                <v-text-field
                  v-model="form.location"
                  :counter="20"
                  label="地址"
                  required
                ></v-text-field>
                <v-text-field
                    v-model="form.width"
                    label="宽"
                  ></v-text-field>
                  <v-text-field
                    v-model="form.height"
                    label="高"
                  ></v-text-field>
                <div class="flex_space_around">

                <v-text-field
                  v-model="form.lease_time"
                  :counter="20"
                  label="过期时间"
                  required
                ></v-text-field>
                   <v-select
                     v-model="form.lease_time_unit"
                    :items="leaseTimeUnitList"
                    item-text="name"
                    item-value="value"
                    label="时间单位"
                    style="margin-left:20px;"
                  ></v-select>

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
import { RULES } from '@/conf/rules.js'
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
    },
    coList () {
      return this.$store.getters.coList
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
      ]
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
        this.snackbar = true
        this.coList.map(item => {
          if (item.id === this.form.co_id) {
            this.form.co_name = item.name
          }
        })
        console.log(this.form)
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
          this.form.width = this.dialog.info.size[0]
          this.form.height = this.dialog.info.size[1]
          console.log(this.dialog.info)
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
