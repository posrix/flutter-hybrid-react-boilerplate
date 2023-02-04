import { PropsWithChildren } from 'react';
import { CascadePicker, DatePicker, Picker } from 'antd-mobile';
import SelectorPopup from 'src/components/SelectorPopup';
import InputModal from 'src/components/InputModal';
import TextareaModal from 'src/components/TextareaModal';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import {
  concealCascadePicker,
  concealDatePicker,
  concealPicker,
  concealDateRangePicker,
} from 'src/store/appSlice';
import PersonnelSelectorPopup from '../PersonnelSelectorPopup';
import DropDownFilterPopup from '../DropDownFilterPopup';
import { Container } from './styled';
import { DateRangePicker } from 'src/components/Base/DateRangePicker';

interface AppViewProps extends PropsWithChildren {}

const AppView: React.FC<AppViewProps> = ({ children }) => {
  const appState = useAppSelector((state) => ({
    selectorPopupProps: state.app.selectorPopupProps,
    personnelSelectorPopupProps: state.app.personnelSelectorPopupProps,
    multiColumnIndexBarPopupProps: state.app.multiColumnIndexBarPopupProps,
    dropDownFilterPopupProps: state.app.dropDownFilterPopupProps,
    textareaModalProps: state.app.textareaModalProps,
    inputModalProps: state.app.inputModalProps,
    pickerProps: state.app.pickerProps,
    casecadePickerProps: state.app.casecadePickerProps,
    datePickerProps: state.app.datePickerProps,
    dateRangePickerProps: state.app.dateRangePickerProps,
  }));

  const dispatch = useAppDispatch();

  return (
    <Container>
      {children}
      <SelectorPopup {...appState.selectorPopupProps} />
      <PersonnelSelectorPopup {...appState.personnelSelectorPopupProps} />
      <DropDownFilterPopup {...appState.dropDownFilterPopupProps} />
      <TextareaModal {...appState.textareaModalProps} />
      <InputModal {...appState.inputModalProps} />
      <Picker
        {...appState.pickerProps}
        onClose={() => {
          dispatch(concealPicker());
        }}
      />
      <CascadePicker
        {...appState.casecadePickerProps}
        onClose={() => {
          dispatch(concealCascadePicker());
        }}
      />
      <DatePicker
        {...appState.datePickerProps}
        onClose={() => {
          dispatch(concealDatePicker());
        }}
      />
      <DateRangePicker
        {...appState.dateRangePickerProps}
        onClose={() => {
          dispatch(concealDateRangePicker());
        }}
      />
    </Container>
  );
};

export default AppView;
