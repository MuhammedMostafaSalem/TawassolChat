import { createSlice } from '@reduxjs/toolkit'
import { forgotpasswordUser, loginUser, registerUser, resetPasswordUser, VerifyPasswordUser } from '../Actions/AuthAction';

// Initial state for the authentication reducer
const initialState = JSON.parse(localStorage.getItem('authState')) || {
    user: {},
    isAuthenticated: false,
    token: "",
    user_email: "",
    user_id: "",
    status: 'idle',
    error: null,
}

export const AuthReducer = createSlice({
    name: 'Auth',
    initialState,
    reducers: {
        logOutUser: (state) => {
            state.user = {};
            state.status = 'idle';
            state.isAuthenticated = false;
            state.user_email = "";
            state.user_id = "";
            state.token = "";

            // Store token and user_id in localStorage
            localStorage.removeItem('authState');
        },
        sendCodeAgainUser: (state) => {
            state.user = {};
            state.user_email = "";
            state.loading = false;
            state.error = null;

            localStorage.setItem('authState', JSON.stringify(state));
        }
    },
    extraReducers: (builder) => {
        // Handle pending, fulfilled and rejected state of registerUser thunk
        builder
            .addCase(registerUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
                state.user_email = state.user.email;
                state.user_id = state.user.user_id;
                state.token = state.user.token;
                state.error = null;
    
                // Store token, user_email and user_id in localStorage
                localStorage.setItem('authState', JSON.stringify(state));
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'failed';
                state.user = {};
                state.error = action.payload;
            });
        
        
        // Handle pending, fulfilled and rejected state of loginUser thunk
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isAuthenticated = true;
                state.user = action.payload;
                state.user_id = state.user.user_id;
                state.token = state.user.token;
                state.error = null;

                localStorage.setItem('authState', JSON.stringify(state));
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.user = {};
                state.error = action.payload;
            });
        
        
        // Handle pending, fulfilled and rejected state of forgot password thunk
        builder
            .addCase(forgotpasswordUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(forgotpasswordUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
                state.error = null;
            })
            .addCase(forgotpasswordUser.rejected, (state, action) => {
                state.status = 'failed';
                state.user = {};
                state.error = action.payload;
            });


        // Handle pending, fulfilled and rejected state of verify password thunk
        builder
            .addCase(VerifyPasswordUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(VerifyPasswordUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
                state.user_email = state.user.email;
                state.error = null;
            })
            .addCase(VerifyPasswordUser.rejected, (state, action) => {
                state.status = 'failed';
                state.user = {};
                state.user_email = "";
                state.error = action.payload;
            });


        // Handle pending, fulfilled and rejected state of reset password thunk
        builder
            .addCase(resetPasswordUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(resetPasswordUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
                state.error = null;
            })
            .addCase(resetPasswordUser.rejected, (state, action) => {
                state.status = 'failed';
                state.user = {};
                state.error = action.payload;
            });
    }
})

export const { logOutUser, sendCodeAgainUser } = AuthReducer.actions;
export default AuthReducer.reducer;
