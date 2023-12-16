import Icon from "./Icon";

const Header = ({ text, onClick, onClickDone, donetext }) => {
  return (
    <div className="flex  justify-between items-center">
      <button onClick={onClick}>
        <Icon name="close" size={24} />
      </button>

      <h5>{text}</h5>

      <button className=" flex text-primary font-medium" onClick={onClickDone}>
        {donetext}
      </button>
    </div>
  );
};

export default Header;
