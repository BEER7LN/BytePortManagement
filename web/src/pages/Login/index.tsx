import LoginForm from './LoginForm'
import styles from './index.module.scss'

const Login: React.FC = () => {
	return (
		<div className={styles.container}>
			<LoginForm />
		</div>
	)
}

export default Login
