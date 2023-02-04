import ReactDOM from 'react-dom';
import { PropsWithChildren, useRef, useState } from 'react';
import { ICard } from 'src/types/app';
import { Checkbox } from 'antd-mobile';
import { useMounted } from 'src/utils/useMounted';
import Card from '../Card';
import { CheckboxRef } from 'antd-mobile/es/components/checkbox';
import { pick } from 'lodash';
import {
  FloatingContainer,
  FloatingActionContainer,
  FloatingCheckContainer,
  SelectAllText,
} from '../styled';

export interface CardListProps {
  cards: ICard[];
  enableSelect?: boolean;
  showEntryButton?: boolean;
  innerPreview?: boolean;
  onCardClick?: (card: ICard) => void;
  renderCardAction?: (card: ICard) => React.ReactNode;
  renderSelectAllAction?: (ids: string[]) => React.ReactNode;
}

interface PortalProps extends PropsWithChildren {
  active: boolean;
}

export const WRAPPER_ID = 'selector-wrapper';

export const Portal: React.FC<PortalProps> = ({ children, active }) => {
  if (active) {
    return ReactDOM.createPortal(children, document.getElementById(WRAPPER_ID) || document.body);
  }
  return null;
};

const CardList: React.FC<CardListProps> = ({
  cards,
  enableSelect = false,
  onCardClick,
  renderCardAction,
  renderSelectAllAction,
  showEntryButton = false,
  innerPreview = false,
}) => {
  const [selectedCardIds, setSelectedCardIds] = useState<string[]>([]);

  const checkboxRef = useRef<CheckboxRef>(null);
  const mounted = useMounted();

  const pickCard = (card: ICard) =>
    pick(card, [
      'id',
      'title',
      'fields',
      'tags',
      'displayFields',
      'previewFields',
      'extra',
      'rightLabelText',
    ]);

  return (
    <>
      <Checkbox.Group
        value={selectedCardIds}
        onChange={(ids) => setSelectedCardIds(ids as string[])}
      >
        {cards.map((card, i) => (
          <Card
            key={i}
            {...card}
            preview
            innerPreview={innerPreview}
            showEntryButton={showEntryButton}
            enableSelect={enableSelect}
            isFirstCard={i === 0}
            onSelect={(checked) => {
              if (!checked) {
                selectedCardIds.splice(selectedCardIds.indexOf(card.id), 1);
                setSelectedCardIds(selectedCardIds);
              } else {
                setSelectedCardIds([...selectedCardIds, card.id]);
              }
            }}
            renderAction={() => renderCardAction?.(pickCard(card))}
            onClick={() => onCardClick?.(pickCard(card))}
          />
        ))}
      </Checkbox.Group>
      <Portal active={enableSelect && mounted}>
        <FloatingContainer>
          <FloatingCheckContainer>
            <Checkbox
              ref={checkboxRef}
              onChange={(checked) =>
                !checked ? setSelectedCardIds([]) : setSelectedCardIds(cards.map((card) => card.id))
              }
            />
            <SelectAllText onClick={() => checkboxRef.current?.toggle()}>全选</SelectAllText>
          </FloatingCheckContainer>
          <FloatingActionContainer>
            {renderSelectAllAction?.(selectedCardIds)}
          </FloatingActionContainer>
        </FloatingContainer>
      </Portal>
    </>
  );
};

export default CardList;
