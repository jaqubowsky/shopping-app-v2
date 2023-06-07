import { Controller, Control, FieldValues } from "react-hook-form";
import { Select, Option } from "@material-tailwind/react";
import { validationInfo } from "./validationInfo";

type SelectCategorySectionProps<T extends FieldValues> = {
  control: Control<T>;
};

function SelectCategorySection<T extends FieldValues>({
  control,
}: SelectCategorySectionProps<T>) {
  return (
    <Controller
      control={control}
      name="category"
      rules={{ required: validationInfo.required.category }}
      render={({ field }) => (
        <Select
          label="Select category"
          color="amber"
          aria-label="Select category"
          className="rounded-none"
          value={field.value}
          onChange={field.onChange}
        >
          <Option value="Other">Other</Option>
          <Option value="Clothes">Clothes</Option>
          <Option value="Electronics">Electronics</Option>
          <Option value="Motorization">Motorization</Option>
          <Option value="Home and Garden">Home and garden</Option>
          <Option value="Real Estate">Real estate</Option>
          <Option value="Education">Education</Option>
          <Option value="For kids">For kids</Option>
          <Option value="Animals">Animals</Option>
          <Option value="Sport and Hobby">Sport and hobby</Option>
          <Option value="Health and Beauty">Health and beauty</Option>
        </Select>
      )}
    />
  );
}

export default SelectCategorySection;
