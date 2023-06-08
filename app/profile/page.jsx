"use client"
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import Profile from "@components/profile"
import { useRouter } from "next/navigation"

const MyProfile = () => {
    const router = useRouter()
    const { data: session } = useSession()
    const [posts, setPosts] = useState([])

    const handleEdit = (post) => {
        router.push(`update-prompt?id=${post._id}`)
    }

    const handleDelete = async (post) => {
        const confirm = window.confirm(
            "Are you sure you want to delete this post?"
        )
        if (confirm) {
            try {
                await fetch(`/api/prompt/${post._id.toString()}`, {
                    method: "DELETE",
                })

                const filteredPosts = posts.filter((p) => p._id !== post._id)

                setPosts(filteredPosts)
            } catch (error) {
                console.log(error)
            }
        }
    }

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`)
            const data = await response.json()

            setPosts(data)
        }

        if (session?.user.id) fetchPosts()
    }, [session?.user.id])
    return (
        <Profile
            name='My'
            desc='Welcome to your personalized profile page'
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default MyProfile
