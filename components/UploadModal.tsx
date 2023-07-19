"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import uniqid from "uniqid"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { useSupabaseClient } from "@supabase/auth-helpers-react"

import useUploadModal from "@/hooks/useUploadModal"
import Modal from "./Modal"
import Input from "./Input"
import Button from "./Button"
import { toast } from "react-hot-toast"
import { useUser } from "@/hooks/useUser"




const UploadModal = () => {
  const [isLoading, setIsLoading] = useState(false)
  const uploadModal = useUploadModal()
  const { user } = useUser()
  const supabaseClient = useSupabaseClient()
  const router = useRouter()

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: '',
      title: '',
      content: null,
      image: null
    }
  })

  const onChange = (open: boolean) => {
    if (!open) {
      reset()
      uploadModal.onClose()
    }
  }

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true)

      const imageFile = values.image?.[0]
      const contentFile = values.content?.[0]

      if (!imageFile || !contentFile || !user) {
        toast.error("Missing files...")
        return //このreturn忘れがちだけどtryの中ではerrorを返すために必要
      }

      const uniqueID = uniqid()

      // Upload Content
      const {
        data: contentData,
        error: contentError,
      } = await supabaseClient
        .storage
        .from('contents')
        .upload(`content-${values.title}-${uniqueID}`, contentFile, {
          cacheControl: '3600',
          upsert: false,
        })

      if (contentError) {
        setIsLoading(false)
        return toast.error("Faild content upload...")
      }

      const {
        data: imageData,
        error: imageError,
      } = await supabaseClient
        .storage
        .from('images')
        .upload(`image-${values.title}-${uniqueID}`, imageFile, {
          cacheControl: '3600',
          upsert: false,
        })

      if (imageError) {
        setIsLoading(false)
        return toast.error("Faild image upload...")
      }

      const { error: supabaseError } = await supabaseClient
        .from('contents')
        .insert({
          user_id: user.id,
          title: values.title,
          author: values.author,
          image_path: imageData.path,
          content_path: contentData.path
        })

      if (supabaseError) {
        setIsLoading(false)
        return toast.error(supabaseError.message)
      }

      router.refresh()
      setIsLoading(false)
      toast.success("content Cteated!")
      reset()
      uploadModal.onClose()

    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <Modal
      title="add a content"
      description="Upload an mp3,mdx file"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4"
      >
        <Input
          id="title"
          disabled={isLoading}
          {...register('title', { required: true })}
          placeholder='content title'
        />
        <Input
          id="author"
          disabled={isLoading}
          {...register('author', { required: true })}
          placeholder='content author'
        />
        <div>
          <div className="pb-1">
            Select a content file
          </div>
          <Input
            id="content"
            type="file"
            disabled={isLoading}
            accept=".mp3"
            {...register('content', { required: true })}
          />
        </div>
        <div>
          <div className="pb-1">
            Select an image
          </div>
          <Input
            id="image"
            type="file"
            disabled={isLoading}
            accept="image/*"
            {...register('image', { required: true })}
          />
        </div>
        <Button disabled={isLoading} type="submit">
          Create
        </Button>
      </form>
    </Modal>
  )
}

export default UploadModal