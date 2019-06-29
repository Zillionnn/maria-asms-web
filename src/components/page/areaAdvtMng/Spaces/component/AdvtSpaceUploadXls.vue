<template>
  <div class="page">
    <!-- TODO -->
    <el-upload
      class="upload-demo"
      action="http://106.12.40.54:2999/api/v1/uploadXls"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :limit="1"
      :on-exceed="handleExceed"
      :show-file-list="false"
      :on-success="handleSuccess"
      ref="uploadExcel"
    >
      <v-btn size="small" color="primary">导入广告位</v-btn>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: 'AdvtSpaceUploadXls',
  components: {},
  data () {
    return {}
  },
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleExceed (files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      )
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleSuccess (res, file) {
      console.log(res)
      this.$message({
        type: 'success',
        message: '上传成功'
      })
      this.imageUrl = URL.createObjectURL(file.raw)
      this.$refs.uploadExcel.clearFiles()
      console.log(this.form)
    }
  }
}
</script>

<style scoped>
</style>
