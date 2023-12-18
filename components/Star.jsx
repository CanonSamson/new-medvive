import { FaStarHalfAlt, FaStar } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";

const Star = ({ stars, size }) => {
  let roundedNumber;
  if (typeof stars === "number") {
    roundedNumber = stars.toFixed(1);
  } else {
    return null;
  }

  const ratingStar = Array.from({ length: 5 }, (elem, index) => {
    let number = index + 0.5;

    return (
      <span key={index}>
        {roundedNumber > index + 0.5 ? (
          <FaStar size={size ? size : 20} className=" text-yellow-400" />
        ) : stars > number ? (
          <FaStarHalfAlt size={size ? size : 20} className=" text-yellow-400" />
        ) : (
          <AiOutlineStar size={size ? size : 20} className=" text-yellow-400" />
        )}
      </span>
    );
  });

  return (
    <span className=" flex text-[12px]  items-center gap-[4px]">
      <div className=" flex items-center gap-[2px]"> {ratingStar} </div>
      {roundedNumber}
    </span>
  );
};

export default Star;
