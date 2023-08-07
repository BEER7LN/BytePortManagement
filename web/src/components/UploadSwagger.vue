<template>
  <div style="width: 80%; height: 40%; margin-left: 10%; margin-top: 5%">
    <a-upload-dragger
      v-model:fileList="fileList"
      name="file"
      :multiple="false"
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      @change="handleChange"
      @drop="handleDrop"
    >
      <p class="ant-upload-drag-icon">
        <inbox-outlined></inbox-outlined>
      </p>
      <p class="ant-upload-text">单击或拖动文件到此区域进行上传</p>
      <p class="ant-upload-hint">仅支持上传单个swagger文档</p>
    </a-upload-dragger>
  </div>
</template>
<script>
export default {
  name: "UploadSwagger",
  data() {
    return {
      fileList: [],
    };
  },
};
</script>
