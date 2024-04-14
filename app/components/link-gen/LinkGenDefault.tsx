import { JSX, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { TIME_RANGE_MAP } from '../../utils/constants/gtrend-constants'
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

export interface DefaultFormInputs {
  term1: string
  term2: string
  term3: string
  term4: string
  term5: string
  location: string
  timerange: string
  preset: string
  groupname: string
}

export const getDefaultTermsArray = (data: DefaultFormInputs): string[] => {
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

export default function LinkGenDefault({
  refreshAllGroups,
  onReadyToClose,
  prepopulatedGroupName,
}: Props) {
  const labelStyle = {
    color: '#fff',
    fontSize: '16px',
  }

  const [termFormCounter, setTermFormCounter] = useState(1)
  const { register, handleSubmit, control, reset } =
    useForm<DefaultFormInputs>()

  const onAddAnotherTermClick = () => {
    setTermFormCounter(termFormCounter + 1)
  }

  const onSubmit = (data: DefaultFormInputs) => {
    let terms = getDefaultTermsArray(data)

    if (terms.length === 0) {
      return alert('Please add at least one term to proceed.')
    }

    let locations = [data.location]
    let timeRanges = [data.timerange]
    let url = buildGTrendPageLink(terms, locations, timeRanges, null)
    let groupName = data.groupname ? data.groupname : terms[0]
    let updatedDate = new Date().toLocaleString()

    let groupObj: UncreatedLINKDBGroup = {
      name: groupName,
      updatedDate,
    }

    let linkObj: LINKDBLink = {
      terms,
      locations,
      timeRanges,
      updatedDate,
      url,
    }

    LINKDB.create(groupObj, linkObj)

    onReadyToClose()
    reset()
    refreshAllGroups()
  }

  const renderTimeRangeMapOptions = () => {
    let o: JSX.Element[] = []

    TIME_RANGE_MAP.forEach((obj, k) => {
      o.push(
        <option key={k} value={k}>
          {obj.display}
        </option>
      )
    })

    return o
  }

  const renderTermForms = () => {
    let f = []

    for (let i = 2; i <= termFormCounter; i++) {
      f.push(
        <Row key={i}>
          <Form.Group as={Col} md={4} controlId="formGridEmail">
            <Form.Label style={labelStyle}>GTrend Term #{i}</Form.Label>
            <Form.Control
              // @ts-ignore
              {...register(`term${i}`)}
              type="text"
            />
          </Form.Group>
        </Row>
      )
    }

    return f
  }

  const renderForm = () => {
    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label style={labelStyle}>GTrend Term</Form.Label>
            <Form.Control
              {...register('term1')}
              type="text"
              placeholder="Ex: flights to cancun"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label style={labelStyle}>Location</Form.Label>
            <Form.Control {...register('location')} as="select" defaultValue="">
              <option>Worldwide</option>
              <option>US</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label style={labelStyle}>Time Range</Form.Label>
            <Form.Control
              {...register('timerange')}
              as="select"
              defaultValue=""
            >
              {renderTimeRangeMapOptions()}
            </Form.Control>
          </Form.Group>
        </Row>
        {renderTermForms()}
        {termFormCounter <= 4 && (
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
      <p>
        Add a new GTrend link to track. Links are more than just terms. You can
        customize the location, time range, and even use presets to do advanced
        year-over-year comparisons.
      </p>

      <div>
        Your Live Link: <LiveLinkPreview control={control} />
      </div>

      <br />

      {renderForm()}
    </>
  )
}
