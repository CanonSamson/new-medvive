import { useState } from "react";
import { CiMail } from "react-icons/ci";
import { BiLockAlt } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";
import Icon from "./Icon";

const InputField = ({
  label,
  style,
  InputStyle,
  name,
  Error,
  type,
  required,
  ...inputProps
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div
      className={`  flex flex-col relative justify-end ${style} w-full text-[14px]`}
    >
      <div
        className={` ${
          type === "password" && "flex justify-between items-center"
        } `}
      >
        {label && (
          <label className="  text-start flex text-base font-medium">
            {label} {required && <span className=" text-red-600">*</span>}
          </label>
        )}
      </div>

      <div className="  text-base flex items-center bg-white text-[#858585] h-[45px] border rounded-full gap-4 px-4">
        {(name === "gmail" && <CiMail size={20} />) ||
          (name === "password" && <BiLockAlt size={20} />) ||
          (name === "userName" && <BsPerson size={20} />)}
        <input
          // Set the input properties using the spread operator
          {...inputProps}
          // Show password as plain text if showPassword is true, else show as the input type
          type={showPassword ? "text" : type}
          // Apply the input style classes
          className=" focus:outline-none flex-1"
        />

        {/* Render a div that toggles the password visibility when clicked
 if the input type is password */}
        {type === "password" && (
          <div
            onClick={() => setShowPassword(!showPassword)}
            className="flex items-center  gap-1"
          >
            {showPassword ? (
              <Icon name="Eye" size={20} />
            ) : (
              <Icon name="EyeInvisible" size={20} />
            )}
          </div>
        )}
      </div>
      {Error && (
        <span className=" text-red-700  bottom-[-20px] text-[10px] ">
          {Error}
        </span>
      )}
    </div>
  );
};

export default InputField;
