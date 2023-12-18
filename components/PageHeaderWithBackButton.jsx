import { useRouter } from "next/navigation";
import Icon from "./Icon";

const PageHeaderWithBackButton = ({ href, text, Children, onClick }) => {
  const router = useRouter("");
  return (
    <div>
      <div className=" fixed z-40 top-0 bg-brandwhite w-full right-0">
        <div className="flex justify-between items-center pb-2 mt-5 px-2">
          <div className="flex gap-2 items-center">
            <button onClick={() => (href ? router.push(href) : onClick())}>
              <Icon name="backarrow" size={24} />
            </button>
            <h5 className=" text-xl font-semibold">{text}</h5>
          </div>
        </div>
      </div>
      <div className="mt-[70px]">{Children}</div>
    </div>
  );
};

export default PageHeaderWithBackButton;
