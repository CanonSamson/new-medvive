import Icon from "./Icon";
const Button = ({ text, isSubmit, ...props }) => {
  return (
    <button
      disable={isSubmit ? true : false}
      className="w-full active:border  active:bg-transparent active:scale-95 hover:border  hover:bg-transparent hover:scale-95 duration-500 active:border-primary
       hover:border-primary  hover:text-primary active:text-primary rounded-full  bg-primary  
      text-[14px] items-center flex justify-center h-[45px] text-white  font-medium"
      {...props}
    >
      {isSubmit ? (
        <Icon name="loading" size={20} className=" animate-spin" />
      ) : (
        `${text}`
      )}
    </button>
  );
};

export default Button;
