import { createReducer } from '@reduxjs/toolkit';
import { backendQueryDelivered } from '../actions';
import { DEFAULT_QUERY_FILTER } from '../constants';
import state from '../store/state';

// Dummy reducer; does nothing.
export default createReducer(
    state.simfileResults, {
        [backendQueryDelivered]: (state, action) => {
            return action.payload;
        }
    }
);
