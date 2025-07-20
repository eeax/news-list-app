import React, { useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spin, Alert, Empty } from 'antd';
import { FixedSizeList as List, FixedSizeList } from 'react-window';
import type { ListOnItemsRenderedProps } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { fetchNews } from '../features/newsSlice';
import NewsCard from "./NewsCard.tsx";

import { ITEM_HEIGHT, BUFFER, VISIBLE_WINDOW } from "../constants";
import type { AppDispatch, RootState } from '../store/store';
import type { NewsItem } from '../types';

const NewsList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { items, loading, error, total } = useSelector((state: RootState) => state.news);

    const listRef = useRef<FixedSizeList<NewsItem>>(null);
    const skipRef = useRef(0);
    const limit = VISIBLE_WINDOW;

    useEffect(() => {
        if (items.length === 0) {
            dispatch(fetchNews({ skip: 0, limit }));
            skipRef.current = limit;
        }
    }, [dispatch, items.length, limit]);

    const handleItemsRendered = useCallback(
        ({ visibleStopIndex }: ListOnItemsRenderedProps) => {
            if (loading || items.length === 0) return;

            const isNearBottom = visibleStopIndex + BUFFER >= items.length;
            const canFetchMore = skipRef.current < total;

            if (isNearBottom && canFetchMore) {
                dispatch(fetchNews({ skip: skipRef.current, limit }));
                skipRef.current += limit;
            }
        },
        [dispatch, items.length, loading, limit, total]
    );

    const renderCard = ({ index, style }: { index: number; style: React.CSSProperties }) => {
        const item = items[index];
        if (!item) return null;
        return <NewsCard item={item} style={style} />;
    };

    if (error) {
        return <Alert message={error} type="error" style={{ margin: 20 }} />;
    }

    if (!loading && items.length === 0) {
        return <Empty description="Новости не найдены" style={{ margin: 20 }} />;
    }

    return (
        <div className='news-block'>
            {loading && items.length === 0 ? (
                <div style={{ textAlign: 'center', padding: 100 }}>
                    <Spin size="large" />
                    <div style={{ paddingTop: 20 }}>Загружаем новости...</div>
                </div>
            ) : (
                <AutoSizer>
                    {({ height, width }) => (
                        <List
                            height={height}
                            itemCount={items.length}
                            itemSize={ITEM_HEIGHT}
                            width={width}
                            className={'hide-scrollbar'}
                            onItemsRendered={handleItemsRendered}
                            ref={listRef}
                        >
                            {renderCard}
                        </List>
                    )}
                </AutoSizer>
            )}
        </div>
    );
};

export default NewsList;
