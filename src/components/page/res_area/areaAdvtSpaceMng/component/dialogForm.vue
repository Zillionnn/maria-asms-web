<template>
  <v-dialog v-model="_visible" persistent max-width="800px">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" dark @click="openDialog">新增广告位</v-btn>
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
    }
  },
  data () {
    return {
      imageUrl: '',

      imgSrc: '',
      valid: true,
      requireRules: RULES.requireRule,
      numRule: v => (v && typeof v === 'number') || '必须是数字',

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
      }
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
    validateBeforeSUB () {
      if (this.$refs.form.validate()) {
        this.snackbar = true
        this.form.light_size = [this.form.width, this.form.height]
        if (this.dialog.mode === 'add') {
          this.form.area_id = this.$route.params.id
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
        if (this.dialog.mode === 'edit') {
          this.form = { ...this.dialog.info }
          console.log(this.dialog.info)
          this.imageUrl = this.dialog.info.advt_position_image
          this.form.advt_position_image = this.dialog.info.advt_position_image
          this.form.width = this.form.light_size[0]
          this.form.height = this.form.light_size[1]
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
.flex_row_space_between div{
  margin: 0 5px;
}
</style>
