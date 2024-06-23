import '../css/Footer.css'
import githubMark from '../assets/github-mark.svg'

const Footer = () => {
  return (
    <footer id="footer">
      <p>
        <kbd className="key">↑</kbd> <kbd className="key">↓</kbd> <kbd className="key">←</kbd>{' '}
        <kbd className="key">→</kbd> - use the arrow keys, buttons, or swipe to play
      </p>
      <a
        href="https://github.com/senorita-dev/2048"
        target="_blank"
        rel="noopener noreferrer"
        id="github"
      >
        <img src={githubMark} alt="github" />
        github
      </a>
    </footer>
  )
}

export default Footer
