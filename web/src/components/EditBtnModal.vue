<template>
  <a-button @click="showModal">{{ btnText }}</a-button>
  <a-modal :open="visible" @ok="handleOk(okFunc)" @cancel="handleCancel" centered keyboard :okText="okText" cancelText="取消">
    <template #title>
      <slot name="title"></slot>
    </template>
    <div class="modal-content">
      <a-form ref="formRef" :model="formData">
        <slot></slot>
      </a-form>
    </div>
  </a-modal>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  btnText: {
    type: String,
    default: '编辑'
  },
  okText: {
    type: String,
    default: '保存',
  },
  okFunc: {
    type: Function,
  },
  formData: {
    type: Object
  }
})

const formRef = ref()
const visible = ref(false)

const showModal = () => {
  visible.value = true
}

const handleOk = async (okFunc) => {
  try {
    await formRef.value.validate()
    // 表单校验通过后执行okFunc函数，okFunc函数执行完成后再关闭模态框，刷新当前页面
    await okFunc()
    visible.value = false
    // location.reload()
  } catch (error) {
    // 表单校验失败后检验当前表单是否存在校验规则，将校验失败报的问题解构出来打印
    if (error.errorFields && error.errorFields.length > 0) {
      const [{ errors }] = error.errorFields;
      console.log(errors[0]);
    }
  }
}

const handleCancel = () => {
  visible.value = false
}
</script>

<style lang="less" scoped>
.modal-content {
  padding-top: 24px;
}
button {
  color: #101828cc;
  background: #1018280A;
  border: transparent;
  &:hover {
    background: #ecedee;
  }
}
</style>
