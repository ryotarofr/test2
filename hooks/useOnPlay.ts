import { Content } from "@/types";

import usePlayer from "./usePlayer";
import useAuthModal from "./useAuthModal";
import { useUser } from "./useUser";
import useSubscribeModal from "./useSubscribeModal";

const useOnPlay = (contents: Content[]) => {
  const player = usePlayer();
  const subscribeModal = useSubscribeModal()
  const authModal = useAuthModal();
  const { subscription, user } = useUser();

  const onPlay = (id: string) => {
    if (!user) {
      return authModal.onOpen();
    }

    if(!subscription){
      return subscribeModal.onOpen()
      }

    player.setId(id);
    player.setIds(contents.map((content) => content.id));
  }

  return onPlay;
};

export default useOnPlay;
