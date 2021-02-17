import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs' // eslint-disable-line
import generatePicker from 'antd/es/date-picker/generatePicker'
import type { Dayjs } from 'dayjs'
import 'antd/es/date-picker/style/index'

// @ts-ignore
const DatePicker = generatePicker<Dayjs>(dayjsGenerateConfig)

export default DatePicker
