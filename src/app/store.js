// import counterReducer from '../features/Counter/counterSlice';
// import userReducer from '../features/Auth/userSlice';
import authReducer from '../features/auth/authSlice';
const { configureStore } = require('@reduxjs/toolkit');

const rootReducer = {
  // count: counterReducer,
  // user: userReducer,
  auth: authReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
