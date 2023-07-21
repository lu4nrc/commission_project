import "./style.css";
const Loader = ({ disabled }) => {
  if (disabled) {
    return (
      <div className=" z-10 absolute w-full h-full">
        <div className="flex h-full justify-center items-center ">
          <div className="lds-spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    );
  }
};

export default Loader;
