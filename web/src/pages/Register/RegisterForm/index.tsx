import styles from './index.module.scss'
import { Button, Form, Input, message } from 'antd'
import api from '@/api/api'
import { Link } from 'react-router-dom'

const onFinish = async (values: any) => {
	if(values.password1 != values.password2){
		message.error("两次密码不一致！");
		return;
	}
	const {data} = await api.post("/auth/register", {...values, password: values.password1})
	if(data.code == 409){
		message.error("账号已经存在！")
		return;
	}
	message.success("注册成功")
}

const onFinishFailed = (errorInfo: any) => {
	console.log('Failed:', errorInfo)
}

type FieldType = {
	username: string
	password1: string
	password2: string
}
const RegisterForm: React.FC = () => {
	return (
		<div className={styles.main}>
			<div className={styles.registerTitle}>
				<p>注册</p>
			</div>
			<Form
				name="basic"
				style={{ paddingTop: 10, width: '30vw' }}
				className={styles.registerForm}
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
					<Input className={styles.registerInput} placeholder="请输入用户名" />
				</Form.Item>
				<p>密码</p>
				<Form.Item<FieldType>
					name="password1"
					rules={[{ required: true, message: 'Please input your password!' }]}
				>
					<Input.Password
						className={styles.registerInput}
						placeholder="请输入密码"
					/>
				</Form.Item>
				<p>确认密码</p>
				<Form.Item<FieldType>
					name="password2"
					rules={[
						{ required: true, message: 'Please input your password again!' }
					]}
				>
					<Input.Password
						className={styles.registerInput}
						placeholder="请再次输入密码"
					/>
				</Form.Item>

				<Form.Item style={{ textAlign: 'center' }}>
					<Button className={styles.registerButton} htmlType="submit">
						<p>Sign up</p>
					</Button>
				</Form.Item>
				<Form.Item style={{ textAlign: 'center' }}>
					<Link to="/login">已有账号?去登录</Link>
				</Form.Item>
			</Form>
		</div>
	)
}

export default RegisterForm
