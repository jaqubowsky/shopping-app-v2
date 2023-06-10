export type FormInputs = {
  name: string;
  description: string;
  price: number;
  category: string | undefined;
  image?: FileList | undefined;
  email?: string;
  phoneNumber: number;
  location: string;
};

export type SearchBarForm = {
  search: string;
  category: string;
};
