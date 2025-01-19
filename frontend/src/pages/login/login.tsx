import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import './login.css';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [hintMessage, setHintMessage] = useState<string>('');
  const [gameMessage, setGameMessage] = useState<string>(''); // For game-like success message
  const [fireworksVisible, setFireworksVisible] = useState<boolean>(false); // For controlling fireworks effect visibility
  const [isStarted, setIsStarted] = useState<boolean>(false); // For showing the "Press to Start" screen
  const [showPassword, setShowPassword] = useState<boolean>(false); // For toggling password visibility

  // แฮชรหัสผ่านล่วงหน้าสำหรับตรวจสอบ
  const correctPasswordHash = CryptoJS.SHA256(
    '01000101010011100100011100110010001100110010000000110100001100000011010000110001'
  ).toString();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // แฮชรหัสผ่านที่ผู้ใช้ป้อนและตรวจสอบเทียบกับแฮชที่เก็บไว้
    const userPasswordHash = CryptoJS.SHA256(password).toString();
    if (userPasswordHash === correctPasswordHash) {
      onLogin();
      setGameMessage('Congratulations, you have successfully logged in! 🎉');
      setFireworksVisible(true); // Trigger the fireworks effect
    } else {
      setErrorMessage('Invalid credentials');
    }
  };

  const handleHintRequest = () => {
    setHintMessage('Hint: ลองคลุมหน้าเว็ปแล้วแปลงรหัสที่ได้เป็นเลขฐาน2');
  };

  const startGame = () => {
    setIsStarted(true);
  };

  return (
    <>
      <h1 style={{ color: 'white', textAlign: 'center' }}>ENG23 4041</h1>
      <div className="login-container">
        {!isStarted ? (
          // Show the "Press to Start" button if the game hasn't started yet
          <div className="start-screen">
            <h1>Welcome! Ready to Play?</h1>
            <button className="start-btn" onClick={startGame}>
              Press to Start
            </button>
          </div>
        ) : (
          // Show the login form if the game has started
          <>
            <h2>Find Password This Page</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-field"  style={{display:"flex"}}>
                <input
                  type={showPassword ? 'text' : 'password'} // Toggle between 'text' and 'password'
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password is range 0,1"
                  required
                  className="input"
                />
                <button
                  type="button"
                  className="toggle-password-btn"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? 'Hide Password' : 'Show Password'}
                </button>
              </div>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <div>
                <button type="submit" className="submit-btn">
                  Login
                </button>
              </div>
            </form>

            {/* Show hint message */}
            <div className="hint-section">
              {hintMessage && <p className="hint-message">{hintMessage}</p>}
              <button onClick={handleHintRequest} className="hint-btn">
                Need a Hint?
              </button>
            </div>

            {/* Show the game success message after successful login */}
            {gameMessage && <div className="game-success-message">{gameMessage}</div>}

            {/* Fireworks Effect */}
            {fireworksVisible && (
              <div className="fireworks-container">
                <div className="confetti confetti-1"></div>
                <div className="confetti confetti-2"></div>
                <div className="confetti confetti-3"></div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default LoginPage;
