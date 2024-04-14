import {
  FIXED_YEAR_MAP,
  TIME_RANGE_MAP,
} from '../../utils/constants/gtrend-constants'
import LINKDB, {
  LINKDBGroup,
  LINKDBLink,
} from '../../utils/linkdb/linkdb-manager'

interface Props {
  group: LINKDBGroup
  link: LINKDBLink
  refreshAllGroups(): void
}

function LinkCard({ link, group, refreshAllGroups }: Props) {
  const onDeleteClick = () => {
    LINKDB.deleteLink(group, link)
    refreshAllGroups()
  }

  // NOTE: Needs check because will error
  // not just render '' like others
  const renderTimeRanges = (link: LINKDBLink) => {
    try {
      let trs = []
      for (let i = 0; i < link.timeRanges.length; i++) {
        let timeRange = link.timeRanges[i]
        if (link.type === 'yearoverlap') {
          trs.push(FIXED_YEAR_MAP.get(timeRange).display)
        } else {
          trs.push(TIME_RANGE_MAP.get(timeRange).display)
        }
      }

      return trs.join(', ')
    } catch (e) {
      console.error(e)
      return 'Error'
    }
  }

  return (
    <div className="col-md-12" style={{ paddingBottom: '8px' }}>
      <div className="card" style={{ borderColor: `rgba(119, 179, 0, .6)` }}>
        <div className="card-body">
          <div className="row">
            <div className="col-md-2" style={{ fontSize: '13px' }}>
              {link.updatedDate}
            </div>
            <div
              className="col-md-2 dashboard-joyride-term"
              style={{ color: '#fff' }}
            >
              <strong>{link.terms.join(', ')}</strong>
            </div>
            <div className="col-md-2">{link.locations.join(', ')}</div>
            <div className="col-md-2">{renderTimeRanges(link)}</div>

            <div className="col-md-4">
              <div
                className="btn-group"
                role="group"
                aria-label="Basic example"
              >
                <a
                  className="btn btn-secondary dashboard-joyride-gtrends-button"
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open GTrends <i className="bi-arrow-up-right-square"></i>
                </a>

                <button onClick={onDeleteClick} className="btn btn-secondary">
                  Delete <i className="bi bi-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LinkCard
