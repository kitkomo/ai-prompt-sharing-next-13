import SkeletonLoader from './Loading/SkeletonLoader'
import PromtCard from './PromtCard'

const Profile = ({ name, description, data, handleEdit, handleDelete }) => {
	return (
		<section className='w-full'>
			<h1 className='head_text text-left'>
				<span className='blue_gradient'>{name}</span> Profile
			</h1>
			<p className='desc text-left'>{description}</p>
			<div className='mt-16 prompt_layout'>
				{data.length > 0 ? (
					<>
						{data.map(post => (
							<PromtCard
								key={post._id}
								post={post}
								handleEdit={() => handleEdit && handleEdit(post)}
								handleDelete={() => handleDelete && handleDelete(post)}
							/>
						))}
					</>
				) : (
					<SkeletonLoader
						count={5}
						inline='true'
						className='skeletonLoader'
						containerClassName='containerLoader'
					/>
				)}
			</div>
		</section>
	)
}

export default Profile
