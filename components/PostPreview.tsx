import Link from "next/link";
// import { useRouter } from "next/navigation"
import { FaUnlockKeyhole } from "react-icons/fa6"


import useAuthModal from "@/hooks/useAuthModal";
import useSubscribeModal from "@/hooks/useSubscribeModal";
// import { useUser } from "@/hooks/useUser";
import Image from "next/image";
import { PostMetadata } from "@/PostMetadata";


const PostPreview = (props: PostMetadata) => {
  // const authModal = useAuthModal()
  // const subscribeModal = useSubscribeModal();
  // const { user, subscription } = useUser()
  // const router = useRouter();


  // const onClick = () => {
  //   if (props.subrcrive && !user) {
  //     return authModal.onOpen()
  //   }

  //   if (props.subrcrive && !subscription) {
  //     return subscribeModal.onOpen();
  //   }

  //   if (props.subrcrive && user && subscription) {
  //     router.push(`/posts/${props.slug}`)
  //   }
  // }

  return (
    <div
      className="border border-slate-300 rounded-md shadow-sm
    bg-white hover:bg-slate-100"
    >

      {props.image && (
        <Image
          alt="猫"
          src={props?.image}
          width={700}
          height={425}
          sizes="100vw"
          className="w-full h-auto rounded-md"
        />
      )}
      <div className="flex justify-between px-2 pt-2">
        <div>
          {props?.subrcrive &&
            <div className="text-sm text-slate-400">
              <FaUnlockKeyhole size={16} />
            </div>}
        </div>
        <p className="text-sm text-slate-400">{props.date}</p>
      </div>
      {props?.subrcrive ? <div
        className="cursor-pointer"
      // onClick={onClick}
      >
        <h2 className=" text-violet-600 hover:underline mb-4 px-4">{props.title}</h2>
      </div>
        :
        <Link
          href={`/posts/${props.slug}`}
          className="cursor-pointer"
        >
          <h2 className=" text-violet-600 hover:underline mb-4 px-4">{props.title}</h2>
        </Link>
      }
      <p className="text-slate-700 px-4 pb-4">{props.subtitle}</p>
    </div>
  );
};

export default PostPreview;
