import { useCallback, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import useGetPosts from './hooks/useGetPosts'
import Card from './components/Card'

function App() {

  const [pageNum, setPageNum] = useState(1)
  const {error, hasNextPage, isError, isLoading, posts} = useGetPosts(pageNum)

  const intObserver = useRef(null)

  const lastPostRef = useCallback(post => {
    if (isLoading) return

    if (intObserver.current) intObserver.current.disconnect()

    intObserver.current = new IntersectionObserver(posts => {
        if (posts[0].isIntersecting && hasNextPage) {
            console.log('We are near the last post!')
            setPageNum(prev => prev + 1)
        }
    })

    if (post) intObserver.current.observe(post)
}, [isLoading, hasNextPage])


  return (
    <>
        <div className="container mx-auto py-10 bg-red-300">
        <h3 className='text-center font-medium text-black text-4xl mb-10'>All Posts</h3>
       
      <div className="grid grid-cols-1 gap-3">
        
        {
          posts?.map((data, i) => {
            if (posts.length === i+1) {
              return <Card key={data.id} post={data} ref={lastPostRef}></Card>
            }
            return <Card key={data.id} post={data}></Card>
          }) 
        }
      </div>
      </div>
    </>
  )
}

export default App
