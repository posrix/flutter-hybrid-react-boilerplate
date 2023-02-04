import { Input, ProgressBar } from 'antd-mobile';
import { AddOutline, MinusOutline } from 'antd-mobile-icons';
import { useEffect, useState } from 'react';
import { Container, PercentSymbol, ProgressInputOverride } from './styled';

export interface ControlledPorgressBarProps {
  onChange: (value: number) => void;
  defaultValue?: number;
}

const ControlledProgressBar: React.FC<ControlledPorgressBarProps> = ({
  defaultValue = 0,
  onChange,
}) => {
  const [percent, setPercent] = useState(defaultValue);

  useEffect(() => {
    setPercent(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    onChange(percent);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [percent]);

  return (
    <Container>
      <ProgressInputOverride />
      <MinusOutline
        onClick={() => {
          setPercent((pre) => (pre - 10 >= 0 ? pre - 10 : 0));
        }}
        style={{
          marginRight: 5,
          fontSize: 14,
        }}
      />
      <ProgressBar percent={percent} style={{ flex: 1 }} />
      <AddOutline
        onClick={() => {
          setPercent((pre) => (pre + 10 <= 100 ? pre + 10 : 100));
        }}
        style={{
          marginLeft: 5,
          fontSize: 14,
        }}
      />
      <Input
        value={percent.toString()}
        onChange={(value) => {
          if (Number(value) >= 0 && Number(value) <= 100) {
            setPercent(Number(value));
          } else if (Number(value) > 100) {
            setPercent(100);
          }
        }}
        type="number"
        pattern="\d*"
        style={{
          marginLeft: 8,
          width: 28,
        }}
      />
      <PercentSymbol>%</PercentSymbol>
    </Container>
  );
};

export default ControlledProgressBar;
