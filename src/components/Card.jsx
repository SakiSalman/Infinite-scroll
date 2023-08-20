import React from 'react'

const Card = React.forwardRef(({post}, ref) => {
  return (
    <div className='p-4 border border-indigo-300 rounded-md'>
        <h4 className='text-3xl font-medium mb-3'>{post.title}</h4>
        {
          
          ref ? <p ref={ref} style={{backgroundColor : 'red'}} className='text-xl '>{post.body}</p> : <p className='text-xl '>{post.body}</p>
        }
        
    </div>
  )
})

export default Card