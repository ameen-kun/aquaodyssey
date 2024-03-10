import { DatePicker} from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;

const disabledDate = (current,{from}) => {
  if (from) {
    return Math.abs(current.diff(from, 'days')) >= 7 || current<from;
  }
  return current <= dayjs().subtract(1,'day') || current> dayjs().add(30,'day');
};
const CustomDatePickerVals = (props) => (
    <RangePicker size="large" style={{outline:".3px solid black"}} 
    defaultValue={[dayjs(props?.d1), dayjs(props?.d2)]}
    onChange={props?.onDateChange} disabledDate={disabledDate} />
);
export default CustomDatePickerVals