import PropTypes from "prop-types";

function PasswordLengthSlider({ passwordLength, setPasswordLength }) {
  return (
    <>
      <div className="char-length">
        <p className="primary-text">Character Length</p>
        <p className="current-length heading-l text-green">{passwordLength}</p>
      </div>
      <div className="slider-container">
        <input
          type="range"
          min="1"
          max="20"
          value={passwordLength}
          className="slider"
          onChange={(e) => setPasswordLength(parseInt(e.target.value))}
        />
      </div>
    </>
  );
}

PasswordLengthSlider.propTypes = {
  passwordLength: PropTypes.number.isRequired,
  setPasswordLength: PropTypes.func.isRequired,
};

export default PasswordLengthSlider;
