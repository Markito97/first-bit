import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Graph {
  timestep: string;
  currentValue: number;
}

interface Control {
  value: {
    currentValue: number;
    minValue: number;
    maxValue: number;
  };
}

interface Table {
  timestep: string;
  currentValue: number;
  prevValue: number;
  change: number;
}

type ResponseControl = Control;
type ResponseGraph = Graph[];
type ResponseTable = Table[];

export const api = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dashboard.bit76.ru/" }),
  endpoints: (builder) => ({
    getContolValue: builder.query<ResponseControl, void>({
      query: () => `/controlValue/`,
    }),
    getGraphValue: builder.query<ResponseGraph, void>({
      query: () => "/graphValues/",
    }),
    getTableValues: builder.query<ResponseTable, void>({
      query: () => "/tableValues/",
    }),
  }),
});

export const { useGetContolValueQuery, useGetGraphValueQuery, useGetTableValuesQuery } = api;
