import { Content } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getContents = async (): Promise<Content[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies
  })

  const { data, error } = await supabase
    .from('contents')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.log(error);    
  }

  return (data as any) ||[]
}

export default getContents