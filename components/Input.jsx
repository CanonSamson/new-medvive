const Input = ({
    label,
    style,
    InputStyle,
    name,
    Error,
    type,
    ...inputProps
  }) => {
    return (
      <div
        className={`  flex flex-col relative justify-end ${style} w-full text-[14px]`}
      >
        {label && <label className=" text-base font-medium">{label}</label>}
  
        <div className=" flex items-center bg-white text-[#858585] h-[45px] border rounded-lg gap-4 px-4">
          <input
            {...inputProps}
            type={type}
            className=" focus:outline-none flex-1  text-base"
          />
        </div>
        {Error && (
          <span className=" text-red-700  bottom-[-20px] text-[10px] ">
            {Error}
          </span>
        )}
      </div>
    );
  };
  
  export default Input;