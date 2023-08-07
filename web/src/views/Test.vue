<template>
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
    <p class="ant-upload-text">Click or drag file to this area to upload</p>
    <p class="ant-upload-hint">
      Support for a single or bulk upload. Strictly prohibit from uploading
      company data or other band files
    </p>
  </a-upload-dragger>
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
