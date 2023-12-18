import Icon from "@/components/Icon";

const SearchInput = ({ placeholder }) => {
  return (
    <div className=" relative gap-4 z-20 flex justify-between h-[50px] text-[#979595] bg-[#F6F6F6] border-[#D9D9D9] px-2 mt-[10px] items-center border rounded-md ">
      <Icon name="search" size={24} />

      <input
        className=" flex-1 text-base  h-[42px] bg-transparent focus:outline-none"
        type="text"
        placeholder={placeholder ? placeholder : "Search Doctors..."}
      />
      <Icon name="filter" size={24} />
    </div>
  );
};

export default SearchInput;
