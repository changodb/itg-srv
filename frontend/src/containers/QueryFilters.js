import { connect } from 'react-redux';
import QueryFilters from '../components/QueryFilters';
import {
  submitQuery,
  queryFilterValueChange,
  queryFilterFieldChange,
  queryFilterAdd,
  queryFilterRemove
} from '../actions';

const mapStateToProps = (state) => ({
  queryFilters: state.queryFilters,
  availableFilterFields: state.availableFilterFields
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (queryFilters) => dispatch(submitQuery(queryFilters)),
  onAddQueryFilter: (index) => dispatch(queryFilterAdd(index)),
  onRemoveQueryFilter: (index) => dispatch(queryFilterRemove(index)),
  onValueChange: (index, value) => dispatch(queryFilterValueChange({
    index, value
  })),
  onFieldChange: (index, value) => dispatch(queryFilterFieldChange({
    index,value
  }))
});

export default connect(mapStateToProps, mapDispatchToProps)(QueryFilters);
