import PropTypes from 'prop-types';
import { QUERY_FIELDS } from './enums';

export const simfilePropType = {
  songName: PropTypes.string.isRequired,
  songArtist: PropTypes.string.isRequired,
  bpm: PropTypes.number.isRequired,
  packName: PropTypes.string.isRequired,
  packLink: PropTypes.string,
  difficulty: PropTypes.objectOf(PropTypes.number).isRequired,
  /* "expanded" is to be used when the user clicks on a particular simfile
  (from a summary list) and it expands outwards with details*/
  expanded: PropTypes.bool.isRequired
}

export const queryFilterPropType = {
  field: PropTypes.oneOf(Object.keys(QUERY_FIELDS)),
  value: PropTypes.string.isRequired
}