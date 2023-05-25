import { MutatingDots } from "react-loader-spinner";

function Spinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <MutatingDots
        height="100"
        width="100"
        color="#ffd000f8"
        secondaryColor="#f1c811"
        radius="15"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}

export default Spinner;