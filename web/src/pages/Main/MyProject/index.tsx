import {
	Typography,
	Segmented,
	Button,
	Input,
	Space,
	Modal,
	Form,
	Upload
} from 'antd'
import { SegmentedValue } from 'antd/es/segmented'
import { useState, useEffect } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import AllProject from './AllProject'
import MemberPrivilege from './MemberPrivilege'
import styles from './index.module.scss'

import { LoadingOutlined } from '@ant-design/icons'
import { message, Select } from 'antd'
import type { UploadChangeParam } from 'antd/es/upload'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import api from '@/api/api'

const { Title } = Typography
const { Search } = Input
const { Option } = Select

type Project = {
  project_id: number;
  team_id: number;
  project_type: string;
  project_name: string;
  project_description: string;
};

type Member = {
  member_id: number;
  team_id: number;
  project_id: number | null;
  user_id: number;
  role: string;
};

type Team = {
  team_id: number;
  team_name: string;
  owner: number;
  projects: Project[];
  members: Member[];
};



const getBase64 = (img: RcFile, callback: (url: string) => void) => {
	const reader = new FileReader()
	reader.addEventListener('load', () => callback(reader.result as string))
	reader.readAsDataURL(img)
}

const beforeUpload = (file: RcFile) => {
	const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
	if (!isJpgOrPng) {
		message.error('You can only upload JPG/PNG file!')
	}
	const isLt2M = file.size / 1024 / 1024 < 2
	if (!isLt2M) {
		message.error('Image must smaller than 2MB!')
	}
	return isJpgOrPng && isLt2M
}

const MyProject: React.FC<{ selectedKey: string }> = ({ selectedKey }) => {
	useEffect(() => {
		loadTeam()
	}, [selectedKey])
	const [projectType, setProjectType] = useState('')
	const [option, setOption] = useState<SegmentedValue>('AllProject')
	const [team, setTeam] = useState<Team|null>(null)
	const options = [
		{
			label: '所有项目',
			value: 'AllProject'
		},
		{
			label: '成员/权限',
			value: 'MemberPrivilege'
		}
	]
	const [open, setOpen] = useState(false)

	const showModal = () => {
		setOpen(true)
	}

	const loadTeam = async () => {
		const {data} = await api.get(`/teams/${selectedKey}`)
		setTeam(data.data)
		console.log(team)
	}

	const [loading, setLoading] = useState(false)
	const [imageUrl, setImageUrl] = useState<string>()
	const [messageApi, contextHolder] = message.useMessage()

	const handleChange: UploadProps['onChange'] = (
		info: UploadChangeParam<UploadFile>
	) => {
		if (info.file.status === 'uploading') {
			setLoading(true)
			return
		}
		if (info.file.status === 'done') {
			// Get this url from response in real world.
			getBase64(info.file.originFileObj as RcFile, (url) => {
				setLoading(false)
				setImageUrl(url)
			})
		}
	}
	const uploadButton = (
		<div>
			{loading ? <LoadingOutlined /> : <PlusOutlined />}
			<div style={{ marginTop: 8 }}>Upload</div>
		</div>
	)
	const onCancel = () => {
		setOpen(false)
	}
	const onFinish = async (values: any) => {
		const {data} = await api.post('/project/create', {...values, team_id: selectedKey})
		console.log(data)
		if (data.code == 200)
			messageApi.open({ type: 'success', content: '创建成功' })
		else messageApi.open({ type: 'error', content: '创建失败, 缺少必要参数' })
		loadTeam()
		setOpen(false)
	}

	const onFinishFailed = (values: any) => {
		console.log('Received values of form: ', values)
	}
	const normFile = (e: any) => {
		console.log('Upload event:', e)
		if (Array.isArray(e)) {
			return e
		}
		return e?.fileList
	}
	return (
		<>
			{contextHolder}
			<Title level={4} style={{ marginBottom: '25px' }}>
				{team?.team_name}
			</Title>
			<Space direction="vertical" style={{ width: '100%' }}>
				<div className={styles.flex}>
					<Segmented options={options} value={option} onChange={setOption} />
					{option === 'AllProject' && (
						<Space>
							<Search placeholder="搜索" allowClear style={{ width: 200 }} />
							<Button
								type="primary"
								icon={<PlusOutlined />}
								onClick={showModal}
							>
								新建项目
							</Button>
						</Space>
					)}
				</div>
				{option === 'AllProject' && team?.projects != undefined && <AllProject loadTeam={loadTeam} projects={team?.projects}/>}
				{option === 'MemberPrivilege' && <MemberPrivilege />}
			</Space>
			<Modal open={open} onCancel={onCancel} footer={null}>
				<div className={styles.form}>
					<Title level={4}>新建项目</Title>
					<Form
						name="createProject"
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						autoComplete="off"
					>
						<Form.Item
							name="logo"
							valuePropName="fileList"
							getValueFromEvent={normFile}
						>
							<Upload
								name="logo"
								listType="picture-card"
								action=""
								showUploadList={false}
								beforeUpload={beforeUpload}
								onChange={handleChange}
							>
								{imageUrl ? (
									<img src={imageUrl} alt="logo" style={{ width: '100%' }} />
								) : (
									uploadButton
								)}
							</Upload>
						</Form.Item>
						<Form.Item
							name="project_name"
							rules={[{ required: true, message: '请输入项目标题' }]}
						>
							<Input placeholder="项目标题" style={{ width: '300px' }} />
						</Form.Item>
						<Form.Item
							name="project_type"
							rules={[{ required: true, message: '请选择项目类型' }]}
						>
							<Select
								placeholder="项目类型"
								style={{ width: '300px' }}
								value={projectType}
								onChange={(value) => setProjectType(value)}
							>
								<Option value="HTTP">HTTP</Option>
								<Option value="gRPC">gRPC</Option>
							</Select>
						</Form.Item>
						<Form.Item
							name="project_description"
							rules={[{ required: true, message: '请输入项目描述' }]}
						>
							<Input placeholder="项目描述" style={{ width: '300px' }} />
						</Form.Item>
						<Form.Item>
							<Button type="primary" htmlType="submit">
								新建
							</Button>
						</Form.Item>
					</Form>
				</div>
			</Modal>
		</>
	)
}

export default MyProject
