import * as turf from '@turf/turf';

import data from './paf.geo.json';
const polygon = turf.polygon(data.features[0].geometry.coordinates);

/*const polygon = turf.polygon(
  [
    [
      [
        18.46003532409668,
        -34.11059647470092
      ],
      [
        18.512134552001953,
        -34.11059647470092
      ],
      [
        18.512134552001953,
        -34.08756857703176
      ],
      [
        18.46003532409668,
        -34.08756857703176
      ],
      [
        18.46003532409668,
        -34.11059647470092
      ]
    ]
  ]
)*/

const masked = turf.mask(polygon);


export default masked;
