"use client"

import { FC } from 'react';
import { Content } from "@/types"
import MediaItem from '@/components/MediaItem';
import LikeButton from '@/components/LikeButton';
import useOnPlay from '@/hooks/useOnPlay';


interface SearchContentProps {
  contents: Content[],
}

const SearchContent: FC<SearchContentProps> = ({ contents }) => {
  const onPlay = useOnPlay(contents)

  if (contents.length === 0) {
    return (
      <div
        className="
          flex 
          flex-col 
          gap-y-2 
          w-full 
          px-6 
          text-neutral-400
        "
      >
        No content found.
      </div>
    )
  }
  return (
    <div className="flex flex-col gap-y-2 w-full px-6">
      {contents.map((content: any) => (
        <div
          key={content.id}
          className="flex items-center gap-x-4 w-full"
        >
          <div className="flex-1">
            <MediaItem
              onClick={(id: string) => onPlay(id)}
              data={content}
            />
          </div>
          <LikeButton contentId={content.id} />
        </div>
      ))}
    </div>
  )
}

export default SearchContent