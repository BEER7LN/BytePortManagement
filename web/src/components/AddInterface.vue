<template>
  <div style="width: 90%; margin-left: 5%">
    <div style="display: inline">
      <a-input
        v-model:value="interfacename"
        placeholder="接口名称"
        bordered="false"
        style="width: 85%"
        id="inputname"
      />
      <a-button
        type="primary"
        @click="OnSave"
        style="margin-left: 2%; margin-right: 2%"
      >
        添加接口
      </a-button>
    </div>
    <div style="margin-top: 20px; width: 98%">
      <a-input-group compact>
        <a-select
          v-model:value="selectmethod"
          style="width: 10%; text-align: center"
        >
          <a-select-option
            v-for="method of httpmethods"
            :value="method"
            :key="method"
          >
            {{ method }}
          </a-select-option>
        </a-select>
        <a-input v-model:value="httplink" style="width: 90%" />
      </a-input-group>
    </div>
    <div style="margin-top: 20px">
      <a-tag color="blue" style="font-size: larger">请求参数</a-tag>
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="Params">
          <AddParams />
        </a-tab-pane>
        <a-tab-pane key="2" tab="Body">
          <a-radio-group v-model:value="bodyvalue">
            <a-radio :value="1" selected>none</a-radio>
            <a-radio :value="2">form-data</a-radio>
            <a-radio :value="3">x-www-form-urlencoded</a-radio>
          </a-radio-group>
          <a-tabs v-model:activeKey="bodyvalue">
            <a-tab-pane :key="1" style="margin-bottom: 20px"></a-tab-pane>
            <a-tab-pane :key="2"><AddParams /></a-tab-pane>
            <a-tab-pane :key="3"><AddParams /></a-tab-pane>
          </a-tabs>
        </a-tab-pane>
        <a-tab-pane key="3" tab="Cookie">
          <AddParams />
        </a-tab-pane>
      </a-tabs>
    </div>
    <div>
      <a-tag color="blue" style="font-size: larger">返回响应</a-tag>
      <AddResponse style="margin-top: 20px" />
    </div>
  </div>
</template>
<script>
import { UploadOutlined } from "@ant-design/icons-vue";
import { defineComponent, ref } from "vue";
import AddParams from "./AddParams.vue";
import AddResponse from "./AddResponse.vue";
export default defineComponent({
  name: "AddInterface",
  components: {
    UploadOutlined,
    AddParams,
    AddResponse,
  },
  setup() {
    const fileList = ref([]);
    const interfacename = ref("");
    const selectmethod = ref("GET");
    const httpmethods = [
      "GET",
      "POST",
      "PUT",
      "DELETE",
      "PATCH",
      "HEAD",
      "OPTIONS",
      "TRACE",
      "CONNECT",
      "COPY",
      "LINK",
      "UNLINK",
      "PURGE",
      "LOCK",
      "UNLOCK",
      "PROPFIND",
      "VIEW",
      "SEARCH",
    ];
    const activeKey = ref("1");
    const bodyvalue = ref(1);
    const httplink = ref("");
    function OnSave() {
      alert("保存成功");
    }
    return {
      fileList,
      interfacename,
      selectmethod,
      httpmethods,
      activeKey,
      httplink,
      bodyvalue,
      OnSave,
    };
  },
});
</script>
<style lang="less" scoped>
#inputname {
  border: none;
  border-bottom: 1px solid #d9d9d9;
  border-radius: 0;
  box-shadow: none;
}
#inputname:hover,
#inputname:focus {
  border-color: #409cff;
}
.editable-cell {
  position: relative;
  .editable-cell-input-wrapper,
  .editable-cell-text-wrapper {
    padding-right: 24px;
  }

  .editable-cell-text-wrapper {
    padding: 5px 24px 5px 5px;
  }

  .editable-cell-icon,
  .editable-cell-icon-check {
    position: absolute;
    right: 0;
    width: 20px;
    cursor: pointer;
  }

  .editable-cell-icon {
    margin-top: 4px;
    display: none;
  }

  .editable-cell-icon-check {
    line-height: 28px;
  }

  .editable-cell-icon:hover,
  .editable-cell-icon-check:hover {
    color: #108ee9;
  }

  .editable-add-btn {
    margin-bottom: 8px;
  }
}
.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}
</style>
