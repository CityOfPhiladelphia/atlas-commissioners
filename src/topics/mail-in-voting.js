import transforms from '../general/transforms';
import { format, parseISO } from 'date-fns';
const phone = transforms.phoneNumber.transform;
const titleCase = transforms.titleCase.transform;
const nth = transforms.nth.transform;
let $t;

export default {
  key: 'mail-in-voting',
  icon: 'envelope',
  label: 'Mail-in Voting',
  dataSources: [ 'divisions', 'pollingPlaces', 'electedOfficials', 'nextElectionAPI' ],
  errorMessage: function() {
    return 'No voting assignment found for this address.';
  },
  components: [
    {
      type: 'vertical-table',
      options: {
        nullValue: 'None',
        externalLink: {
          action: function() {
            return 'voting.topic.verticalTable2.link';
          },
          href: function(state) {
            return '//vote.phila.gov/voting/current-elected-officials/';
          },
        },
      },

      slots: {
        title: 'voting.topic.electedRep',
        fields: [
          {
            label: 'voting.topic.districtCouncilMember',
            value: function(state) {
              const council = state.sources.electedOfficials.data.rows.filter( function(item) {
                return item.office_label == "City Council";
              });
              return '<a href="http://' + council[0].website + '" target="_blank">' +
                council[0].first_name +" " +council[0].last_name + " - " + nth(council[0].district) + " Council District </a>";
            },
          },
          {
            label: 'voting.topic.cityHallOffice',
            value: function(state) {
              const council = state.sources.electedOfficials.data.rows.filter( function(item) {
                return item.office_label == "City Council";
              });
              return council[0].main_contact_address_2 + '<br>' +
                     phone(council[0].main_contact_phone_1) + ", " + phone(council[0].main_contact_phone_2) + '<br>\
                      F: '+ phone(council[0].main_contact_fax) + ' <br>\
                      <b><a href=mailto:"' + council[0].email + '">' + council[0].email + '</a></b>';
            },
          },
          {
            label: 'voting.topic.currentTerm',
            value: function(state) {
              const council = state.sources.electedOfficials.data.rows.filter( function(item) {
                return item.office_label == "City Council";
              });
              return council[0].next_election - 4 + ' - ' + council[0].next_election;
            },
          },
        ],
      },
    }, // end table
    {
      type: 'vertical-table',
      options: {
        subtitle: 'voting.topic.redistrictingSubtitle',
        // subtitle: 'Some addresses will be represented by a new city council district starting in 2024. Residents will vote in the new district in the 2023 primary and general elections.',
        nullValue: 'None',
        externalLink: {
          action: function() {
            // return 'Read more about the redistricting process ';
            return 'voting.topic.redistrictingProcess';
          },
          href: function(state) {
            return '//seventy.org/issues-index/council-redistricting';
            // return '//www.philadelphiavotes.com/en/voters/elected-officials';
          },
        },
      },

      slots: {
        title: 'voting.topic.cityCouncilRedistricting',
        fields: [
          {
            label: 'voting.topic.oldCityCouncilDistrict',
            value: function(state) {
              const council = state.sources.electedOfficials.data.rows.filter( function(item) {
                return item.office_label == "City Council";
              });
              return '<a href="http://' + council[0].website + '" target="_blank">' +
                nth(council[0].district) + " Council District </a>";
            },
          },
          {
            label: 'voting.topic.newCityCouncilDistrict',
            value: function(state) {
              const council = state.sources.electedOfficialsFuture.data.rows.filter( function(item) {
                return item.office_label == "City Council";
              });
              return '<a href="http://' + council[0].website + '" target="_blank">' +
                nth(council[0].district) + " Council District </a>";
            },
          },
          // {
          //   label: 'voting.topic.currentTerm',
          //   value: function(state) {
          //     const council = state.sources.electedOfficials.data.rows.filter( function(item) {
          //       return item.office_label == "City Council";
          //     });
          //     return council[0].next_election - 4 + ' - ' + council[0].next_election;
          //   },
          // },
        ],
      },
    }, // end table
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
