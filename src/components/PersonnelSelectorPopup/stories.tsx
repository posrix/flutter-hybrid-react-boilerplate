import { ComponentStory, ComponentMeta } from '@storybook/react';
import { store } from 'src/store';
import { Provider } from 'react-redux';
import AppView from '../AppView';
import ListForm from '../ListForm';
import PersonnelSelectorPopup from '.';
import { useAppDispatch } from 'src/store/hooks';
import { activatePersonnelSelectorPopup } from 'src/store/appSlice';
import { useMemo, useState } from 'react';
import { PERSONNELS } from 'src/config/mock';

export default {
  title: 'Components/PersonnelSelectorPopup',
  component: PersonnelSelectorPopup,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <AppView>
          <Story />
        </AppView>
      </Provider>
    ),
  ],
} as ComponentMeta<typeof PersonnelSelectorPopup>;

const Template: ComponentStory<typeof PersonnelSelectorPopup> = (args) => {
  const dispatch = useAppDispatch();
  const [selectedPersonnels, setSelectedPersonnels] = useState([PERSONNELS[0]]);

  const extra = useMemo(() => {
    if (selectedPersonnels.length && !args.multiple) {
      return selectedPersonnels[0].name;
    }
    return '请选择';
  }, [selectedPersonnels, args.multiple]);

  const description = useMemo(() => {
    if (selectedPersonnels.length && args.multiple) {
      return selectedPersonnels.map((personnel) => <div key={personnel.id}>{personnel.name}</div>);
    }
    return null;
  }, [selectedPersonnels, args.multiple]);

  return (
    <ListForm>
      <ListForm.Item
        extra={extra}
        description={description}
        onClick={() =>
          dispatch(
            activatePersonnelSelectorPopup({
              ...args,
              handleSelectCallback: (personnels) => {
                setSelectedPersonnels(personnels);
              },
            })
          )
        }
      >
        人员选择器
      </ListForm.Item>
    </ListForm>
  );
};

export const Radio = Template.bind({});

export const Checkbox = Template.bind({});

Radio.args = {
  personnels: PERSONNELS,
  title: '人员单选',
};

Checkbox.args = {
  personnels: PERSONNELS,
  multiple: true,
  title: '人员多选',
};
