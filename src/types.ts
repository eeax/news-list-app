import React from "react";

export interface Reaction {
    likes: number;
    dislikes: number;
}

export interface NewsItem {
    id: number;
    title: string;
    body: string;
    tags: string[];
    reactions: Reaction;
    views: number;
    userId: number;
}

export interface NewsState {
    items: NewsItem[];
    loading: boolean;
    error: string | null;
    total: number;
}

export interface FetchNewsParams {
    skip: number;
    limit: number;
}

export interface ApiResponse {
    posts: NewsItem[];
    total: number;
    skip: number;
    limit: number;
}

export interface NewsCardProps {
    item: NewsItem;
    style: React.CSSProperties;
}
