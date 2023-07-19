"use client"

import { FC, useEffect } from "react"
import { useRouter } from "next/navigation"

import { Content } from "@/types"
import { useUser } from "@/hooks/useUser"
import MediaItem from "@/components/MediaItem"
import LikeButton from "@/components/LikeButton"
import useOnPlay from "@/hooks/useOnPlay"

interface LikedContentProps {
  contents: Content[]
}

const LikedContent: FC<LikedContentProps> = ({ contents }) => {
  const router = useRouter()
  const { isLoading, user } = useUser()

  const onPlay = useOnPlay(contents)

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/')
    }
  }, [isLoading, user, router])

  if (contents.length === 0) {
    return (
      <div
        className="
          flex 
          flex-col 
          gap-y-2 
          w-full px-6 
          text-neutral-400
        "
      >
        気に入ったコンテンツをいいねしよう！！
      </div>
    )
  }
  return (
    <div className="flex flex-col gap-y-2 w-full p-6">
      {contents.map((content: any) => (
        <div
          key={content.id}
          className="flex items-center gap-x-4 w-full"
        >
          <div className="flex-1">
            <MediaItem
              onClick={(id: string) => onPlay(id)}
              data={content} />
          </div>
          <LikeButton contentId={content.id} />
        </div>
      ))}
    </div>
  )
}

export default LikedContent