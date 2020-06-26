import _ from 'underscore';

export const QUERY_FIELDS = Object.freeze({
  artist: "Artist",
  name: "Track Name",
  minBpm: "Min BPM",
  maxBpm: "Max BPM",
  packName: "Pack Name",
  minDiff: "Min Difficulty",
  maxDiff: "Max Difficulty",
});

export const QUERY_FIELDS_INVERTED = Object.freeze(_.invert(QUERY_FIELDS));
