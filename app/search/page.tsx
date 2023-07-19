import getContentsByTitle from "@/actions/getContentsByTitle";
import Header from "@/components/Header";
import SearchInput from '@/components/SearchInput';
import SearchContent from './components/SearchContent';


export const revalidate = 0;

interface SearchProps {
  searchParams: { title: string }
};

const Search = async ({ searchParams }: SearchProps) => {
  const contents = await getContentsByTitle(searchParams.title);

  return (
    <div
      className="
        bg-neutral-900 
        rounded-lg 
        h-full 
        w-full 
        overflow-hidden 
        overflow-y-auto
      "
    >
      <Header className="from-bg-neutral-900">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-white text-3xl font-semibold">
            Search
          </h1>
          <SearchInput />
        </div>
      </Header>
      <SearchContent contents={contents} />
    </div>
  );
}

export default Search;
