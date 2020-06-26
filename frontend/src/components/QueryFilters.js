import React from 'react';
import AddIcon from '@material-ui/icons/Add'; 
import RemoveIcon from '@material-ui/icons/Remove';
import { queryFilterPropType } from '../constants/propTypes';
import QueryFilter from './QueryFilter';
import { Button, Grid, List, ListItem, Typography, Box } from '@material-ui/core';


export default ({ availableFilterFields, queryFilters, onSubmit, onValueChange, onFieldChange, onAddQueryFilter, onRemoveQueryFilter }) => {
  const filters = queryFilters.map((filter, index) => (
    <ListItem key={index.toString()} className>
      <AddIcon onClick={() => onAddQueryFilter(index)} />

      <QueryFilter
        idx={index}
        field={filter.field}
        value={filter.value}
        onValueChange={onValueChange}
        onFieldChange={onFieldChange}
        availableFilterFields={availableFilterFields}
      />
      {(index === 0) ? null :
        <RemoveIcon onClick={() => onRemoveQueryFilter(index)} />
      }
    </ListItem>
  ));
  return (
    <form className='queryContainer'>
            <Button type='submit' className='submitButton' variant='contained'onClick={(event) => {
                event.preventDefault();
                onSubmit(queryFilters);
            }}>
                Submit
            </Button>
        <List className="queryFilters">
            <Typography>
              {filters}
            </Typography>
        </List>
    </form>
  )
};
