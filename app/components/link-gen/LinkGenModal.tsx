import { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { LINKDBLinkSpecialType } from '../../utils/linkdb/linkdb-manager'
import LinkGenBody from './LinkGenDefault'
import LinkGenYearOverlap from './LinkGenYearOverlap'

interface Props {
  refreshAllGroups(): void
  // defaults to 'md' as per react-bootstrap
  openButtonSize?: 'sm' | 'lg'
  openButtonText: string
  prepopulatedGroupName?: string
}

function LinkGenModal({
  refreshAllGroups,
  openButtonSize,
  openButtonText,
  prepopulatedGroupName,
}: Props) {
  const [show, setShow] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [specialTypeView, setSpecialTypeView] =
    useState<LINKDBLinkSpecialType | null>(null)

  const handleClose = () => setShow(false)
  const handleShow = () => {
    setShowAdvanced(false)
    setSpecialTypeView(null)
    setShow(true)
  }
  const handleAdd = () => {
    document.getElementById('hidden-lgm-submit')!.click()
  }

  const onReadyToClose = () => {
    setShow(false)
  }

  const renderModalBody = () => {
    if (!specialTypeView && !showAdvanced) {
      return (
        <LinkGenBody
          refreshAllGroups={refreshAllGroups}
          onReadyToClose={onReadyToClose}
          prepopulatedGroupName={prepopulatedGroupName}
        />
      )
    }

    return (
      <LinkGenYearOverlap
        refreshAllGroups={refreshAllGroups}
        onReadyToClose={onReadyToClose}
        prepopulatedGroupName={prepopulatedGroupName}
      />
    )
  }

  return (
    <>
      <Button size={openButtonSize} variant="success" onClick={handleShow}>
        {openButtonText}
      </Button>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New GTrend Link</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {renderModalBody()}
          <Button
            variant="secondary"
            onClick={() => setShowAdvanced(!showAdvanced)}
            style={{ marginTop: '10px' }}
          >
            {showAdvanced ? 'Back To Default View' : 'Show Advanced'}
          </Button>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleAdd}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default LinkGenModal
