import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type SearchBarProps = {
  placeholder?: string;
  searchParams: URLSearchParams;
  clearSearchParams?: () => void;
};

export default function SearchBar({
  placeholder = "Search...",
  searchParams,
  clearSearchParams,
}: SearchBarProps) {
  const { register, watch, reset } = useForm();
  const navigate = useNavigate();

  const searchParam = searchParams.get("search");
  const categoryParam = searchParams.get("category");

  const redirectPage = `/products?${
    //eslint-disable-next-line
    watch("search") ? `search=${watch("search")}&` : ""
  }${categoryParam ? `category=${categoryParam}` : ""}`;

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    navigate(redirectPage);
    reset();
  }

  return (
    <div className="flex w-full max-w-screen-lg flex-col p-2">
      <form className="mb-4 flex" onSubmit={onSubmit}>
        <input
          className="search-cancel::text-gray-600 w-full rounded-sm border border-gray-400 p-2 outline-none focus:border-b-2"
          type="search"
          placeholder={placeholder}
          {...register("search")}
        />
        <button
          type="submit"
          className="rounded-sm bg-yellow-800 px-8 py-2 font-bold text-white transition-all hover:bg-yellow-700"
        >
          SEARCH
        </button>
      </form>
      {!searchParam ? null : (
        <button
          onClick={clearSearchParams}
          className="cursor-pointer self-start rounded-full bg-gray-300 p-2 text-gray-700 opacity-75 transition-all hover:bg-red-500 hover:text-white"
        >
          {searchParam}
        </button>
      )}
    </div>
  );
}
