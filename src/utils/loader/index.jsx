import './style.css';
function Loader({ disabled }) {
  if (disabled) {
    return (
      <div className=" z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="lds-spinner">
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    );
  }
}

export default Loader;
