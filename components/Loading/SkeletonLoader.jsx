import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SkeletonLoader = ({className, ...rest }) => {
	return (
		<Skeleton
			{...rest}
			className={className}
		/>
	)
}

export default SkeletonLoader
