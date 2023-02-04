import { CenterPopup, TextArea } from 'antd-mobile';
import { useEffect, useState } from 'react';
import { concealTextareaModal } from 'src/store/appSlice';
import { useAppDispatch } from 'src/store/hooks';
import { ITextareaModalProps } from 'src/store/types';
import {
  CenterPopupOverride,
  Content,
  Footer,
  ModalButton,
  ModalButtonDivider,
  Title,
} from './styled';

const TextareaModal: React.FC<ITextareaModalProps> = ({
  title,
  defaultValue = '',
  maxLength,
  rows = 5,
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
    dispatch(concealTextareaModal());
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
        <TextArea
          placeholder={placeholder || '请输入内容'}
          maxLength={maxLength}
          rows={rows}
          value={text}
          onChange={(val) => {
            setText(val);
          }}
        />
      </Content>
      <Footer>
        <ModalButton onClick={concealAndClearText}>取消</ModalButton>
        <ModalButtonDivider />
        <ModalButton
          isConfirm
          onClick={async () => {
            const validated = await handleConfirmCallback?.(text);
            if (!validated) return;
            concealAndClearText();
          }}
        >
          确认
        </ModalButton>
      </Footer>
    </CenterPopup>
  );
};

export default TextareaModal;
