import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { NewsState, FetchNewsParams, ApiResponse } from '../types';

const initialState: NewsState = {
    items: [],
    loading: false,
    error: null,
    total: 0,
};

export const fetchNews = createAsyncThunk<ApiResponse, FetchNewsParams>(
    'news/fetchNews',
    async ({ skip, limit }) => {
        const response = await axios.get<ApiResponse>(
            `https://dummyjson.com/posts?limit=${limit}&skip=${skip}`
        );
        return response.data;
    }
);

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNews.fulfilled, (state, action: PayloadAction<ApiResponse>) => {
                state.loading = false;
                state.total = action.payload.total;

                action.payload.posts.forEach((post) => {
                    if (!state.items.find((item) => item.id === post.id)) {
                        state.items.push(post);
                    }
                });
            })
            .addCase(fetchNews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Ошибка загрузки новостей';
            });
    },
});

export default newsSlice.reducer;
