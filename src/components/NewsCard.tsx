import React from 'react';
import { Card, Tag, Space } from 'antd';
import { LikeOutlined, DislikeOutlined, EyeFilled } from '@ant-design/icons';
import { cardTextStyle } from '../styles/newsStyles';
import { ITEM_HEIGHT } from '../constants';

import type { NewsCardProps } from '../types';

const NewsCard: React.FC<NewsCardProps> = ({ item, style }) => {
    if (!item) return null;

    return (
        <div style={style}>
            <Card
                title={item.title}
                style={{ height: ITEM_HEIGHT - 20 }}
                extra={
                    <span>
                        <EyeFilled style={{ color: 'lightblue', marginRight: 4 }} />
                        {item.views}
                    </span>
                }
            >
                <div style={cardTextStyle}>
                    {item.body}
                </div>

                <Space size={[0, 8]} wrap>
                    {Array.isArray(item.tags) &&
                        item.tags.map((tag) => (
                            <Tag key={tag} color="blue">
                                #{tag}
                            </Tag>
                        ))}
                </Space>

                <div style={{ marginTop: 12 }}>
                    <Space size={12}>
                        <span>
                            <LikeOutlined style={{ color: 'green', marginRight: 4 }} />
                            {item.reactions?.likes ?? 0}
                        </span>
                        <span>
                            <DislikeOutlined style={{ color: 'red', marginRight: 4 }} />
                            {item.reactions?.dislikes ?? 0}
                        </span>
                    </Space>
                </div>
            </Card>
        </div>
    );
};

export default NewsCard;
