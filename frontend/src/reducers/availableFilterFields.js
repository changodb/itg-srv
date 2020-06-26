import { createReducer } from '@reduxjs/toolkit';
import { QUERY_FIELDS } from '../constants/enums';
import {
  queryFilterFieldChange,
  queryFilterAdd,
  queryFilterRemove
} from '../actions';

// Dummy reducer; does nothing.

export default createReducer(
    QUERY_FIELDS, {

        }
);
