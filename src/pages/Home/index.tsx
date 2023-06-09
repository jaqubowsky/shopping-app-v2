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
      <div className="flex flex-col items-center justify-center mt-2">
        <SearchBar searchParams={searchParams} redirectTo="/products" />
        <h2 className="text-3xl">
          Main{" "}
          <span className="text-yellow-800 drop-shadow-lg">categories</span>
        </h2>
      </div>
      <div>
        <div className="hover: my-6 grid grid-cols-1 justify-center gap-6 md:grid-cols-4">
          {categories.map((category) => (
            <button
              onClick={() => navigate(`/products/?category=${category}`)}
              key={category}
              className="flex cursor-pointer flex-col items-center justify-center p-4 transition-all hover:border-b hover:border-b-yellow-800"
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
