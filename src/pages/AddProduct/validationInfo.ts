export const validationInfo = {
  required: {
    category: "Category is required",
    price: "Price is required",
    name: "Product name is required",
    image: "Image is required",
    email: "Email is required",
    phoneNumber: "Phone number is required",
    location: "Location is required",
  },
  length: {
    notLongEnough: {
      description: "Description must be at least 80 characters long.",
    },
    tooLong: {
      description: "Description must be less than 500 characters long.",
    }
  },
  undefined: "Undefined error",
};
