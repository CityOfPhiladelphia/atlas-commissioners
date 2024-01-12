import transforms from '../general/transforms';
import { format, parseISO } from 'date-fns';
const phone = transforms.phoneNumber.transform;
const titleCase = transforms.titleCase.transform;
const nth = transforms.nth.transform;
let $t;

export default {
  key: 'ballot',
  icon: 'star',
  label: 'Elections & Ballots',
  dataSources: [ 'divisions', 'pollingPlaces', 'electedOfficials', 'nextElectionAPI' ],
  errorMessage: function() {
    return 'No voting assignment found for this address.';
  },
  components: [
    // {
    //   type: 'exclamationCallout',
    //   options: {
    //     components: [
    //       {
    //         type: 'exclamationContentTopic',
    //       },
    //     ],
    //   },
    // },
    {
      type: 'badge',
      options: {
        externalLink: {
          data: 'ballot.topic.previewBallot',
          href: function(state) {
            let value;
            if (state.sources.electedOfficials.data) {
              value = state.sources.electedOfficials.data.rows[0].ballot_file_id;
            }
            return value;
          },
        },
      },
      slots: {
        title: 'ballot.topic.badge1.header',
        titleBackground: '#2176d2',
        value: function(state) {
          return format(parseISO(state.sources.nextElectionAPI.data.election_date), 'MMMM d, yyyy');
        },
      }, // end slots
    }, // end of badge
    {
      type: 'callout',
      slots: {
        text: 'ballot.topic.callout1.text',
      },
    },
  ],
  // zoomToShape: [ 'geojsonForTopic', 'markersForTopic' ],
  // geojsonForTopic: {
  //   data: function(state) {
  //     return state.sources.divisions.data;
  //   },
  //   key: 'id',
  //   style: {
  //     fillColor: '#9e9ac8',
  //     color: '#9e9ac8',
  //     weight: 2,
  //     opacity: 1,
  //     fillOpacity: 0.3,
  //   },
  // },
  // markersForTopic: {
  //   data: function(state) {
  //     if (state.sources.pollingPlaces.data) {
  //       return state.sources.pollingPlaces.data.rows[0];
  //     }
  //     return null;

  //   },
  //   lat: 'lat',
  //   lng: 'lng',
  //   key: 'STREET_ADDRESS',
  //   color: '#54278f',
  //   icon: {
  //     prefix: 'fas',
  //     icon: 'landmark',
  //     shadow: false,
  //     size: '2x',
  //   },
  // },
  basemap: 'pwd',
  identifyFeature: 'address-marker',
  parcels: 'pwd',
};
