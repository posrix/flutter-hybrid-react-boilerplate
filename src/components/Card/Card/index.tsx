import { useMemo } from 'react';
import { CardListProps } from '../CardList';
import { useAppDispatch } from 'src/store/hooks';
import { ShouldRender } from 'src/utils/should-render';
import { ICard, IField, CardFieldType } from 'src/types/app';
import { Button, Checkbox, Ellipsis, ProgressBar, Tag } from 'antd-mobile';
import {
  A,
  Image,
  Title,
  FieldText,
  FieldTitle,
  Container,
  ProgressText,
  FieldCotainer,
  TitleContainer,
  ProgressWrapper,
  ProgressContainer,
  ButtonFieldCotainer,
  RightLabel,
  TagsFieldCotainer,
} from '../styled';

export type CardProps = ICard &
  Partial<Pick<CardListProps, 'enableSelect' | 'showEntryButton' | 'innerPreview'>> & {
    onSelect?: (checked: boolean) => void;
    onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    renderAction?: () => React.ReactNode;
    preview?: boolean;
    isFirstCard?: boolean;
    subTitle?: React.ReactNode;
  };

const Card: React.FC<CardProps> = (props) => {
  const {
    id,
    title,
    tags = [],
    extraTag,
    renderAction,
    onSelect,
    onClick,
    enableSelect = false,
    showEntryButton = false,
    displayFields = [],
    previewFields = [],
    preview = false,
    innerPreview = false,
    rightLabelText,
    isFirstCard = false,
    subTitle,
  } = props;

  const fields = useMemo(() => {
    if (preview && previewFields.length) {
      return previewFields
        .map((fieldName) => props.fields.find((field) => field.name === fieldName))
        .filter((n) => n) as IField[];
    } else if (displayFields.length) {
      return displayFields
        .map((fieldName) => props.fields.find((field) => field.name === fieldName))
        .filter((n) => n) as IField[];
    }
    return props.fields;
  }, [props.fields, previewFields, displayFields, preview]);

  const dispatch = useAppDispatch();
  const renderField = (field: IField) => {
    switch (field.type) {
      case CardFieldType.Text:
        return (
          <FieldText>
            <Ellipsis direction="end" content={field.value || '-'} expandText="展开" rows={3} />
          </FieldText>
        );

      case CardFieldType.Link:
        return <A href={field.href}>{field.text}</A>;

      case CardFieldType.Progress:
        return (
          <ProgressWrapper>
            <ProgressContainer>
              <ProgressBar
                percent={field.value}
                style={{
                  '--track-width': '12px',
                }}
              />
            </ProgressContainer>
            <ProgressText>{field.value}%</ProgressText>
          </ProgressWrapper>
        );

      case CardFieldType.ReactNode:
        return <FieldText>{field.value ?? '-'}</FieldText>;
    }
  };

  return (
    <Container
      onClick={onClick}
      preview={preview}
      innerPreview={innerPreview}
      isFirstCard={isFirstCard}
    >
      <ShouldRender active={!!title}>
        <TitleContainer onClick={(e) => e.stopPropagation()}>
          {enableSelect && <Checkbox value={id} onChange={onSelect} />}
          <Title hasGap={enableSelect}>{title}</Title>
          <ShouldRender active={!!extraTag}>
            <Tag round color={extraTag?.color} fill={extraTag?.fill}>
              {extraTag?.text}
            </Tag>
          </ShouldRender>
          {subTitle}
        </TitleContainer>
      </ShouldRender>
      <ShouldRender active={tags.length > 0 || !!rightLabelText}>
        <TagsFieldCotainer>
          <div>
            {tags
              .filter((t) => t)
              .map(({ color, fill = 'solid', text }, i) => (
                <Tag round color={color} key={i} fill={fill} style={{ marginRight: 6 }}>
                  {text}
                </Tag>
              ))}
          </div>
          {rightLabelText && <RightLabel>{rightLabelText}</RightLabel>}
        </TagsFieldCotainer>
      </ShouldRender>
      {fields.map((field, i) => (
        <FieldCotainer key={i} noMarginTop={i === 0 && !tags.length}>
          <FieldTitle>{field.name}</FieldTitle>
          {renderField(field)}
        </FieldCotainer>
      ))}
      <ShouldRender active={!!renderAction && !showEntryButton}>
        <ButtonFieldCotainer onClick={(e) => e.stopPropagation()}>
          {renderAction?.()}
        </ButtonFieldCotainer>
      </ShouldRender>
      <ShouldRender active={showEntryButton}>
        <FieldCotainer>
          <Button
            block
            color="primary"
            fill="outline"
            size="small"
            style={{ margin: '8px 0 0 0' }}
          >{`查看详情 >`}</Button>
        </FieldCotainer>
      </ShouldRender>
    </Container>
  );
};

export default Card;
