"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from 'react';
import qs from "query-string"

import useDebounce from "@/hooks/useDebounce";
import Input from "./Input";

const SearchInput = () => {
  const router = useRouter()
  const [value, setValue] = useState<string>("")
  const devauncedValue = useDebounce<string>(value, 500)

  useEffect(() => {
    const query = {
      title: devauncedValue,
    }

    const url = qs.stringifyUrl({
      url: '/search',
      query: query
    })

    router.push(url)
  }, [devauncedValue, router])
  return (
    <Input
      placeholder="きっと見つかる!!"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}

export default SearchInput