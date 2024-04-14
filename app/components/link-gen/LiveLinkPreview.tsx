import { Control, FieldValues, useWatch } from 'react-hook-form'
import { buildGTrendPageLink } from '../../utils/link-builders/gtrends-link-builder'
import { LINKDBLinkSpecialType } from '../../utils/linkdb/linkdb-manager'
import { DefaultFormInputs, getDefaultTermsArray } from './LinkGenDefault'
import {
  YearOverlapFormInputs,
  getYearOverlapLocationsArray,
  getYearOverlapTermsArray,
  getYearOverlapTimeRangesArray,
} from './LinkGenYearOverlap'

interface Props<T extends FieldValues> {
  control: Control<T>
  specialType?: LINKDBLinkSpecialType
}

function LiveLinkPreview<T extends DefaultFormInputs | YearOverlapFormInputs>({
  control,
  specialType,
}: Props<T>) {
  const w = useWatch({ control })

  const buildLink = () => {
    if (specialType === 'yearoverlap' && 'term1' in w) {
      const terms = getYearOverlapTermsArray(w as YearOverlapFormInputs)
      const locations = getYearOverlapLocationsArray(w as YearOverlapFormInputs)
      const timeRanges = getYearOverlapTimeRangesArray(
        w as YearOverlapFormInputs
      )
      return buildGTrendPageLink(terms, locations, timeRanges, specialType)
    } else {
      const terms = getDefaultTermsArray(w as DefaultFormInputs)
      const locations = [(w as DefaultFormInputs).location]
      const timeRanges = [(w as DefaultFormInputs).timerange]
      return buildGTrendPageLink(terms, locations, timeRanges, null)
    }
  }

  const link = buildLink()

  return (
    <a target="_blank" href={link}>
      {link}
    </a>
  )
}

export default LiveLinkPreview
