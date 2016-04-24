import { combineReducers } from 'redux';
import { createResponsiveStateReducer } from 'redux-responsive';

const app = combineReducers({
  browser: createResponsiveStateReducer({
    extraSmall: 480,
    small: 768,
    medium: 1024,
    large: 1280,
    extraLarge: 1400,
  }),
});

export default app;
