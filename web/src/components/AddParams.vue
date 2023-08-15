<template>
  <a-form
    ref="formRef"
    name="dynamic_form_nest_item"
    :model="dynamicValidateForm"
    @finish="onFinish"
  >
    <a-space
      v-for="(param, index) in dynamicValidateForm.newparams"
      :key="param.id"
      style="display: flex; margin-bottom: 8px; width: 100%"
      align="baseline"
    >
      <a-form-item
        :name="['newparams', index, 'paramname']"
        :rules="{
          required: true,
          message: '参数名缺失',
        }"
      >
        <a-input v-model:value="param.paramname" placeholder="参数名" />
      </a-form-item>
      <a-form-item
        :name="['newparams', index, 'paramtype']"
        :rules="{
          required: true,
          message: '参数类型缺失',
        }"
      >
        <a-select
          ref="select"
          v-model:value="param.paramtype"
          style="width: 120px"
          :options="typeOptions"
          @focus="focus"
          @change="handleChange"
        ></a-select>
      </a-form-item>
      <a-form-item
        :name="['newparams', index, 'paramdesc']"
        :rules="{
          required: false,
        }"
      >
        <a-input
          v-model:value="param.paramdesc"
          placeholder="说明"
          style="width: 500px"
        />
      </a-form-item>
      <MinusCircleOutlined @click="removeParam(param)" />
    </a-space>
    <a-form-item>
      <a-button type="dashed" block @click="addParam">
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
  name: "AddParams",
  components: {
    MinusCircleOutlined,
    PlusOutlined,
  },
  setup() {
    const typeOptions = [
      { value: "string", label: "string" },
      { value: "number", label: "number" },
      { value: "integer", label: "integer" },
      { value: "array", label: "array" },
    ];
    const dynamicValidateForm = reactive({
      newparams: [
        {
          paramname: "",
          paramtype: "string",
          paramdesc: "",
          id: Date.now(),
        },
      ],
    });
    const removeParam = (item) => {
      let index = dynamicValidateForm.newparams.indexOf(item);
      if (index !== -1) {
        dynamicValidateForm.newparams.splice(index, 1);
      }
    };
    const addParam = () => {
      dynamicValidateForm.newparams.push({
        paramname: "",
        paramtype: "string",
        paramdesc: "",
        id: Date.now(),
      });
    };
    const onFinish = () => {
      console.log("dynamicValidateForm.users:", dynamicValidateForm.newparams);
    };
    return {
      typeOptions,
      dynamicValidateForm,
      onFinish,
      removeParam,
      addParam,
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
