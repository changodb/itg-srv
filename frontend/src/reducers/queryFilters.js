import { createReducer } from '@reduxjs/toolkit';
import {
  queryFilterValueChange,
  queryFilterFieldChange,
  queryFilterAdd,
  queryFilterRemove
} from '../actions';
import { DEFAULT_QUERY_FILTER } from '../constants';

/*
Indexes are used in `createReducer` as we can have an arbitrary amount of
QueryFilters, potentially with the same field. The index corresponds to the
"row" (a form input element) index, and that row's data is stored at index
0 of the array.

+ and - buttons exist in the front-end, that will increase the index count by
1 and splice out 1 element from the array in that index, respectively.
*/

export default createReducer(
  [Object.assign({}, DEFAULT_QUERY_FILTER)],
  {
    [queryFilterValueChange]: (state, action) => {
      state[action.payload.index].value = action.payload.value;
      return state;
    },
    [queryFilterFieldChange]: (state, action) => {
      state[action.payload.index].field = action.payload.value;
      return state;
    },
    /*The `+1` here is used to insert the new QueryFilter AFTER the row where
    the user pushed the + button.*/
    [queryFilterAdd]: (state, action) => {
      state.splice((action.payload + 1), 0, Object.assign({}, DEFAULT_QUERY_FILTER));
      return state;
    },
    [queryFilterRemove]: (state, action) => {
      state.splice(action.payload, 1);
      return state;
    }
  }
);
