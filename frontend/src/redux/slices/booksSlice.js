import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import createBookWithId from '../../utils/createBookWithId'
import { setError } from './errorSlice'

const initialState = {
    books: [],
    isLoadingViaApi: false
}


export const fetchBook = createAsyncThunk(
    'books/fetchBook',
    async (url, thunkApi) => {
        try {
            const res = await axios.get(url);
            return res.data;
        } catch (error) {
            thunkApi.dispatch(setError(error.message))
            return thunkApi.rejectWithValue(error)
        }
    }
)

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        addBook: (state, action) => {
            state.books.push(action.payload)
        },
        deleteBook: (state, action) => {
            return { ...state, books: state.books.filter((book) => book.id !== action.payload) };
            // const index = state.findIndex((book) => book.id === action.payload)
            // if (index !== -1) {
            //     state.splice(index, 1)
            // }
        },
        toggleFavorite: (state, action) => {
            state.books.forEach((book) => {
                if (book.id === action.payload) {
                    book.isFavorite = !book.isFavorite;
                }
            })
            // return state.map((book) =>
            //     book.id === action.payload
            //         ? { ...book, isFavorite: !book.isFavorite }
            //         : book
            // )
        }
    },
    extraReducers: {
        [fetchBook.pending]: (state) => {
            state.isLoadingViaApi = true
        },
        [fetchBook.fulfilled]: (state, action) => {
            state.isLoadingViaApi = false
            if (action.payload.title && action.payload.author) {
                state.books.push(createBookWithId(action.payload, 'API'))
            }
        },
        [fetchBook.rejected]: (state) => {
            state.isLoadingViaApi = false
        }
    }
    // Option 2
    // extraReducers: (builder) => {
    //     builder.addCase(fetchBook.fulfilled, (state, action) => {
    //         if (action.payload.title && action.payload.author) {
    //             state.books.push(createBookWithId(action.payload, 'API'));
    //         }
    //     });
    // }
})


export const { addBook, deleteBook, toggleFavorite } = booksSlice.actions
export const selectBooks = (state) => state.books.books
export const selectisLoadingViaAPI = (state) => state.books.isLoadingViaApi
export default booksSlice.reducer