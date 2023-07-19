"use client"

import useGetContentById from "@/hooks/useGetContentById"
import useLoadContentUrl from "@/hooks/useLoadContentUrl"
import usePlayer from "@/hooks/usePlayer"
import PlayerContent from "./PlayerContent"


const Player = () => {
  const player = usePlayer()
  const { content } = useGetContentById(player.activeId)

  // コードの中のcontent!は、TypeScriptの非nullアサーション演算子（non-null assertion operator）です。この演算子は、変数やプロパティがnullまたはundefinedではないことを明示的に宣言します。
  const contentUrl = useLoadContentUrl(content!)

  if (!content || !contentUrl || !player.activeId) {
    return null
  }

  return (
    <div
      className="
    fixed 
    bottom-0 
    bg-black 
    w-full 
    py-2 
    h-[80px] 
    px-4
  "
    >
      <PlayerContent
        key={contentUrl}
        content={content}
        contentUrl={contentUrl}
      />
    </div>
  )
}

export default Player