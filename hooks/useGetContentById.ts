import { useEffect, useMemo, useState } from "react"
import { toast } from "react-hot-toast"

import { Content } from "@/types"
import { useSessionContext } from "@supabase/auth-helpers-react"


const useGetContentById = (id?: string) => {
  const [isLoading, setIsLoading] = useState(false)
  const [content, setContent] = useState<Content | undefined>(undefined)
  const { supabaseClient } = useSessionContext()
  
  useEffect(() => {
    if (!id) {
      return;
    }

    setIsLoading(true);

    const fetchContent = async () => {
      const { data, error } = await supabaseClient
        .from('contents')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        setIsLoading(false);
        return toast.error(error.message);
      }
      
      setContent(data as Content);
      setIsLoading(false);
    }

    fetchContent();
  }, [id, supabaseClient]);

  return useMemo(() => ({
    isLoading,
    content
  }), [isLoading, content]);
}

export default useGetContentById