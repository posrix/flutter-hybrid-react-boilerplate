import { Button, CenterPopup, Input } from 'antd-mobile';
import { useEffect, useState } from 'react';
import { concealInputModal } from 'src/store/appSlice';
import { useAppDispatch } from 'src/store/hooks';
import { IInputModalProps } from 'src/store/types';
import { CenterPopupOverride, Content, ActionGroup, Title } from './styled';

const InputModal: React.FC<IInputModalProps> = ({
  title,
  defaultValue = '',
  visible,
  placeholder,
  handleConfirmCallback,
}) => {
  const [text, setText] = useState(defaultValue);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setText(defaultValue);
  }, [defaultValue]);

  const concealAndClearText = () => {
    dispatch(concealInputModal());
    // Skip popup conceal animation
    setTimeout(() => {
      setText(defaultValue);
    }, 200);
  };

  return (
    <CenterPopup visible={visible} onMaskClick={concealAndClearText}>
      <CenterPopupOverride />
      <Content>
        <Title>{title}</Title>
        <Input
          value={text}
          placeholder={placeholder || '请输入内容'}
          onChange={(val) => {
            setText(val);
          }}
          onFocus={(e) => {
            const target = e?.target;
            target?.select();
          }}
        />
        <ActionGroup>
          <Button color="primary" fill="none" onClick={concealAndClearText}>
            取消
          </Button>
          <Button
            color="primary"
            fill="none"
            onClick={() => {
              handleConfirmCallback?.(text);
              concealAndClearText();
            }}
          >
            确定
          </Button>
        </ActionGroup>
      </Content>
    </CenterPopup>
  );
};

export default InputModal;
