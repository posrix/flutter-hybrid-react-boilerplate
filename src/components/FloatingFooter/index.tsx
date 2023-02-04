import { memo, useState, useCallback } from 'react';
import { Button, Grid } from 'antd-mobile';
import { IActionButton } from 'src/types/app';
import { FloatingFooterContainer, Placeholder } from './styled';

export interface FloatingFooterProps {
  buttonList: IActionButton[];
}

export const FloatingFooter = memo(({ buttonList }: FloatingFooterProps) => {
  const [height, setHeight] = useState(0);

  const measuredRef = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      // Will have a certain impact on the function of strictly relying on the lifecycle order,
      // such as getting the value of ref in componentDidMount
      // https://github.com/CJY0208/react-activation/blob/master/README.md#breaking-change
      setTimeout(() => {
        setHeight(node.getBoundingClientRect().height);
      }, 0);
    }
  }, []);

  return (
    <>
      <FloatingFooterContainer ref={measuredRef}>
        {buttonList.length > 1 ? (
          <Grid columns={2} gap={8}>
            {buttonList.map((button, index) => (
              <Grid.Item span={1} key={index}>
                <Button {...button}>{button.text}</Button>
              </Grid.Item>
            ))}
          </Grid>
        ) : (
          <Button {...buttonList[0]}>{buttonList[0].text}</Button>
        )}
      </FloatingFooterContainer>
      <Placeholder height={height} />
    </>
  );
});
