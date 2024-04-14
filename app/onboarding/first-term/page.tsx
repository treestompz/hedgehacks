'use client'
import { DASHBOARD_PAGE_URL } from '@/app/utils/constants/page-url-constants'
import { useEffect, useState } from 'react'
import { Button, Spinner } from 'react-bootstrap'
import LayoutOnboarding from '../../components/layout/LayoutOnboarding'
import LINKDB from '../../utils/linkdb/linkdb-manager'

function FirstTerm() {
  const [term, setTerm] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [inputStyle, setInputStyle] = useState({})

  useEffect(() => {
    localStorage.setItem('hh_joyride_dashboard', 'true')
  }, [])

  const handleAdd = () => {
    if (!term) {
      setInputStyle({ border: '2px solid red' })
      setTimeout(() => setInputStyle({}), 2000)
      return
    }

    setIsLoading(true)
    LINKDB.createWithTermOnly(term)

    // fake delay to not startle user
    setTimeout(() => {
      window.location.href = DASHBOARD_PAGE_URL
    }, 1800)
  }

  return (
    <LayoutOnboarding>
      <div style={{ marginTop: '50px' }}>
        <div style={{ maxWidth: '600px' }} className="container h-100">
          <div className="row h-100 justify-content-center align-items-center">
            <div className="col-10">
              <div className="card">
                {isLoading ? (
                  <div className="card-body" style={{ textAlign: 'center' }}>
                    <span style={{ fontSize: '16px' }}>Loading...</span>
                    <br />
                    <br />
                    <Spinner
                      style={{
                        color: '#77b300',
                        width: '5rem',
                        height: '5rem',
                      }}
                      animation="border"
                      role="status"
                    ></Spinner>
                  </div>
                ) : (
                  <div className="card-body">
                    <h5 style={{ color: '#fff' }} className="card-title">
                      Create Your First Term
                    </h5>
                    <div className="form-group">
                      <label htmlFor="formGroupExampleInput">
                        Enter A Search Query To Track
                      </label>
                      <input
                        style={inputStyle}
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput"
                        placeholder="Example: iphone"
                        onChange={(e) => setTerm(e.target.value)}
                      />
                    </div>
                    <Button variant="success" onClick={handleAdd}>
                      Add
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutOnboarding>
  )
}

export default FirstTerm
