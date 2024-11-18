/**
 * 移动并修改并重命名
 */

import QueryEdit from '@/components/QueryEdit'
import Split from 'react-split'
import ResponseView from './ResponseView'

const RunInterface = () => {
  return (
	<Split direction="vertical" sizes={[50, 50]} gutterSize={10}>
	  <QueryEdit />
	  <ResponseView />
	</Split>
  )
}

export default RunInterface
