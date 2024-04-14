import { useState } from 'react'
import { Accordion, Button, Card } from 'react-bootstrap'
import LINKDB, { LINKDBGroup } from '../../utils/linkdb/linkdb-manager'
import LinkGenModal from '../link-gen/LinkGenModal'
import GroupLinkCard from './GroupLinkCard'

interface GroupAccordionProps {
  group: LINKDBGroup
  refreshAllGroups(): void
}

function GroupAccordion({ group, refreshAllGroups }: GroupAccordionProps) {
  const [activeKey, setActiveKey] = useState<string | null>('0')

  const onDeleteClick = () => {
    let msg = `Are you sure you want to delete the "${group.name}" group?`
    if (!window.confirm(msg)) return

    LINKDB.deleteGroup(group)
    refreshAllGroups()
  }

  const toggleAccordion = () => {
    if (activeKey === '0') {
      setActiveKey(null)
    } else {
      setActiveKey('0')
    }
  }

  return (
    <div className="col-md-12" style={{ paddingBottom: '15px' }}>
      <Accordion activeKey={activeKey}>
        <Card>
          <Card.Header>
            <div>
              <div
                style={{
                  fontSize: '20px',
                  color: '#fff',
                  paddingBottom: '5px',
                }}
              >
                <span style={{ color: '#adafae' }}>Group:</span> {group.name} (
                {group.links.length})
              </div>
              <Button variant="light" onClick={toggleAccordion}>
                Minimize Group
              </Button>
              <LinkGenModal
                openButtonText="Add New GTrend Term To Group"
                refreshAllGroups={refreshAllGroups}
                prepopulatedGroupName={group.name}
              />
              <Button variant="light" onClick={onDeleteClick}>
                Delete Group
              </Button>
            </div>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <div className="row">
                {group.links.map((link) => (
                  <GroupLinkCard
                    key={link.url}
                    group={group}
                    link={link}
                    refreshAllGroups={refreshAllGroups}
                  />
                ))}
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  )
}

export default GroupAccordion
