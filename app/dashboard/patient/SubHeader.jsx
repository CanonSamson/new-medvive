import Link from "next/link";
import { IoMdArrowDropright } from "react-icons/io";

const SubHeader = ({ text, href }) => {
  return (
    <div className=" flex relative justify-between z20">
      <span className=" text-xl font-semibold">{text}</span>
      <Link href={href} className=" flex items-center text-primary">
        <span className="text-base font-semibold">Show all</span>
        <IoMdArrowDropright />
      </Link>
    </div>
  );
};

export default SubHeader;
