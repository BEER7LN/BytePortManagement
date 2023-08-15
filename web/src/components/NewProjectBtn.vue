<template>
  <a-button style="color: #fff; background: #3e8bf7; margin-left: 8px;" @click="newProject">
    <template #icon>
      <svg-icon iconClass="add" className="new-icon" style="margin-right: 5px;"></svg-icon>
    </template>
    新建项目
  </a-button>
  <a-modal :open="isNewProject" @ok="confirmNewProject(team_id, formData.project_type, formData.project_name, formData.project_desc)" @cancel="cancelNewProject" centered keyboard okText="新建" cancelText="取消">
    <template #title>
      <div class="modal-title">新建项目</div>
    </template>
    <div class="modal-content">      
      <a-form ref="formRef" :model="formData">
        <a-form-item
          label="项目名称"
          name="project_name"
          :rules="[{ required: true, message: '请输入项目名称', trigger: 'blur' }]"
        >
          <a-input v-model:value="formData.project_name" placeholder="项目名称" />
        </a-form-item>
        <a-form-item label="项目简介">
          <a-textarea v-model:value="formData.project_desc" placeholder="项目简介" />
        </a-form-item>
        <a-form-item label="项目类型">
          <a-radio-group v-model:value="formData.project_type">
            <a-radio value="HTTP">HTTP</a-radio>
            <a-radio value="gRPC">gRPC</a-radio>
            <a-radio value="Dubbo">Dubbo</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </div>
  </a-modal>
</template>

<script setup>
import { ref } from 'vue';
import svgIcon from '@/components/SvgIcon.vue'
import { CreateProject } from '@/api/project';

const props = defineProps({
  team_id: {
    type: Number,
    required: true
  }
})

const formRef = ref()
const isNewProject = ref(false)
const formData = ref({
  project_name: '',
  project_desc: '',
  project_type: 'HTTP',
})


const newProject = () => {
  isNewProject.value = true
}
const confirmNewProject = async(team_id, project_type, project_name, project_description) => {
  await formRef.value.validate()
  // 表单校验通过后进行项目创建，项目创建完成后关闭模态框
  await CreateProject(team_id, project_type, project_name, project_description)
  isNewProject.value = false
}
const cancelNewProject = () => {
  isNewProject.value = false
}
</script>

<style lang="less" scoped>
.modal-title {  // 模态框标题样式
  color: #101828cc;
  font-size: 16px;
  font-weight: normal;
}
.modal-content {
  padding-top: 24px;
}
</style>