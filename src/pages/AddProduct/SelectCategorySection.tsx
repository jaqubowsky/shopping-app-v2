import { Controller, Control } from "react-hook-form";
import { Select, Option } from "@material-tailwind/react";
import { FormInputs } from ".";
import { validationInfo } from "./validationInfo";

type SelectCategorySectionProps = {
  control: Control<FormInputs>;
};

function SelectCategorySection({
  control,
}: SelectCategorySectionProps) {
  return (
    <Controller
      control={control}
      name="category"
      rules={{ required: validationInfo.required.category }}
      render={({ field: { onChange, name } }) => (
        <Select
          label="Select category"
          color="amber"
          onChange={onChange}
          name={name}
        >
          <Option value={undefined}>---</Option>
          <Option value="Clothes">Clothes</Option>
          <Option value="Electronics">Electronics</Option>
          <Option value="Motorization">Motorization</Option>
          <Option value="Home and garden">Home and garden</Option>
          <Option value="Real estate">Real estate</Option>
          <Option value="Education">Education</Option>
          <Option value="For kids">For kids</Option>
          <Option value="Animals">Animals</Option>
          <Option value="Sport and hobby">Sport and hobby</Option>
          <Option value="Heath and beauty">Health and beauty</Option>
        </Select>
      )}
    />
  );
}

export default SelectCategorySection;