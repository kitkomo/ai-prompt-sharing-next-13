import Link from 'next/link'
import SkeletonLoader from './Loading/SkeletonLoader'

const Form = ({ type, post, setPost, submitting, handleSubmit, isLoading }) => {
	return (
		<section className='w-full max-w-full flex-start flex-col'>
			<h1 className='head_text text-left capitalize'>
				<span className='blue_gradient'>{type}</span> Post
			</h1>
			<p className='desc text-left max-w-md'>
				{type} and share amazing prompts with the world, and let your
				imagination run wild with any AI-powered platform.
			</p>
			<form
				onSubmit={handleSubmit}
				className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
			>
				<label>
					<span className='font-satoshi font-semibold text-base text-gray-700'>
						Your AI Prompt
					</span>
					{isLoading ? (
						<SkeletonLoader className='py-20 mt-2'/>
					) : (
						<textarea
							value={post.prompt}
							onChange={e => setPost({ ...post, prompt: e.target.value })}
							placeholder='Write your prompt here'
							required
							className='form_textarea'
						></textarea>
					)}
				</label>
				<label>
					<span className='font-satoshi font-semibold text-base text-gray-700'>
						Tags
					</span>
					{isLoading ? (
						<SkeletonLoader  className='py-4 mt-2' />
					) : (
						<input
							value={post.tags}
							onChange={e => setPost({ ...post, tags: e.target.value })}
							placeholder='product idea webdev'
							required
							className='form_input'
						/>
					)}
				</label>
				<div className='flex flex-end mx-3 mb-5 gap-4'>
					<Link href='/' className='text-gray-500 text-sm'>
						Cancel
					</Link>
					<button
						type='submit'
						disabled={submitting}
						className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white capitalize'
					>
						{submitting ? `${type}...` : type}
					</button>
				</div>
			</form>
		</section>
	)
}

export default Form
