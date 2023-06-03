import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import SelectCategorySection from "../pages/ProductForm/SelectCategorySection";
import { useForm } from "react-hook-form";
import { SearchBarForm } from "../types/form";
import { Input } from "@material-tailwind/react";

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
    <div className="flex flex-col p-2">
      <form className="mb-4 grid gap-2 md:gap-0 grid-rows md:grid-cols-3 lg:grid-cols-5" onSubmit={onSubmit}>
        <div className="lg:col-span-3">
          <Input
            color="amber"
            aria-label="Search"
            className="search-cancel::text-gray-600 w-full rounded-sm border border-gray-400 p-2 outline-none focus:border-b-2"
            type="search"
            label={placeholder}
            {...register("search")}
          />
        </div>
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
          className="cursor-pointer self-start bg-gray-300 p-2 text-gray-700 opacity-75 transition-all hover:bg-red-500 hover:text-white"
        >
          {searchParam}
        </button>
      )}
    </div>
  );
}
