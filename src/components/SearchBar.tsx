import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import SelectCategorySection from "../pages/ProductForm/SelectCategorySection";
import { useForm } from "react-hook-form";
import { SearchBarForm } from "../types/form";

type SearchBarProps = {
  placeholder?: string;
  redirect: string;
  searchParams: URLSearchParams;
};

export default function SearchBar({
  placeholder = "Search...",
  searchParams,
  redirect,
}: SearchBarProps) {
  const { register, watch, reset, control } = useForm<SearchBarForm>();
  const navigate = useNavigate();

  const searchParam = searchParams.get("search");
  const categoryParam = searchParams.get("category");
  const category = watch("category");

const createRedirectPage = useCallback(() => {
  const currentSearch = watch("search") || searchParam || "";
  const currentCategory = watch("category") || categoryParam || "";

  return `${redirect}?search=${currentSearch}&category=${currentCategory}`;
}, [watch, searchParam, categoryParam, redirect]);

  useEffect(() => {
    if (watch("category")) {
      const redirectPage = createRedirectPage();
      navigate(redirectPage);
    }
  }, [category, navigate, watch, createRedirectPage]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    navigate(createRedirectPage());

    reset();
  }

  const clearSearchParams = () => {
    const newSearchParams = new URLSearchParams(window.location.search);
    newSearchParams.delete("search");

    const redirectPage = `?${newSearchParams.toString()}`;

    navigate(redirectPage);
  };

  return (
    <div className="flex w-full max-w-screen-lg flex-col p-2">
      <form className="mb-4 flex" onSubmit={onSubmit}>
        <input
          className="search-cancel::text-gray-600 w-full rounded-sm border border-gray-400 p-2 outline-none focus:border-b-2"
          type="search"
          placeholder={placeholder}
          {...register("search")}
        />
        <SelectCategorySection<SearchBarForm>
          value={categoryParam || ""}
          control={control}
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
