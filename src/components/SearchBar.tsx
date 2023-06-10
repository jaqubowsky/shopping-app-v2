import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { SearchBarForm } from "../types/form";
import SelectCategorySection from "../pages/ProductForm/SelectCategorySection";
import { Input } from "@material-tailwind/react";
import { useEffect } from "react";

type SearchBarProps = {
  placeholder?: string;
  searchParams: URLSearchParams;
  redirectTo?: string;
};

export default function SearchBar({
  placeholder = "Search...",
  searchParams,
  redirectTo = "/products",
}: SearchBarProps) {
  const { control, reset, register, getValues } = useForm<SearchBarForm>();
  const navigate = useNavigate();

  const clearSearchParams = () => {
    searchParams.delete("search");
    reset({ search: "", category: getValues("category") });

    const queryString = searchParams.toString();
    navigate(`${redirectTo}/?${queryString}`);
  };

  useEffect(() => {
    const search = searchParams.get("search");
    const category = searchParams.get("category");

    reset({ search: search || "", category: category || "" });
  }, [searchParams, reset, navigate, getValues]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    searchParams.set("search", getValues("search"));
    searchParams.set("category", getValues("category"));

    const queryString = searchParams.toString();
    navigate(`${redirectTo}/?${queryString}`);
  };

  return (
    <div className="flex flex-col p-2">
      <form
        className="grid-rows mb-4 grid gap-2 md:grid-cols-3 md:gap-0 lg:grid-cols-5"
        onSubmit={onSubmit}
      >
        <div className="lg:col-span-3">
          <Input
            color="amber"
            aria-label="Search"
            className="search-cancel::text-gray-600 w-full rounded-sm border border-gray-400 p-2 outline-none focus:border-b-2"
            type="search"
            {...register("search")}
            label={placeholder}
          />
        </div>
        <SelectCategorySection<SearchBarForm> control={control} />
        <button
          type="submit"
          className="rounded-sm bg-yellow-800 px-8 py-2 font-bold text-white transition-all hover:bg-yellow-700"
        >
          SEARCH
        </button>
      </form>
      {!searchParams.get("search") ? null : (
        <button
          onClick={clearSearchParams}
          className="cursor-pointer self-start bg-gray-300 p-2 text-gray-700 opacity-75 transition-all hover:bg-red-500 hover:text-white"
        >
          {searchParams.get("search")}
        </button>
      )}
    </div>
  );
}
