
import PropTypes from "prop-types";

const IconButton = ({ children, onClick, className, style, disabled }) => {
  return (
    <button
      className={`w-10 h-10 flex justify-center items-center rounded-full focus:outline-none   transition-all ${
        disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
      } ${className}`}
      onClick={onClick}
      style={style}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

IconButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
  disabled: PropTypes.bool,
};

export default IconButton;
