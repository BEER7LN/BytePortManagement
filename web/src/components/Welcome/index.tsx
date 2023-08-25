import styles from './index.module.scss'
import welcome from '@/assets/welcome.svg'
const Welcome: React.FC = () => {
	return (
		<div className={styles.main}>
			<div className={styles.appIntro}>
				<div className={styles.appName}>API Tools</div>
			</div>
			<div className={styles.appWelcome}>
				<img src={welcome} alt="欢迎捏" />
			</div>
		</div>
	)
}

export default Welcome
