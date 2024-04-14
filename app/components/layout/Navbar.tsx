import { DASHBOARD_PAGE_URL } from '@/app/utils/constants/page-url-constants'
import Link from 'next/link'
import { DISCORD_INFINITE_INVITE_URL } from '../../utils/constants/discord-constants'
import { GITHUB_REPO_URL } from '../../utils/constants/github-constants'

function Navbar() {
  return (
    <div className="container" style={{ marginTop: '30px' }}>
      {' '}
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <Link
          href="/"
          style={{ fontSize: '1.2rem', marginRight: '30px' }}
          className="navbar-brand"
        >
          hedgehacks
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link href={DASHBOARD_PAGE_URL} className="nav-link">
                Dashboard
                <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/backup" className="nav-link">
                Backup Data
              </Link>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href={DISCORD_INFINITE_INVITE_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Join Discord <i className="bi bi-discord" />
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href={GITHUB_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub Repo <i className="bi bi-github" />
              </a>
            </li>
            {/* <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                data-toggle="dropdown"
                href="#"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <div className="dropdown-menu">
                <a className="dropdown-item" href="#">
                  Action
                </a>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">
                  Separated link
                </a>
              </div>
            </li> */}
          </ul>
          {/* <form className="form-inline my-2 my-lg-0">
            <button className="btn btn-secondary my-2 my-sm-0" type="submit">
              Search
            </button>
          </form> */}
        </div>
      </nav>
    </div>
  )
}
export default Navbar
