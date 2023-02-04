import { memo, useEffect, useState } from 'react';
import { get, unionBy } from 'lodash';
import { LoadingOrEmptyWrapper } from './styled';
import { DotLoading, InfiniteScroll } from 'antd-mobile';
import { QueryDefinition } from '@reduxjs/toolkit/dist/query';
import CardList, { CardListProps } from 'src/components/Card/CardList';
import { UseLazyQuery } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { ICard } from 'src/types/app';

export interface CardListScrollableProps {
  cardListProps?: Omit<CardListProps, 'cards'>;
  queryObject?: Record<string, any>;
  useLazyQuery: UseLazyQuery<QueryDefinition<any, any, any, any, string>>;
  cardsTransfer?: (list: ICard[]) => ICard[];
  loadingTop?: number;
  onListChange?: <T extends any[]>(param: T) => void;
}

export const CardListScrollable = memo(
  ({
    queryObject = {},
    useLazyQuery,
    cardListProps,
    cardsTransfer,
    loadingTop,
    onListChange,
  }: CardListScrollableProps) => {
    const [hasMore, setHasMore] = useState(true);
    const [list, setList] = useState<any[]>([]);
    const [page, setPage] = useState(1);

    const [lazyQueryTrigger, lazyQueryResult] = useLazyQuery();

    async function loadMore(query: Record<string, any>) {
      setPage((page) => page + 1);
      await lazyQueryTrigger(query);
    }

    useEffect(() => {
      setList([]);
      setPage(1);
      setHasMore(true);
      loadMore({ ...queryObject, page: 1, size: 10 });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryObject]);

    useEffect(() => {
      const append = get(lazyQueryResult, 'currentData', []);
      if (append.length > 0) {
        const arr = cardsTransfer ? cardsTransfer(append) : append;
        setList((val) => unionBy([...val, ...arr], 'id'));
      }
      setHasMore(append.length > 0);
      onListChange && onListChange(append);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lazyQueryResult, onListChange]);

    return (
      <>
        {list.length > 0 ? (
          <>
            <CardList cards={list} {...cardListProps} />
            <InfiniteScroll
              loadMore={() => loadMore({ ...queryObject, page, size: 10 })}
              hasMore={hasMore}
            />
          </>
        ) : (
          <LoadingOrEmptyWrapper loadingTop={loadingTop}>
            {!lazyQueryResult.isFetching ? '暂无数据' : <DotLoading />}
          </LoadingOrEmptyWrapper>
        )}
      </>
    );
  }
);
