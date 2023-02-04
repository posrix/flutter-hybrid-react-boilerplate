import { DotLoading, Skeleton, SpinLoading } from 'antd-mobile';
import { PropsWithChildren } from 'react';
import { LoadingContainer } from './styled';

export enum LoadingType {
  Dot = 'dot',
  Spin = 'spin',
  Skeleton = 'skeleton',
}

interface RenderLoadingProps extends PropsWithChildren {
  isLoading: boolean;
  loadingType?: LoadingType;
}

const RenderLoading: React.FC<RenderLoadingProps> = ({
  isLoading,
  loadingType = LoadingType.Dot,
  children,
}) => {
  return isLoading ? (
    <LoadingContainer>
      {(() => {
        switch (loadingType) {
          case LoadingType.Dot:
            return <DotLoading />;
          case LoadingType.Spin:
            return <SpinLoading />;
          case LoadingType.Skeleton:
            return (
              <>
                <Skeleton.Title />
                <Skeleton.Paragraph />
              </>
            );
        }
      })()}
    </LoadingContainer>
  ) : (
    <>{children}</>
  );
};

export default RenderLoading;
