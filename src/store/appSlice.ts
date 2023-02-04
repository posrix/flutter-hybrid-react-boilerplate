import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import produce, { Draft } from 'immer';
import { findIndex } from 'lodash';
import { NavigationType } from 'react-router-dom';
import { FilterType, IInputFilterItem, ISingleFilterItem } from 'src/types/app';
import { produceFilterItems } from 'src/utils/produce-filter-items';
import {
  ISelectorPopupProps,
  ITextareaModalProps,
  IInputModalProps,
  IPersonnelSelectorPopupProps,
  IDropDownFilterPopupProps,
  IPickerProps,
  ICascadePickerProps,
  IDatePickerProps,
  IMultiColumnIndexBarPopupProps,
  IDateRangePickerProps,
} from './types';

export interface AppState {
  historyStack: string[];
  isWebViewReady: boolean;
  token: string | null;
  selectorPopupProps: ISelectorPopupProps;
  pickerProps: IPickerProps;
  casecadePickerProps: ICascadePickerProps;
  datePickerProps: IDatePickerProps;
  textareaModalProps: ITextareaModalProps;
  inputModalProps: IInputModalProps;
  personnelSelectorPopupProps: IPersonnelSelectorPopupProps;
  multiColumnIndexBarPopupProps: IMultiColumnIndexBarPopupProps;
  dropDownFilterPopupProps: IDropDownFilterPopupProps;
  userId: string | null;
  dateRangePickerProps: IDateRangePickerProps;
}

const initialState: AppState = {
  historyStack: [],
  isWebViewReady: false,
  token: process.env.WEB ? process.env.TOKEN! : '',
  selectorPopupProps: {
    title: '',
    visible: false,
    selectorValue: '',
    selectorOptions: [],
  },
  textareaModalProps: {
    visible: false,
    title: '',
    placeholder: '',
  },
  inputModalProps: {
    visible: false,
    title: '',
    placeholder: '',
  },
  personnelSelectorPopupProps: {
    visible: false,
    title: '',
    selectedPersonnels: [],
    personnels: [],
  },
  multiColumnIndexBarPopupProps: {
    visible: false,
    title: '',
    columns: [],
    selected: [],
  },
  dropDownFilterPopupProps: {
    visible: false,
    getContainer: () => document.body,
    filterItems: [],
  },
  pickerProps: {
    visible: false,
    columns: [],
  },
  casecadePickerProps: {
    visible: false,
    options: [],
  },
  datePickerProps: {
    visible: false,
  },
  userId: '',
  dateRangePickerProps: {
    visible: false,
  },
};

export const getTokenAsync = createAsyncThunk('app/getToken', async () => {
  const { token } = await window.flutter_inappwebview.callHandler('getToken');
  return token;
});

