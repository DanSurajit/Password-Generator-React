import PropTypes from "prop-types";

function StrengthBar({ passwordStrength }) {
  const getBarClassName = (barNo) => {
    switch (passwordStrength) {
      case "too-weak":
        return barNo <= 1 ? "bar too-weak" : "bar";
      case "weak":
        return barNo <= 2 ? "bar weak" : "bar";
      case "medium":
        return barNo <= 3 ? "bar medium" : "bar";
      case "strong":
        return barNo <= 4 ? "bar strong" : "bar";
    }
  };
  return (
    <div className="strength-container">
      <p className="primary-text strength-color">STRENGTH</p>
      <div className="strength-indicator-container">
        <span className="password-strength-text heading-m">
          {passwordStrength}
        </span>
        <div className="strength-indicator-bar">
          <div className={getBarClassName(1)}></div>
          <div className={getBarClassName(2)}></div>
          <div className={getBarClassName(3)}></div>
          <div className={getBarClassName(4)}></div>
        </div>
      </div>
    </div>
  );
}

StrengthBar.propTypes = {
  passwordStrength: PropTypes.oneOf(["too-weak", "weak", "medium", "strong"]).isRequired,
};

export default StrengthBar;
