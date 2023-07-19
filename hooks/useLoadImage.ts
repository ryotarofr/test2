import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { Content } from "@/types";

const useLoadImage = (content: Content) => {
  const supabaseClient = useSupabaseClient();
  
  if (!content) {
    return null;
  }

  const { data: imageData } = supabaseClient
    .storage
    .from('images')
    .getPublicUrl(content.image_path);

  return imageData.publicUrl;
};

export default useLoadImage;
