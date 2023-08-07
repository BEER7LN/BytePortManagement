<template>
  <a-form
    ref="formRef"
    name="dynamic_form_nest_item"
    :model="dynamicValidateForm"
    @finish="onFinish"
  >
    <a-space
      v-for="(response, index) in dynamicValidateForm.newResponse"
      :key="response.id"
      style="display: flex; margin-bottom: 8px; width: 100%"
      align="baseline"
    >
      <a-form-item
        :name="['newResponse', index, 'reponsecode']"
        :rules="{
          required: true,
          message: '响应码缺失',
        }"
      >
        <a-input
          v-model:value="response.reponsecode"
          placeholder="HTTP状态码"
        />
      </a-form-item>
      <a-form-item
        :name="['newResponse', index, 'reponsename']"
        :rules="{
          required: true,
          message: '响应名称缺失',
        }"
      >
        <a-input v-model:value="response.reponsename" placeholder="响应名称" />
      </a-form-item>
      <a-form-item
        :name="['newResponse', index, 'responsetype']"
        :rules="{
          required: true,
          message: '响应格式缺失',
        }"
      >
        内容格式:
        <a-select
          ref="select"
          v-model:value="response.responsetype"
          style="width: 120px"
          :options="typeOptions"
          @focus="focus"
          @change="handleChange"
        ></a-select>
      </a-form-item>
      <MinusCircleOutlined @click="removeResponse(response)" />
    </a-space>
    <a-form-item>
      <a-button type="dashed" block @click="addResponse">
        <PlusOutlined />
        添加参数
      </a-button>
    </a-form-item>
    <!-- <a-form-item>
            <a-button type="primary" html-type="submit">Submit</a-button>
          </a-form-item> -->
  </a-form>
</template>
<script>
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons-vue";
import { defineComponent, reactive } from "vue";
export default defineComponent({
  name: "AddResponse",
  components: {
    MinusCircleOutlined,
    PlusOutlined,
  },
  setup() {
    const typeOptions = [
      { value: "JSON", label: "JSON" },
      { value: "XML", label: "XML" },
      { value: "HTML", label: "HTML" },
      { value: "Raw", label: "Raw" },
      { value: "Binary", label: "Binary" },
      { value: "MsgPack", label: "MsgPack" },
      { value: "EvenStream", label: "EvenStream" },
    ];
    const dynamicValidateForm = reactive({
      newResponse: [
        {
          responsecode: "",
          reponsename: "",
          responsetype: "JSON",
          id: Date.now(),
        },
      ],
    });
    const removeResponse = (item) => {
      let index = dynamicValidateForm.newResponse.indexOf(item);
      if (index !== -1) {
        dynamicValidateForm.newResponse.splice(index, 1);
      }
    };
    const addResponse = () => {
      dynamicValidateForm.newResponse.push({
        responsecode: "",
        reponsename: "",
        responsetype: "JSON",
        id: Date.now(),
      });
    };
    const onFinish = () => {
      console.log("Response:", dynamicValidateForm.newResponse);
    };
    return {
      typeOptions,
      dynamicValidateForm,
      onFinish,
      removeResponse,
      addResponse,
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
