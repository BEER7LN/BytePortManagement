import styles from './index.module.scss'
import { Button, Form, Input, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import api from '@/api/api'

const onFinishFailed = (errorInfo: any) => {
	console.log('Failed:', errorInfo)
}

type FieldType = {
	username: string
	password: string
}

const LoginForm: React.FC = () => {
	const navigate = useNavigate()

	const onFinish = async (values: any) => {
		
		const {data} = await api.post("/auth/login", values)
		if(data.code != 200){
			message.error("登录失败")
			return;
		}
		message.success("登录成功")
		localStorage.setItem("token", data.data.token);
		// 跳转home界面
		navigate("/main")
	}

	return (
		<div className={styles.main}>
			<div className={styles.loginTitle}>
				<p>登录</p>
			</div>
			<Form
				name="basic"
				style={{ paddingTop: 10, width: '30vw' }}
				className={styles.loginForm}
				initialValues={{
					remember: true
				}}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
				layout="horizontal"
			>
				<p>用户名</p>
				<Form.Item<FieldType>
					name="username"
					rules={[{ required: true, message: 'Please input your username!' }]}
				>
					<Input className={styles.loginInput} placeholder="请输入用户名" />
				</Form.Item>
				<p>密码</p>
				<Form.Item<FieldType>
					name="password"
					rules={[{ required: true, message: 'Please input your password!' }]}
				>
					<Input.Password
						className={styles.loginInput}
						placeholder="请输入密码"
					/>
				</Form.Item>

				<Form.Item style={{ textAlign: 'center' }}>
					<Button className={styles.loginButton} htmlType="submit">
						<p>Login</p>
					</Button>
				</Form.Item>
				<Form.Item style={{ textAlign: 'center' }}>
					<Link to="/register">创建账户</Link>
				</Form.Item>
			</Form>
		</div>
	)
}

export default LoginForm
