'use client'
import { useState } from 'react'
import { Button } from 'react-bootstrap'
import LoggedInLayout from '../components/layout/LoggedInLayout'
import { DASHBOARD_PAGE_URL } from '../utils/constants/page-url-constants'
import LINKDB, { LINKDBGroup } from '../utils/linkdb/linkdb-manager'

const IMPORT_FILE_INPUT_CLASS = 'import-file-input'

export default function Backup() {
  const [isImportLoading, setIsImportLoading] = useState(false)
  const [isErrorShown, setIsErrorShown] = useState(false)

  const handleImportedJson = (json: LINKDBGroup[]) => {
    try {
      setIsImportLoading(true)
      localStorage.clear()
      json.forEach((group) => {
        group.links.forEach((link) => {
          LINKDB.create(group, link)
        })
      })

      window.location.href = DASHBOARD_PAGE_URL
    } catch (e) {
      console.error(e)
      setIsErrorShown(true)
    }
  }

  const downloadObjectAsJson = (exportObj: Object, exportName: string) => {
    const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(exportObj)
    )}`
    const downloadAnchorNode = document.createElement('a')
    downloadAnchorNode.setAttribute('href', dataStr)
    downloadAnchorNode.setAttribute('download', `${exportName}.json`)
    document.body.appendChild(downloadAnchorNode) // required for firefox
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
  }

  const onDownloadBackupClick = () => {
    const filename = `hedgehacks_backup_${new Date().getTime()}`
    const linkDBGroups = LINKDB.getAllGroups()
    downloadObjectAsJson(linkDBGroups, filename)
  }

  // const onResetClick = () => {
  //   if (
  //     window.confirm(
  //       'WARNING: This will reset all your data! You will lose all your GTrend terms. Create a Backup before doing this!'
  //     )
  //   ) {
  //     window.location.href = 'resetls'
  //   }
  // }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) {
      console.error('No file selected')
      setIsErrorShown(true)
      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      try {
        const result = reader.result as string
        const jsonObj = JSON.parse(result)
        handleImportedJson(jsonObj)
      } catch (error) {
        console.error('Error reading or parsing file:', error)
        setIsErrorShown(true)
      }
    }

    reader.onerror = () => {
      console.error('Error reading the file')
      setIsErrorShown(true)
    }

    reader.readAsText(file)
  }

  const onImportClick = () => {
    const warningMessage =
      'WARNING: Create Backup First! This will overwrite your current data. Are you sure you want to proceed?'
    if (!window.confirm(warningMessage)) {
      return
    }
    const fileInput = document.querySelector<HTMLInputElement>(
      `.${IMPORT_FILE_INPUT_CLASS}`
    )
    if (fileInput) {
      fileInput.click()
    } else {
      console.error('File input not found')
      setIsErrorShown(true)
    }
  }

  return (
    <LoggedInLayout>
      <div style={{ marginTop: '30px' }}>
        <h3>Why do I need to backup?</h3>
        <p className="lead">
          Since hedgehacks is in an alpha state, your GTrend links only save
          locally to your browser. Soon we will be adding user accounts with a
          proper backend, but for the time being, you can Backup/Import your
          data here.
        </p>
        <div className="row">
          <div className="col-md-6">
            <div className="card border-success mb-3">
              <div className="card-body">
                <h4 className="card-title">Create Backup</h4>
                <p className="card-text">
                  This will download a Backup file you can use to Import at any
                  time.
                  <br />
                  <br />
                  <Button onClick={onDownloadBackupClick} variant="success">
                    Download Backup File
                  </Button>
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card border-info mb-3">
              <div className="card-body">
                <h4 className="card-title">Import Backup</h4>
                <p className="card-text">
                  {isErrorShown ? (
                    <>
                      Unfortunately an unexpected error occurred while trying to
                      Import. Please ask for support on Discord.
                      <br />
                      Refresh the page to try again and make sure you are using
                      a valid backup file.
                    </>
                  ) : (
                    <>
                      Import a previous Backup. WARNING: Will override your
                      current data.
                      <br />
                      <br />
                      <Button onClick={onImportClick} variant="info">
                        {!isImportLoading ? 'Import Backup File' : 'Loading...'}
                      </Button>
                      <input
                        onChange={handleChange}
                        style={{ display: 'none' }}
                        className={IMPORT_FILE_INPUT_CLASS}
                        type="file"
                      />
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
          {/* <div className="col-md-4">
            <div className="card border-danger mb-3">
              <div className="card-body">
                <h4 className="card-title">Reset All Data</h4>
                <p className="card-text">
                  <Button onClick={onResetClick} variant="danger">
                    (WARNING!) Reset All Data
                  </Button>
                </p>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </LoggedInLayout>
  )
}