export const getUserIdAsync = createAsyncThunk('app/getUserId', async () => {
  const { userId } = await window.flutter_inappwebview.callHandler('getUserId');
  return userId;
});

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setHistoryStack: (
      state,
      action: PayloadAction<{
        type: NavigationType;
        pathname?: string;
      }>
    ) => {
      const { type, pathname } = action.payload;
      return produce(state, (draftState: Draft<AppState>) => {
        if (type === NavigationType.Pop) {
          draftState.historyStack = draftState.historyStack.slice(
            0,
            draftState.historyStack.length - 1
          );
        } else if (type === NavigationType.Push) {
          draftState.historyStack = [...draftState.historyStack, pathname!];
        } else if (type === NavigationType.Replace) {
          // Only append pathname while current page is not the root page
          if (draftState.historyStack.length) {
            draftState.historyStack = [
              ...draftState.historyStack.slice(0, draftState.historyStack.length - 1),
              pathname!,
            ];
          }
        }
      });
    },
    clearHistoryStack: (state) => {
      state.historyStack = [];
    },
    setWebviewReady: (state) => {
      state.isWebViewReady = true;
    },
    concealPicker: (state) => {
      state.pickerProps = {
        ...state.pickerProps,
        visible: false,
      };
    },
    concealCascadePicker: (state) => {
      state.casecadePickerProps = {
        ...state.casecadePickerProps,
        visible: false,
      };
    },
    concealDatePicker: (state) => {
      state.datePickerProps = {
        ...state.datePickerProps,
        visible: false,
      };
    },
    concealSelectorPopup: (state) => {
      state.selectorPopupProps = {
        ...state.selectorPopupProps,
        visible: false,
      };
    },
    concealPersonnelSelectorPopup: (state) => {
      state.personnelSelectorPopupProps = {
        ...state.personnelSelectorPopupProps,
        visible: false,
      };
    },
    concealMultiColumnIndexBarPopup: (state) => {
      state.multiColumnIndexBarPopupProps = {
        ...state.multiColumnIndexBarPopupProps,
        visible: false,
      };
    },
    concealTextareaModal: (state) => {
      state.textareaModalProps = {
        ...state.textareaModalProps,
        visible: false,
      };
    },
    concealInputModal: (state) => {
      state.inputModalProps = {
        ...state.inputModalProps,
        visible: false,
      };
    },
    concealDropDownFilterPopup: (state) => {
      state.dropDownFilterPopupProps = {
        ...state.dropDownFilterPopupProps,
        visible: false,
      };
    },
    activateSelectorPopup: (state, action: PayloadAction<ISelectorPopupProps>) => {
      state.selectorPopupProps = {
        ...action.payload,
        visible: true,
      };
    },
    activatePicker: (state, action: PayloadAction<IPickerProps>) => {
      state.pickerProps = {
        ...action.payload,
        visible: true,
      };
    },
    activateCascadePicker: (state, action: PayloadAction<ICascadePickerProps>) => {
      state.casecadePickerProps = {
        ...action.payload,
        visible: true,
      };
    },
    activateDatePicker: (state, action: PayloadAction<IDatePickerProps>) => {
      state.datePickerProps = {
        ...action.payload,
        visible: true,
      };
    },
    activatePersonnelSelectorPopup: (
      state,
      action: PayloadAction<IPersonnelSelectorPopupProps>
    ) => {
      state.personnelSelectorPopupProps = {
        ...action.payload,
        visible: true,
      };
    },
    activateMultiColumnIndexBarPopup: (
      state,
      action: PayloadAction<IMultiColumnIndexBarPopupProps>
    ) => {
      state.multiColumnIndexBarPopupProps = {
        ...action.payload,
        visible: true,
      };
    },
    activateDropDownFilterPopup: (state, action: PayloadAction<IDropDownFilterPopupProps>) => {
      state.dropDownFilterPopupProps = {
        ...state.dropDownFilterPopupProps,
        ...action.payload,
        visible: true,
      };
    },
    setDropDownFilterPopupItems: (
      state,
      action: PayloadAction<Required<IDropDownFilterPopupProps>['filterItems']>
    ) => {
      const filterItemsProduced = produceFilterItems(action.payload);
      state.dropDownFilterPopupProps = {
        ...state.dropDownFilterPopupProps,
        filterItems: filterItemsProduced,
      };
    },
    setDropDownFilterItemValue: (
      state,
      action: PayloadAction<{
        name: string;
        value?: IInputFilterItem['value'];
        selectedColumn?: ISingleFilterItem['selectedColumn'];
      }>
    ) => {
      const { name, value, selectedColumn } = action.payload;
      const { filterItems } = state.dropDownFilterPopupProps;
      if (filterItems && filterItems.length) {
        const filterItemsReplaced = produce(
          filterItems,
          (draftState: Draft<typeof filterItems>) => {
            const targetIndex = findIndex(draftState, (filterItem) => filterItem.name === name);
            if (targetIndex > -1) {
              switch (draftState[targetIndex].type) {
                case FilterType.Input:
                  if (value) (draftState[targetIndex] as IInputFilterItem).value = value;
                  break;
                case FilterType.Single:
                  if (selectedColumn)
                    (draftState[targetIndex] as ISingleFilterItem).selectedColumn = selectedColumn;
                  break;
              }
            }
          }
        );
        state.dropDownFilterPopupProps = {
          ...state.dropDownFilterPopupProps,
          filterItems: filterItemsReplaced,
        };
      }
    },
    activateInputModal: (state, action: PayloadAction<IInputModalProps>) => {
      state.inputModalProps = {
        ...action.payload,
        visible: true,
      };
    },
    activateTextareaModal: (state, action: PayloadAction<ITextareaModalProps>) => {
      state.textareaModalProps = {
        ...action.payload,
        visible: true,
      };
    },
    refreshToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    activeDateRangePicker: (state, action: PayloadAction<IDateRangePickerProps>) => {
      state.dateRangePickerProps = action.payload;
    },
    concealDateRangePicker: (state) => {
      state.dateRangePickerProps = {
        ...state.dateRangePickerProps,
        visible: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTokenAsync.fulfilled, (state, action) => {
        state.token = action.payload;
      })
      .addCase(getUserIdAsync.fulfilled, (state, action) => {
        state.userId = action.payload;
      });
  },
});

export const {
  setHistoryStack,
  clearHistoryStack,
  setWebviewReady,
  concealSelectorPopup,
  concealDropDownFilterPopup,
  concealPersonnelSelectorPopup,
  concealMultiColumnIndexBarPopup,
  concealCascadePicker,
  concealDatePicker,
  concealPicker,
  activateSelectorPopup,
  activateCascadePicker,
  activateDatePicker,
  activatePicker,
  activatePersonnelSelectorPopup,
  activateMultiColumnIndexBarPopup,
  activateDropDownFilterPopup,
  setDropDownFilterPopupItems,
  setDropDownFilterItemValue,
  activateTextareaModal,
  activateInputModal,
  concealInputModal,
  concealTextareaModal,
  refreshToken,
  activeDateRangePicker,
  concealDateRangePicker,
} = appSlice.actions;

export default appSlice.reducer;
