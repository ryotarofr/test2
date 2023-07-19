"use client"

import { FC, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSessionContext } from "@supabase/auth-helpers-react"
import { toast } from 'react-hot-toast';

import { Content } from "@/types"
import useAuthModal from "@/hooks/useAuthModal"
import { useUser } from "@/hooks/useUser"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"


interface LikeButtonProps {
  contentId: string,
}

const LikeButton: FC<LikeButtonProps> = ({ contentId }) => {
  const router = useRouter()
  const { supabaseClient } = useSessionContext()

  const authModal = useAuthModal()
  const { user } = useUser()

  const [isLiked, setIsLiked] = useState<boolean>(false)

  useEffect(() => {
    if (!user?.id)
      return
    const fechData = async () => {
      const { data, error } = await supabaseClient
        .from('liked_contents')
        .select('*')
        .eq('user_id', user.id)
        .eq('content_id', contentId)
        .single();

      if (!error && data) {
        setIsLiked(true);
      }
    }

    fechData()
  }, [contentId, supabaseClient, user?.id])

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart

  const handleLike = async () => {
    if (!user) {
      return authModal.onOpen()
    }

    if (isLiked) {
      const { error } = await supabaseClient
        .from('liked_contents')
        .delete()
        .eq('user_id', user.id)
        .eq('content_id', contentId)

      if (error) {
        toast.error(error.message)
      } else {
        setIsLiked(false);
      }

    } else {
      const { error } = await supabaseClient
        .from('liked_contents')
        .insert({
          content_id: contentId,
          user_id: user.id,
        })

      if (error) {
        toast.error(error.message)
      } else {
        setIsLiked(true)
        toast.success("いいねに追加!")
      }
    }

    router.refresh()
  }

  return (
    <button
      className="
        hover:opacity-75 
        transition
      "
      onClick={handleLike}
    >
      <Icon color={isLiked ? "#22c55e" : "white"} size={25} />
    </button>
  )
}

export default LikeButton