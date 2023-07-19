import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";


import getContents from "./getContents";
import { Content } from "@/types";


const getContentsByTitle = async (title: string): Promise<Content[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies
  });

  if (!title) {
    const allContents = await getContents();
    return allContents;
  }

  const { data, error } = await supabase
    .from('contents')
    .select('*')
    .ilike('title', `%${title}%`)
    .order('created_at', { ascending: false })

  if (error) {
    console.log(error.message);
  }

  return (data as any) || [];
};

export default getContentsByTitle;
