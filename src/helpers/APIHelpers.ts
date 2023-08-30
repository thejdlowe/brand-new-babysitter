import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { configureStore } from "@reduxjs/toolkit";

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const improvBotApi = createApi({
	reducerPath: "improvBotApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }),
	endpoints: (builder) => ({
		getSuggestions: builder.query<string[], void>({
			query: () => ({
				method: "GET",
				url: "suggestion",
			}),
		}),
		sendSuggestion: builder.mutation<string, string>({
			query: (text) => ({
				url: "suggestion",
				method: "POST",
				body: {
					suggestion: text,
				},
			}),
		}),
	}),
});

export const { useGetSuggestionsQuery, useSendSuggestionMutation } =
	improvBotApi;

export const store = configureStore({
	reducer: {
		[improvBotApi.reducerPath]: improvBotApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(improvBotApi.middleware),
});
