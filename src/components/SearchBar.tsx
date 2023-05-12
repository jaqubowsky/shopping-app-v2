import { useForm } from "react-hook-form";

type SearchBarProps = {
  placeholder: string;
};

export default function SearchBar({ placeholder }: SearchBarProps) {
  const { register, handleSubmit } = useForm();

  return (
    <form className="flex justify-center">
      <input
        className="search-cancel::text-gray-600 rounded-sm border border-gray-400 p-2 outline-none focus:border-b-2 w-7/12"
        type="search"
        placeholder={placeholder}
        {...register("search")}
      />
      <button className="rounded-sm bg-yellow-800 font-bold text-white transition-all hover:bg-yellow-700 px-8 py-2">
        SEARCH
      </button>
    </form>
  );
}
