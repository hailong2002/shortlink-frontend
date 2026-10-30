import { useTheme } from '../../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';
import './ThemeToggle.css';

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      className="theme-toggle-btn"
      onClick={toggleTheme}
      title={isDark ? 'Chuyển sang chế độ sáng (Light Mode)' : 'Chuyển sang chế độ tối (Dark Mode)'}
      aria-label="Toggle dark/light mode"
    >
      <div className={`theme-toggle-icon ${isDark ? 'is-dark' : 'is-light'}`}>
        {isDark ? (
          <FiSun className="sun-icon" size={19} />
        ) : (
          <FiMoon className="moon-icon" size={19} />
        )}
      </div>
    </button>
  );
}

export default ThemeToggle;
