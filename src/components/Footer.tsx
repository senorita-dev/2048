import '../css/Footer.css'
import githubMark from '../assets/github-mark.svg'

const Footer = () => {
  return (
    <footer id="footer">
      <p>
        <kbd className="key">&uarr;</kbd> <kbd className="key">&darr;</kbd> <kbd className="key">&larr;</kbd>{' '}
        <kbd className="key">&rarr;</kbd> - use the arrow keys, buttons, or swipe to play
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
