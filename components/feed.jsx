"use client"

import { useEffect, useState } from "react"
import PromptCard from "./prompt_card"

const PromptCardList = ({ data, handleTagClick }) => {
    return (
        <div className='mt-16 prompt_layout'>
            {data.map((post) => (
                <PromptCard
                    key={post._id}
                    post={post}
                    handleTagClick={handleTagClick}
                />
            ))}
        </div>
    )
}

const Feed = () => {
    const [text, setText] = useState("")
    const [posts, setPosts] = useState([])
    const handleText = (e) => {}

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch("/api/prompt")
            const data = await response.json()

            setPosts(data)
        }

        fetchPosts()
    }, [])
    return (
        <section className='feed'>
            <form className='relative w-full flex-center'>
                <input
                    type='text'
                    placeholder='Search for a tag or a username'
                    value={text}
                    onChange={handleText}
                    required
                    className='search_input peer'
                />
            </form>

            <PromptCardList data={posts} handleTagClick={() => {}} />
        </section>
    )
}

export default Feed
