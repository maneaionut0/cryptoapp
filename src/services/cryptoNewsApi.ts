import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { INewsApi } from '../typescript/api.types';

import { createRequest } from './utils';

const cryptoNewsHeaders = {
  'x-bingapis-sdk': 'true',
  'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
  'x-rapidapi-key': '4c679976e7msh68773ebf754bbd6p1f0e17jsndce11b7ffa1c'
}

const baseUrl = 'https://bing-news-search1.p.rapidapi.com/news'

export const cryptoNewsApi = createApi({
  reducerPath:'cryptoNewsApi',
  baseQuery:fetchBaseQuery({baseUrl}),
  endpoints:(builder)=>({
    getCryptoNews: builder.query<any,INewsApi>({
      query: ({ newsCategory, count }) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`,cryptoNewsHeaders),
    }),
  })
})

export const {
  useGetCryptoNewsQuery,
} = cryptoNewsApi