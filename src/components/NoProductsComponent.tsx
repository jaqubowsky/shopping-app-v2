import { Link } from "react-router-dom";

type NoProductsComponentProps = {
  noProducts?: boolean;
  wrongFilters?: boolean;
  redirectTo?: string;
} & (
  | {
      noProducts: boolean;
      wrongFilters?: never;
    }
  | {
      noProducts?: never;
      wrongFilters: boolean;
    }
);

export default function NoProductsComponent({noProducts, wrongFilters, redirectTo}: NoProductsComponentProps) {
  if (noProducts) {
return (
  <div className="flex flex-col items-center justify-center">
    <h2 className="mb-8 text-4xl font-bold">You have no products yet!</h2>
    <Link to="/add-product" className="main-button w-8/12">
      Click here to add one!
    </Link>
  </div>
);
  }

  if (wrongFilters) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h2 className="mb-8 text-4xl font-bold">
          No products found with these filters!
        </h2>
        <Link to={redirectTo || "/"} replace className="main-button w-8/12">
          Clear filters
        </Link>
      </div>
    );
  }

  return null;
}
