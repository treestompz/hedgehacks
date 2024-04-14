import {
  DISCORD_INFINITE_INVITE_URL,
  DUMB_MONEY_DISCORD_URL,
} from '../../utils/constants/discord-constants'
import { GITHUB_REPO_URL } from '../../utils/constants/github-constants'
import { CURRENT_VERSION } from '../../utils/constants/version-constants'

function Footer() {
  return (
    <footer
      style={{ borderTop: '1px solid #282828' }}
      className="pt-4 my-md-5 pt-md-5 "
    >
      <div className="container">
        <div className="row">
          <div className="col-12 col-md">
            <h5>hedgehacks</h5>
            <small className="d-block mb-3 text-muted">
              v{CURRENT_VERSION}
            </small>
          </div>
          <div className="col-6 col-md">
            <h5>Discord</h5>
            <ul className="list-unstyled text-small">
              <li>
                <a
                  className="link-secondary"
                  href={DISCORD_INFINITE_INVITE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  hedgehacks Discord
                </a>
              </li>
              <li>
                <a
                  className="link-secondary"
                  href={DUMB_MONEY_DISCORD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Dumb Money Discord
                </a>
              </li>
            </ul>
          </div>
          <div className="col-6 col-md">
            <h5>GitHub</h5>
            <ul className="list-unstyled text-small">
              <li>
                <a
                  className="link-secondary"
                  href={GITHUB_REPO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub Repo
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
export default Footer
