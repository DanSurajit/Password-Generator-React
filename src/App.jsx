import { useEffect, useState } from "react";
import "./App.css";
import PasswordLengthSlider from "./components/PasswordLengthSlider";
import StrengthBar from "./components/StrengthBar";

const charsUppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const charsLowercase = "abcdefghijklmnopqrstuvwxyz";
const charsNumber = "0123456789";
const charsSymbol = "!@#$%^&*()_";

function App() {
  const [passwordLength, setPasswordLength] = useState(10);
  const [password, setPassword] = useState("PTx1f5DaFX");
  const [passwordStrength, setPasswordStrength] = useState("medium");
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);

  const generatePassword = () => {
    let chars = "";
    let pwordLength = passwordLength;
    let passwordString = "";

    if (uppercase) {
      chars += charsUppercase;
    }
    if (lowercase) {
      chars += charsLowercase;
    }
    if (numbers) {
      chars += charsNumber;
    }
    if (symbols) {
      chars += charsSymbol;
    }

    const array = new Uint32Array(chars.length);
    window.crypto.getRandomValues(array);

    for (let i = 0; i < pwordLength; i++) {
      passwordString += chars[array[i] % chars.length];
    }

    setPassword(passwordString);
    checkStrength();
  };

  const checkStrength = () => {
    const checkedNumber = [uppercase, lowercase, numbers, symbols].filter(
      (x) => x
    ).length;
    if (passwordLength <= 8) {
      setPasswordStrength("too-weak");
    }
    if (passwordLength >= 8 && passwordLength <= 10 && checkedNumber < 2) {
      setPasswordStrength("weak");
    }
    if (passwordLength > 10 && passwordLength < 15 && checkedNumber >= 2) {
      setPasswordStrength("medium");
    }
    if (passwordLength >= 15 && checkedNumber == 4) {
      setPasswordStrength("strong");
    }
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
  }

  useEffect(() => {
    const isValid = (uppercase || lowercase || numbers || symbols) && passwordLength
    setBtnDisabled(!isValid);
  }, [lowercase, uppercase, symbols, numbers, passwordLength]);

  return (
    <>
      <h3 className="title">Password Generator</h3>

      <div className="container">
        <div className="random-pass">
          <p className="heading-l pass-field">{password}</p>
          <a className="copy-btn" onClick={copyPassword}>
            <span className="copy-icon"></span>
          </a>
        </div>
        <div className="generator-container">
          <PasswordLengthSlider
            passwordLength={passwordLength}
            setPasswordLength={setPasswordLength}
          />
          <div className="checkbox-options">
            <div className="uppercase">
              <input
                type="checkbox"
                id="uppercase"
                name="uppercase"
                checked={uppercase}
                onChange={(e) => setUppercase(e.target.checked)}
              />
              <label htmlFor="uppercase" className="primary-text">
                Include Uppercase Letters
              </label>
            </div>
            <div className="lowercase">
              <input
                type="checkbox"
                id="lowercase"
                name="lowercase"
                checked={lowercase}
                onChange={(e) => setLowercase(e.target.checked)}
              />
              <label htmlFor="lowercase" className="primary-text">
                Include Lowercase Letters
              </label>
            </div>
            <div className="numbers">
              <input
                type="checkbox"
                id="numbers"
                name="numbers"
                checked={numbers}
                onChange={(e) => setNumbers(e.target.checked)}
              />
              <label htmlFor="numbers" className="primary-text">
                Include Numbers
              </label>
            </div>
            <div className="symbols">
              <input
                type="checkbox"
                id="symbols"
                name="symbols"
                checked={symbols}
                onChange={(e) => setSymbols(e.target.checked)}
              />
              <label htmlFor="symbols" className="primary-text">
                Include Symbols
              </label>
            </div>
          </div>
          <StrengthBar passwordStrength={passwordStrength} />
          <div className="generate-btn">
            <button
              className={`btn primary-text ${btnDisabled ? "disabled" : ""}`}
              disabled={btnDisabled}
              onClick={generatePassword}
            >
              generate<span className="right-arrow"></span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
