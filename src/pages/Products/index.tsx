import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { onPromise } from "../../utils/onPromise";
import { addProduct } from "../../api/productsApi";

type Inputs = {
  e?: Event;
  name: string;
  description: string;
  price: number;
  image: FileList;
};

export default function Products() {
  const [popUp, setPopUp] = useState(false);

  const togglePopUp = () => {
    setPopUp((prevState) => !prevState);
  };

  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (
    { name, description, price, image },
    e
  ) => {
    e?.preventDefault();
    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price.toString());
    formData.append("image", image[0]);

    await addProduct(formData);
  };

  return (
    <div>
      <button
        className="rounded-full bg-black p-6 text-white"
        onClick={togglePopUp}
      >
        Add product!
      </button>
      {popUp ? (
        <form
          encType="multipart/form-data"
          className="flex flex-col"
          onSubmit={onPromise(handleSubmit(onSubmit))}
        >
          <label>
            Name:
            <input
              type="text"
              {...register("name", { required: "This is required" })}
            ></input>
          </label>
          <label>
            Description:
            <input
              type="text"
              {...register("description", { required: "This is required" })}
            ></input>
          </label>
          <label>
            Price:
            <input
              type="number"
              {...register("price", {
                required: "This is required",
                valueAsNumber: true,
              })}
            ></input>
          </label>
          <label>
            Picture:
            <input type="file" id="image" {...register("image")}></input>
          </label>
          <button
            type="submit"
            className="rounded-full bg-black p-6 text-white"
          >
            Submit
          </button>
        </form>
      ) : null}
    </div>
  );
}
