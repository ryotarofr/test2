"use client"

import { FC, ReactNode, useMemo } from "react"
import { usePathname } from "next/navigation"
import { twMerge } from 'tailwind-merge';
import { HiHome } from "react-icons/hi"
import { BiSearch } from "react-icons/bi"
import { FcLike } from "react-icons/fc";

import Box from './Box';
import SidebarItem from './SidebarItem';
import Library from './Library';

import { Content } from "@/types"
import usePlayer from "@/hooks/usePlayer"


interface SidebarProps {
  children: ReactNode,
  contents: Content[],
}

const Sidebar: FC<SidebarProps> = ({ children, contents }) => {
  const pathname = usePathname()
  const player = usePlayer()

  const routes = useMemo(() => [
    {
      icon: HiHome,
      label: 'Home',
      active: pathname === '/',
      href: '/',
    },
    {
      icon: BiSearch,
      label: 'Search',
      active: pathname === '/search',
      href: '/search',
    },
    {
      icon: FcLike,
      label: 'Like',
      active: pathname === '/liked',
      href: '/liked',
    },
  ], [pathname])
  return (
    <div
      className={twMerge(`
    flex 
    h-full
    `,
        player.activeId && 'h-[calc(100%-80px)]'
      )}>
      <div
        className="
          hiddlen flex-col gap-y-2 bg-black h-full w-[300px] p-2
          md: flex
      ">
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes.map((item) => (
              <SidebarItem
                key={item.label}
                {...item}
              />
            ))}
          </div>
        </Box>
        <Box className="overflow-y-auto h-full">
          <Library contents={contents} />
        </Box>
      </div>
      <main className="h-full flex-1 overflow-y-auto py-2">
        {children}
      </main>
    </div>
  )
}

export default Sidebar