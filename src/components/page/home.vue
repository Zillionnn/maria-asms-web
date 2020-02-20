<template>
  <div class="page">
    <div style="width: 100%;height:auto;">
      <!-- <v-btn @click="exportAll()">导出所有</v-btn>
        <span class="head_text">未租用的广告位：{{norent}}</span><v-btn @click="exportNoRented()">导出</v-btn>
        <span class="head_text">已租广告位：{{isRentedNum}}</span><v-btn @click="exportIsRented()">导出</v-btn> -->
      <!-- <div style="width: 100%; height:800px;">
          <baidu-map/>
        </div> -->
      <!-- <el-upload class="avatar-uploader" multiple ref="upload" action="http://106.12.40.54:2999/api/v1/uploadImg"
        :show-file-list="true" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload"
        :on-preview="handlePreview" :file-list="fileList" :auto-upload="false">
        <v-btn size="small"  slot="trigger" color="primary">选择图片</v-btn>
        <button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传</button>

        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
      </el-upload>

      {{fileList}} -->
      选择图片：<input type="file" id="fileInput" name="input" multiple="multiple" @change="loadFile()" />
      <button  @click="submitUpload" >upload</button>
<br/>
<button @click="download">下载</button>
    </div>
  </div>
</template>

<script>
import { http } from '@/api/index'
import BaiduMap from '@/components/common/Map/BaiduMap/BaiduMap.vue'

export default {
  name: 'home',
  components: {
    BaiduMap
  },

  data () {
    return {
      norent: 0,
      isRentedNum: 0,
      fileList: [],
      form: null
    }
  },
  created () {},
  mounted () {},
  methods: {
    loadFile (e) {
      let files = document.getElementById('fileInput').files
      console.log(files)
      this.form = new FormData() // 创建form对象
      for (let f of files) {
        this.form.append('file', f) // 通过append向form对象添加数据
      }
      console.log('th isf.rom', this.form)
      // let f = new FileReader()
      // f.onprogress = e => {
      //   console.log(e)
      // }
      // f.readAsDataURL(file)

      // console.log(f)
    },
    submitUpload () {
      let config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
      http
        .post('http://106.12.40.54:2999/api/v1/uploadImages', this.form, config)
        .then(response => {
          console.log(response.data)
        })
    },

    download () {
      http.get(`http://106.12.40.54:2999/api/v1/download-compress-image`)
        .then((res) => {
          window.open('http://106.12.40.54:2999/api/v1/download-compress-image')
        })
    },
    handlePreview (file) {
      console.log(file)
    },
    handleAvatarSuccess (res, file) {
      console.log(res)
      // this.imageUrl = URL.createObjectURL(file.raw)
      // this.form.advt_position_image = res.data.path

      // console.log(this.form)
    },
    beforeAvatarUpload (file) {
      // const isLt2M = file.size / 1024 / 1024 < 2
      // if (!isLt2M) {
      //   this.$message.error('上传头像图片大小不能超过 2MB!')
      // }
      // return isLt2M
    }
    // ////////////////////methods
  }
}
</script>

<style scoped>
.page {
  width: 100%;
  height: 100%;
}
.a_table {
  border: 1px solid;
}
.a_table tr {
  border-bottom: 1px solid;
}

.head_text {
  font-size: 18px;
}
</style>
