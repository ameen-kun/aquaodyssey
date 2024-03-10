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
const CustomDatePicker = ({onDateChange}) => (
    <RangePicker size="large" style={{outline:".3px solid black"}} 
    onChange={onDateChange} disabledDate={disabledDate} />
);
export default CustomDatePicker