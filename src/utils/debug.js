import {mixInEndStamp} from './time.js';
import Axios from 'axios';

export const getTimelineJson = (url, callback) => {
  let result = null;
  Axios.get(url)
  .then(function (response) {

    // mixes in an end property for use with the player
    mixInEndStamp(response.data.annotations, response.data.audio_duration);
    callback(response.data);

  })
  .catch(function (err) {
    // If something goes wrong, let us know
    console.log(err);
  });
}
