import { ComponentStory, ComponentMeta } from '@storybook/react';
import { store } from 'src/store';
import { Provider } from 'react-redux';
import AppView from '../AppView';
import { NavBar } from 'antd-mobile';
import DropDownFilterPopup from '.';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import {
  activateDropDownFilterPopup,
  concealDropDownFilterPopup,
  setDropDownFilterPopupItems,
} from 'src/store/appSlice';
import { FILTER_ITEMS } from 'src/config/mock';
import Icon from '../Base/Icon';
import { useEffect, useRef } from 'react';

export default {
  title: 'Components/DropDownFilterPopup',
  component: DropDownFilterPopup,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <AppView>
          <Story />
        </AppView>
      </Provider>
    ),
  ],
} as ComponentMeta<typeof DropDownFilterPopup>;

const Template: ComponentStory<typeof DropDownFilterPopup> = () => {
  const dispatch = useAppDispatch();
  const dropDownFilterPopupProps = useAppSelector((state) => state.app.dropDownFilterPopupProps);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(setDropDownFilterPopupItems(FILTER_ITEMS));
  }, [dispatch]);

  return (
    <div ref={containerRef}>
      <NavBar
        right={
          <Icon
            glyph="filter"
            onClick={() => {
              if (!dropDownFilterPopupProps.visible) {
                containerRef.current &&
                  dispatch(
                    activateDropDownFilterPopup({
                      getContainer: () => containerRef.current!,
                      handleSelectCallback: (queryValue) => {
                        console.debug('[storybook]', queryValue);
                      },
                    })
                  );
              } else {
                dispatch(concealDropDownFilterPopup());
              }
            }}
          />
        }
      >
        标题
      </NavBar>
    </div>
  );
};

export const Default = Template.bind({});
