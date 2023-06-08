"use client"

import Form from "@components/form"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function CreatePrompt() {
    const router = useRouter()
    const { data: session } = useSession()

    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({ prompt: "", tag: "" })
    const createPrompt = async (e) => {
        e.preventDefault()
        setSubmitting(true)

        try {
            const response = await fetch("api/prompt/new", {
                method: "POST",
                body: JSON.stringify({
                    prompt: post.prompt,
                    userID: session?.user.id,
                    tag: post.tag,
                }),
                tag: post.tag,
            })

            if (response.ok) {
                router.push("/")
            }
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Form
            type='Create'
            post={post}
            setPost={setPost}
            submiting={submitting}
            handleSubmit={createPrompt}
        />
    )
}
