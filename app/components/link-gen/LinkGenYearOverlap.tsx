import { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { FIXED_YEAR_MAP } from '../../utils/constants/gtrend-constants'
import { buildGTrendPageLink } from '../../utils/link-builders/gtrends-link-builder'
import LINKDB, {
  LINKDBLink,
  UncreatedLINKDBGroup,
} from '../../utils/linkdb/linkdb-manager'
import LiveLinkPreview from './LiveLinkPreview'

interface Props {
  refreshAllGroups(): void
  onReadyToClose(): void
  prepopulatedGroupName: string | undefined
}

export interface YearOverlapFormInputs {
  term1: string
  term2: string
  term3: string
  term4: string
  term5: string
  location1: string
  location2: string
  location3: string
  location4: string
  location5: string
  timerange1: string
  timerange2: string
  timerange3: string
  timerange4: string
  timerange5: string
  preset: string
  groupname: string
}

export const getYearOverlapTermsArray = (
  data: YearOverlapFormInputs
): string[] => {
  let term1 = data.term1
  let term2 = data.term2
  let term3 = data.term3
  let term4 = data.term4
  let term5 = data.term5

  let arr: string[] = []
  if (term1) arr.push(term1)
  if (term2) arr.push(term2)
  if (term3) arr.push(term3)
  if (term4) arr.push(term4)
  if (term5) arr.push(term5)

  return arr
}

const addIfNotNullAndNotUndefined = (arr: any, v: any) => {
  if (v !== undefined && v !== null) {
    arr.push(v)
  }
}

export const getYearOverlapLocationsArray = (
  data: YearOverlapFormInputs
): string[] => {
  let arr: string[] = []
  addIfNotNullAndNotUndefined(arr, data.location1)
  addIfNotNullAndNotUndefined(arr, data.location2)
  addIfNotNullAndNotUndefined(arr, data.location3)
  addIfNotNullAndNotUndefined(arr, data.location4)
  addIfNotNullAndNotUndefined(arr, data.location5)

  return arr
}

export const getYearOverlapTimeRangesArray = (
  data: YearOverlapFormInputs
): string[] => {
  let arr: string[] = []
  addIfNotNullAndNotUndefined(arr, data.timerange1)
  addIfNotNullAndNotUndefined(arr, data.timerange2)
  addIfNotNullAndNotUndefined(arr, data.timerange3)
  addIfNotNullAndNotUndefined(arr, data.timerange4)
  addIfNotNullAndNotUndefined(arr, data.timerange5)

  return arr
}
function LinkGenYearOverlap({
  refreshAllGroups,
  onReadyToClose,
  prepopulatedGroupName,
}: Props) {
  const labelStyle = {
    color: '#fff',
    fontSize: '16px',
  }

  const [rowCounter, setRowCounter] = useState(2)
  const { register, handleSubmit, control, reset } =
    useForm<YearOverlapFormInputs>()

  const onAddAnotherTermClick = () => {
    console.log('onAddAnotherTermClick')
    setRowCounter(rowCounter + 1)
  }

  const onSubmit = (data: YearOverlapFormInputs) => {
    let terms = getYearOverlapTermsArray(data)

    if (terms.length <= 1) {
      return console.log('onSubmit cancelled because terms 0.')
    }

    let locations = getYearOverlapLocationsArray(data)
    let timeRanges = getYearOverlapTimeRangesArray(data)

    let url = buildGTrendPageLink(terms, locations, timeRanges, 'yearoverlap')

    let groupName = data.groupname ? data.groupname : terms[0]
    let updatedDate = new Date().toLocaleString()

    let groupObj: UncreatedLINKDBGroup = {
      name: groupName,
      updatedDate,
    }

    let linkObj: LINKDBLink = {
      type: 'yearoverlap',
      terms,
      locations,
      timeRanges,
      updatedDate,
      url,
    }

    console.log(linkObj)

    // make call to LINKDB
    LINKDB.create(groupObj, linkObj)

    onReadyToClose()
    reset()
    refreshAllGroups()
  }

  const renderFixedYearMapOptions = () => {
    let o: JSX.Element[] = []

    FIXED_YEAR_MAP.forEach((obj, k) => {
      o.push(
        <option key={k} value={k}>
          {obj.display}
        </option>
      )
    })

    return o
  }

  const getDefaultValueForYear = (i: number): string => {
    try {
      return Array.from(FIXED_YEAR_MAP)[i - 1][0]
    } catch (e) {
      console.error(e)
      return ''
    }
  }

  const renderFormRows = () => {
    let f = []

    for (let i = 1; i <= rowCounter; i++) {
      f.push(
        <Row key={i}>
          <Form.Group as={Col} md={4} controlId="formGridEmail">
            <Form.Label style={labelStyle}>GTrend Term #{i}</Form.Label>
            <Form.Control
              // @ts-ignore
              {...register(`term${i}`)}
              type="text"
              placeholder="Ex: flights to cancun"
            />
          </Form.Group>

          <Form.Group as={Col} md={4} controlId="formGridState">
            <Form.Label style={labelStyle}>Location</Form.Label>
            <Form.Control
              // @ts-ignore
              {...register(`location${i}`)}
              as="select"
              defaultValue=""
            >
              <option>Worldwide</option>
              <option>US</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label style={labelStyle}>Year (Fixed)</Form.Label>
            <Form.Control
              //@ts-ignore
              {...register(`timerange${i}`)}
              as="select"
              defaultValue={getDefaultValueForYear(i)}
            >
              {renderFixedYearMapOptions()}
            </Form.Control>
          </Form.Group>
        </Row>
      )
    }

    return f
  }

  const renderForm = () => {
    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        {renderFormRows()}
        {rowCounter <= 4 && (
          <div
            onClick={onAddAnotherTermClick}
            style={{
              cursor: 'pointer',
              color: '#2a9fd6',
              textDecoration: 'none',
              paddingLeft: '20px',
              fontSize: '16px',
            }}
          >
            + Add Another Term To Compare
          </div>
        )}
        <br />
        <br />
        <Row>
          <Form.Group as={Col} md={4} controlId="formGridEmail">
            <Form.Label style={labelStyle}>Group Name</Form.Label>
            <Form.Control
              {...register('groupname')}
              type="text"
              placeholder=""
              defaultValue={prepopulatedGroupName ? prepopulatedGroupName : ''}
            />
          </Form.Group>
        </Row>
        <input
          style={{ display: 'none' }}
          type="submit"
          id="hidden-lgm-submit"
        />
      </Form>
    )
  }

  return (
    <>
      <p style={{ marginBottom: '2px', fontSize: '18px', color: '#fff' }}>
        Advanced Year-Over-Year Link
      </p>
      <p>
        You are building an Advanced link that acts as a Year-over-Year chart.
        Each year will be a line. This makes it easier to see changes year to
        year.
      </p>
      <p>
        The Time Range must be the same for all, but you can change the term and
        location.
      </p>

      <div>
        Your Live Link:{' '}
        <LiveLinkPreview control={control} specialType={'yearoverlap'} />
      </div>

      <br />

      {renderForm()}
    </>
  )
}

export default LinkGenYearOverlap
