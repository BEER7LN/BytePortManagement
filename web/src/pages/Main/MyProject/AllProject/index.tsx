import { Dropdown, Avatar, Typography, Button, Modal, Input } from 'antd'
import {
	EllipsisOutlined,
	DeleteOutlined,
	EditOutlined,
	UserOutlined
} from '@ant-design/icons'
import styles from './index.module.scss'
import api from '@/api/api'
import { useState } from 'react'

const { Text } = Typography

type Project = {
	project_id: number
	team_id: number
	project_type: string
	project_name: string
	project_description: string
}

const AllProject: React.FC<{ projects: Project[]; loadTeam: () => void }> = ({
	projects,
	loadTeam
}) => {
	const handleDeleteProject = async (project_id: number) => {
		await api.delete(`/project/${project_id}`)
		loadTeam()
	}

	const [projectName, setProjectName] = useState('')

	const [isModalOpen, setIsModalOpen] = useState(false)
	const [projectId, setProjectId] = useState(-1)
	const handleOk = async () => {
		console.log(projectName)
		await api.put('/project/rename', { project_name: projectName, project_id: projectId})

		await loadTeam()
		setProjectName('')
		setIsModalOpen(false)
	}
	const handleEditProjectName = (project_id: number) => {
		setProjectId(project_id) // Save the projectId when editing is initiated
		setIsModalOpen(true) // Open the modal
	}
	const handleCancel = () => {
		setProjectName('')
		setIsModalOpen(false)
	}
	const getMenuItems = (projectId: number) => [
		{
			key: '1',
			label: (
				<a onClick={() => handleEditProjectName(projectId)}>
					<EditOutlined style={{ marginRight: '0.5em' }} />
					修改名称
				</a>
			)
		},
		{
			type: 'divider'
		},
		{
			key: '2',
			label: (
				<a onClick={() => handleDeleteProject(projectId)}>
					<DeleteOutlined style={{ marginRight: '0.5em' }} />
					删除项目
				</a>
			),
			danger: true
		}
	]

	return (
		<div className={styles.project}>
			{projects &&
				projects.map((project) => (
					<a key={project.project_id} className={styles.card} href={`/home/${project.project_id}`}>
						<div className={styles.avatar}>
							<Avatar shape="square" size="large" icon={<UserOutlined />} />
							<Dropdown
								menu={{ items: getMenuItems(project.project_id) }}
								placement="bottomRight"
								arrow={{ pointAtCenter: true }}
							>
								<Button
									icon={<EllipsisOutlined />}
									onClick={(e) => e.preventDefault()}
								></Button>
							</Dropdown>
						</div>
						<Text style={{ marginTop: '15px', display: 'block' }}>
							{project.project_name}
						</Text>
					</a>
				))}
			<Modal
				title="修改名称"
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				okText="修改"
				cancelText="取消"
			>
				<Input
					placeholder="团队名称"
					value={projectName}
					onChange={(event) => setProjectName(event.target.value)}
				/>
			</Modal>
		</div>
	)
}

export default AllProject
