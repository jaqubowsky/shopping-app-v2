import { AiOutlineQuestionCircle, AiOutlineUser } from "react-icons/ai";
import { RiShoppingCartLine } from "react-icons/ri";
import { FaLaptop } from "react-icons/fa";
import { GiCarWheel } from "react-icons/gi";
import { IoHomeOutline } from "react-icons/io5";
import { BsBook } from "react-icons/bs";
import { MdChildCare } from "react-icons/md";
import { GiDogBowl } from "react-icons/gi";
import { IoBasketballOutline } from "react-icons/io5";
import { GiHealthNormal } from "react-icons/gi";

type IconComponentProps = {
  category: string;
};

const IconComponent = ({ category }: IconComponentProps) => {
  const iconProps = { className: "mb-4 text-6xl text-yellow-800" };

  switch (category) {
    case "Other":
      return <AiOutlineQuestionCircle {...iconProps} />;
    case "Clothes":
      return <AiOutlineUser {...iconProps} />;
    case "Electronics":
      return <FaLaptop {...iconProps} />;
    case "Motorization":
      return <GiCarWheel {...iconProps} />;
    case "Home and Garden":
      return <IoHomeOutline {...iconProps} />;
    case "Real Estate":
      return <BsBook {...iconProps} />;
    case "Education":
      return <MdChildCare {...iconProps} />;
    case "Kids":
      return <GiDogBowl {...iconProps} />;
    case "Animals":
      return <IoBasketballOutline {...iconProps} />;
    case "Sport and Hobby":
      return <RiShoppingCartLine {...iconProps} />;
    case "Health and Beauty":
      return <GiHealthNormal {...iconProps} />;
    default:
      return null;
  }
};

export default IconComponent;
