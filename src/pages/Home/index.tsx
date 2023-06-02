import { useNavigate, useSearchParams } from "react-router-dom";
import SearchBar from "../../components/SearchBar";
import { BiConfused } from "react-icons/bi";

export default function Home() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const categories = [
    "Other",
    "Clothes",
    "electronics",
    "motorization",
    "home-and-garden",
    "real-estate",
    "education",
    "kids",
    "animals",
    "sport-and-hobby",
    "health-and-beauty",
  ];

  return (
    <>
      <SearchBar searchParams={searchParams} redirect="/products" />
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-3xl">
          Main{" "}
          <span className="text-yellow-800 drop-shadow-lg">categories</span>
        </h2>
      </div>
      <div>
        <div className="hover: my-6 grid grid-cols-5 justify-center gap-6">
          {categories.map((category) => (
            <button
              onClick={() => navigate(`/products/?category=${category}`)}
              key={category}
              className="flex cursor-pointer flex-col items-center justify-center rounded-full px-2 py-9 transition-all hover:bg-gray-300"
            >
              <BiConfused className="mb-2 text-6xl" />
              <p className="text-gray-800">{category}</p>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
