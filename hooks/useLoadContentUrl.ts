import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { Content } from "@/types";

const useLoadContentUrl = (content: Content) => {
  const supabaseClient = useSupabaseClient();

  if (!content) {
    return '';
  }

  const { data: contentData } = supabaseClient
  .storage
  .from('contents')
  .getPublicUrl(content.content_path);

  return contentData.publicUrl;
};

export default useLoadContentUrl;
