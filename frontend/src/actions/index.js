import { createAction } from '@reduxjs/toolkit';
import { QUERY_FIELDS_INVERTED } from '../constants/enums';

export const queryFilterValueChange = createAction('query/filter/valueChange');

export const queryFilterFieldChange = createAction('query/filter/fieldChange');

export const queryFilterAdd = createAction('query/filter/add');

export const queryFilterRemove = createAction('query/filter/remove');

export const backendQueryStarted = createAction('backend/query/started');

export const backendQueryDelivered = createAction('backend/query/delivered');

export const backendQueryError = createAction('backend/query/error');

export const submitQuery = (queryFilters) => (dispatch) => {
    dispatch(backendQueryStarted());
    let url ='search/';
    let mappedFilters = Object.fromEntries(queryFilters.map((filter) => {
        let fieldName = QUERY_FIELDS_INVERTED[filter.field];
        return [fieldName, filter.value]
    }));
    let filters = JSON.stringify(mappedFilters);
    console.log(filters)
    fetch(url, {
        method: 'POST',
        mode: 'cors',
        body: filters,
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
    .then(data => {
        // Convert data into something which getMatches
        // the schema shown in store/state.js#simfileResults
        console.log(data);
        return data; // if this is the raw data, this won't work
    }).then(
        data => {
            dispatch(backendQueryDelivered(data));
        }
    ).catch(error => {
        dispatch(backendQueryError(error));
    });
}
