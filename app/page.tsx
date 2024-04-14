'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import './css/lib/launchaco/AllTemplates.css'
import './css/lib/launchaco/custom.css'
import './css/lib/launchaco/fonts.css'
import {
  DASHBOARD_PAGE_URL,
  ONBOARDING_FIRST_TERM_PAGE_URL,
} from './utils/constants/page-url-constants'
import LINKDB from './utils/linkdb/linkdb-manager'

const BROWSER_EXAMPLE_IMG = '/img/landing/gaming-headset-example.png'

const topCtaButtonStyle = {
  fontSize: '22px',
  backgroundColor: '#336bff',
  fontWeight: 600,
}

const bottomCtaButtonStyle = {
  fontSize: '22px',
  fontWeight: 600,
}

function LandingPage() {
  const [isNewUser, setIsNewUser] = useState(true)

  useEffect(() => {
    let groups = LINKDB.getAllGroups()
    if (groups.length > 0) {
      setIsNewUser(false)
    }
  }, [])

  const renderTopCtaLink = () => {
    if (isNewUser) {
      return (
        <Link
          href={ONBOARDING_FIRST_TERM_PAGE_URL}
          style={topCtaButtonStyle}
          className="button mobile-text-center mt10 launchaco-builder-hoverable mobile-text-center accent-bg primary-color"
        >
          <span> GET STARTED NOW </span>
        </Link>
      )
    } else {
      return (
        // TODO:
        // <Link
        //   href={DASHBOARD_PAGE_URL}
        //   style={topCtaButtonStyle}
        //   className="button mobile-text-center mt10 launchaco-builder-hoverable mobile-text-center accent-bg primary-color"
        // >
        //   <span> GO TO APP </span>
        // </Link>
        <a
          href={DASHBOARD_PAGE_URL}
          style={topCtaButtonStyle}
          className="button mobile-text-center mt10 launchaco-builder-hoverable mobile-text-center accent-bg primary-color"
        >
          <span> GO TO APP </span>
        </a>
      )
    }
  }

  const renderBottomCtaLink = () => {
    if (isNewUser) {
      return (
        <Link
          href={ONBOARDING_FIRST_TERM_PAGE_URL}
          style={bottomCtaButtonStyle}
          className="button mobile-text-center mt10 launchaco-builder-hoverable mobile-text-center accent-bg button__black"
        >
          <span> CLICK TO GET STARTED </span>
        </Link>
      )
    } else {
      return (
        // TODO:
        // <Link
        //   href={DASHBOARD_PAGE_URL}
        //   style={bottomCtaButtonStyle}
        //   className="button mobile-text-center mt10 launchaco-builder-hoverable mobile-text-center accent-bg button__black"
        // >
        //   <span> GO TO APP </span>
        // </Link>
        <a
          href={DASHBOARD_PAGE_URL}
          style={bottomCtaButtonStyle}
          className="button mobile-text-center mt10 launchaco-builder-hoverable mobile-text-center accent-bg button__black"
        >
          <span> GO TO APP </span>
        </a>
      )
    }
  }

  return (
    <div className="dashboard-page-pure">
      <div className="font-neutral">
        <div className="green-flat">
          <header className="header">
            <div className="container-lrg">
              <div className="flex col-12 spread">
                <a
                  target="#"
                  className="logo primary-color launchaco-builder-hoverable logo"
                >
                  hedgehacks
                </a>
                {!isNewUser && (
                  // TODO:
                  // <Link
                  //   href={DASHBOARD_PAGE_URL}
                  //   className="nav-link secondary-color mr0"
                  // >
                  //   Go To App
                  // </Link>
                  <a
                    href={DASHBOARD_PAGE_URL}
                    className="nav-link secondary-color mr0"
                  >
                    Go To App
                  </a>
                )}
              </div>
            </div>
          </header>
          <section className="section">
            <div className="container mb40">
              <div className="col-12 text-center">
                <h1 className="heading-lrg primary-color launchaco-builder-hoverable">
                  Use Search Data To Predict The Future 📈🚀
                </h1>
                <h2 className="subheading secondary-color mt20 launchaco-builder-hoverable font400bro">
                  hedgehacks helps you track GTrend search engine data to find
                  your next big trade or idea. And it&apos;s FREE!
                </h2>
                <div className="mt40">{renderTopCtaLink()}</div>
              </div>
            </div>
            <div className="container-lrg">
              <div className="col-12">
                <div className="browser mt75 launchaco-builder-hoverable">
                  <div className="mask">
                    <img
                      src={BROWSER_EXAMPLE_IMG}
                      alt="Screenshot of App in Browser"
                      className="mask-img"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <section
          id="cta-2"
          className="section custom-color-aad24f82-7035-2873-9da7-4d6f46295be6"
        >
          <div className="container text-center">
            <div className="col-12">
              <h4 className="heading-lrg primary-color launchaco-builder-hoverable">
                Find Your Next Trade Now!
              </h4>
              <div className="mt40">{renderBottomCtaLink()}</div>
            </div>
          </div>
        </section>

        <div className="col-12">
          <p className="secondary-color mt20 ">
            Nothing related to hedgehacks should be considered investment
            advice. The site is provided as-is and could have bugs. Do your own
            research and talk to your financial advisor.
          </p>
        </div>
      </div>
    </div>
  )
}
export default LandingPage
