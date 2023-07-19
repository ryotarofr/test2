"use client"

import { useUser } from "@/hooks/useUser"
import ErrorContent from "./ErrorContent";


const PostContent = ({ children }: any) => {
  const { isLoading, user, subscription } = useUser()

  if (isLoading || !user || !subscription) {
    return <ErrorContent />;
  }


  return (
    <>
      {children}
    </>
  )
}

export default PostContent

