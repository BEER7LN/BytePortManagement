import React, { useRef, useState, useEffect } from 'react'
import { UserOutlined, LogoutOutlined } from '@ant-design/icons'
import {
	Menu,
	Typography,
	Layout,
	Avatar,
	Dropdown,
	Button,
	Modal,
	Input,
	message
} from 'antd'
import type { MenuProps } from 'antd/es/menu'
import styles from './index.module.scss'
import api from '@/api/api'
import MyProject from './MyProject'

const { Title } = Typography
const { Header, Sider, Content } = Layout

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
	label: React.ReactNode,
	key?: React.Key | null,
	icon?: React.ReactNode,
	children?: MenuItem[]
): MenuItem {
	return {
		label,
		key,
		icon,
		children
	} as MenuItem
}

const Main: React.FC = () => {
	const myRef = useRef(null)
	const [teamName, setTeamName] = useState('')
	const [isModalOpen, setIsModalOpen] = useState(false)

	const [selectedKey, setSelectedKey] = useState('1')
	const [siderItems, setSiderItems] = useState<MenuItem[]>([])

	const handleOk = async () => {
		console.log(teamName)
		const { data } = await api.post('/teams/create', { team_name: teamName })
		if (data.code == 200) {
			message.success('创建成功！')
		}
		await loadTeams()
		setTeamName('')
		setIsModalOpen(false)
	}

	const handleCancel = () => {
		setTeamName('')
		setIsModalOpen(false)
	}

	const items: MenuProps['items'] = [
		{
			key: '1',
			label: (
				<a>
					<LogoutOutlined style={{ marginRight: '0.5em' }} />
					退出登录
				</a>
			)
		}
	]

	const loadTeams = async () => {
		const { data } = await api.get('/teams')
		const newSiderItems: MenuItem[] = data.data.map((item) =>
			getItem(item.team.team_name, item.team_id)
		)
		await setSiderItems(newSiderItems)
		// console.log("~", siderItems)

	}

	useEffect(() => {
		loadTeams()
		//   (async function fun() {
		// 	await 
		// 	console.log(">>", siderItems[0]?.key)
		// 	await 
		// })();
		// const timer = setInterval(() => {
		// 	console.log(siderItems)
		// 	if(siderItems.length != 0){
		// 		console.log(siderItems)
		// 		setSelectedKey(siderItems[0]?.key)
		// 		clearInterval(timer)
		// 	}
		// }, 10)
	}, [])

	const handleMenuSelect = ({ key }: { key: string }) => {
		setSelectedKey(key)
	}

	return (
		<Layout
			style={{ backgroundColor: 'transparent', height: '100vh' }}
			hasSider
		>
			<Sider className={styles.sider} theme="light" width={300}>
				<div className={styles.title}>
					<Title className={styles.name} level={3}>
						API Tools
					</Title>
				</div>

				<Menu
					ref={myRef}
					mode="vertical"
					selectedKeys={[selectedKey]}
					items={siderItems}
					onSelect={handleMenuSelect}
					style={{ borderRight: '0' }}
				></Menu>
				<Button type="primary" onClick={() => setIsModalOpen(true)} block>
					创建团队
				</Button>
				<Modal
					title="团队创建"
					open={isModalOpen}
					onOk={handleOk}
					onCancel={handleCancel}
					okText="创建"
					cancelText="取消"
				>
					<Input
						placeholder="团队名称"
						value={teamName}
						onChange={(event) => setTeamName(event.target.value)}
					/>
				</Modal>
			</Sider>
			<Layout className={styles.right}>
				<Header className={styles.header}>
					<div className={styles.avatar}>
						<Dropdown
							menu={{ items }}
							placement="bottomRight"
							arrow={{ pointAtCenter: true }}
						>
							<Avatar
								className={styles.images}
								style={{ backgroundColor: '#1677ff' }}
								icon={<UserOutlined />}
							/>
						</Dropdown>
					</div>
				</Header>
				<Content className={styles.content}>
					{/* {selectedKey} */}
					<MyProject selectedKey={selectedKey} />
				</Content>
			</Layout>
		</Layout>
	)
}

export default Main
