import { useNavigate, useSearchParams } from "react-router-dom";
import SearchBar from "../../components/SearchBar";
import IconComponent from "../../components/IconComponent";

export default function Home() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const categories = [
    "Other",
    "Clothes",
    "Electronics",
    "Motorization",
    "Home and Garden",
    "Real Estate",
    "Education",
    "Kids",
    "Animals",
    "Sport and Hobby",
    "Health and Beauty",
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
        <div className="hover: my-6 grid grid-cols-1 md:grid-cols-4 justify-center gap-6">
          {categories.map((category) => (
            <button
              onClick={() => navigate(`/products/?category=${category}`)}
              key={category}
              className="p-4 flex cursor-pointer flex-col items-center justify-center transition-all hover:border-b hover:border-b-yellow-800"
            >
              <IconComponent category={category} />
              <p className="text-gray-800">{category}</p>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
