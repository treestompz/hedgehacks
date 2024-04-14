'use client'
import { useEffect, useState } from 'react'
import GroupAccordion from '../components/group/GroupAccordion'
import DashboardJoyride from '../components/joyride/DashboardJoyride'
import LoggedInLayout from '../components/layout/LoggedInLayout'
import LinkGenModal from '../components/link-gen/LinkGenModal'
import LINKDB, { LINKDBGroup } from '../utils/linkdb/linkdb-manager'
import dashboardStyles from './dashboard.module.css'

function DashboardPage() {
  const [groups, setGroups] = useState<LINKDBGroup[]>([])
  const [isDashboardJoyrideEnabled, setIsDashboardJoyrideEnabled] =
    useState(false)

  useEffect(() => {
    localStorage.setItem('hedgehackslsversion', '0.0.0.2')
    refreshAllGroups()
  }, [])

  useEffect(() => {
    // only run if localstorage set
    const key = 'hh_joyride_dashboard'
    const raw = localStorage.getItem(key)
    if (raw) {
      localStorage.removeItem(key)
      let isLsJoyride = JSON.parse(raw)
      if (isLsJoyride === true) {
        setIsDashboardJoyrideEnabled(true)
      }
    }
  }, [])

  const refreshAllGroups = () => {
    let groups = LINKDB.getAllGroups()
    setGroups(groups)
  }

  const renderManageSection = () => {
    return (
      <div style={{ marginBottom: '30px' }} className="col-md-6 mx-auto">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Manage GTrends Terms</h5>
            <div className="row">
              <div
                className="col-md-6 dashboard-joyride-add-term-button"
                style={{
                  borderRight: '1px solid #fff',
                  padding: '10px 20px',
                }}
              >
                <LinkGenModal
                  openButtonText="Add New GTrend Term"
                  openButtonSize="lg"
                  refreshAllGroups={refreshAllGroups}
                />
              </div>

              <div
                className="col-md-6"
                style={{
                  borderLeft: '1px solid #fff',
                  padding: '10px 20px',
                }}
              >
                <div
                  style={{ color: '#fff', fontSize: '19px', marginTop: '3px' }}
                >
                  <p>
                    Total: <strong>{groups.length}</strong> Groups
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <LoggedInLayout>
      <div style={{ marginTop: '30px' }}>
        <h1 style={{ fontSize: '40px' }}>
          hedgehacks
          <small className="text-muted">
            {' '}
            for the DumbMoney{' '}
            <img
              style={{ marginTop: '-10px' }}
              width="45"
              alt="Dumb Money Logo"
              src="/img/dumbmoney.png"
            />{' '}
            community
          </small>
        </h1>

        <p>
          <i>
            Nothing related to hedgehacks should be considered investment
            advice. The site is provided as-is and could have bugs. Do your own
            research and talk to your financial advisor.
          </i>
        </p>

        <br />

        {renderManageSection()}

        <div style={{ border: '1px solid #fff', marginBottom: '30px' }}></div>

        <div className={dashboardStyles.tableCardHeaders}>
          <div className="row" style={{ fontSize: '18px', fontWeight: 600 }}>
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-2">Last Updated</div>
                    <div className="col-md-2">Term</div>
                    <div className="col-md-2">Location</div>
                    <div className="col-md-2">Time Range</div>
                    <div className="col-md-4">Manage</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <br />

        <div className="row">
          {groups.map((group) => (
            <GroupAccordion
              key={group.name}
              group={group}
              refreshAllGroups={refreshAllGroups}
            />
          ))}
        </div>

        <DashboardJoyride enabled={isDashboardJoyrideEnabled} />
      </div>
    </LoggedInLayout>
  )
}

export default DashboardPage
