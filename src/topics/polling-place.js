import transforms from '../general/transforms';
import { format, parseISO } from 'date-fns';
const phone = transforms.phoneNumber.transform;
const titleCase = transforms.titleCase.transform;
const nth = transforms.nth.transform;
let $t;

export default {
  key: 'polling-place',
  icon: 'building',
  label: 'Polling place',
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
          // frontIcon: 'exclamation-triangle',
          action: function() {
            return 'pollingPlace.topic.verticalTable1.link';
          },
          href: function() {
            return '//vote.phila.gov/voting/vote-by-mail/';
          },
        },
      },
      slots: {
        // title: 'voting.topic.pollingPlace',
        fields: [
          {
            label: 'pollingPlace.topic.location',
            value: function(state) {
              if (state.sources.pollingPlaces.data && state.sources.pollingPlaces.data.rows.length) {
                const pollingData = state.sources.pollingPlaces.data.rows[0];
                // console.log('state.sources.pollingPlaces.data.rows', state.sources.pollingPlaces.data.rows, 'pollingData:', pollingData);
                return "<b>Ward " + pollingData.ward +
                ", Division " + pollingData.division + "</b><br>" +
                titleCase(pollingData.placename) + "<br>" +
                titleCase(pollingData.street_address) + "<br>\
                ";
              }
            },
          },
          {
            label: 'pollingPlace.topic.hours',
            value: 'default.introPage.p4',
          },
          {
            label: 'pollingPlace.topic.accessibility',
            value: function(state) {
              if (state.sources.pollingPlaces.data && state.sources.pollingPlaces.data.rows.length) {
                const pollingData = state.sources.pollingPlaces.data.rows[0];
                const answer = pollingData.accessibility_code== "F" ? 'pollingPlace.topic.accessibilityCodes.buildingFullyAccessible' :
                  pollingData.accessibility_code== "B" ? 'pollingPlace.topic.accessibilityCodes.buildingSubstantiallyAccessible' :
                    pollingData.accessibility_code== "M" ? 'pollingPlace.topic.accessibilityCodes.buildingAccessibilityModified' :
                      pollingData.accessibility_code== "A" ? 'pollingPlace.topic.accessibilityCodes.alternateEntrance' :
                        pollingData.accessibility_code== "R" ? 'pollingPlace.topic.accessibilityCodes.buildingAccessibleWithRamp' :
                          pollingData.accessibility_code== "N" ? 'pollingPlace.topic.accessibilityCodes.buildingNotAccessible' :
                            'pollingPlace.topic.accessibilityCodes.informationNotAvailable';
                return answer;
                // return '<a href="//www.philadelphiavotes.com/en/voters/polling-place-accessibility"\
                //         target="_blank">'+answer+'</a>';
              }
            },
            link: 'https://vote.phila.gov/voting/voting-at-the-polls/polling-place-accessibility/',
          },
          {
            label: 'pollingPlace.topic.parking',
            value: function(state) {
              if (state.sources.pollingPlaces.data) {
                const pollingData = state.sources.pollingPlaces.data;
                const parking = pollingData.parking_code == "N" ? 'pollingPlace.topic.parkingCodes.noParking' :
                  pollingData.parking_code == "G" ? 'pollingPlace.topic.parkingCodes.generalParking' :
                    pollingData.parking_code == "L" ? 'pollingPlace.topic.parkingCodes.loadingZone' :
                      'pollingPlace.topic.accessibilityCodes.informationNotAvailable';
                return parking;
              }
            },
          },
          {
            label: 'pollingPlace.topic.lastUpdated',
            value: function(state) {
              if (state.sources.pollingPlaces.data) {
                return 'pollingPlace.topic.lastUpdatedSentence';
              }
            },
          },
        ],
      },
    },
    // {
    //   type: 'externalLink',
    //   options: {
    //     // data: '<i class="fas fa-exclamation-triangle"></i> pollingplace.topic.externalLink1',
    //     data: 'pollingPlace.topic.externalLink1',
    //     frontIcon: 'exclamation-triangle',
    //   },
    // },
  ],
  zoomToShape: [ 'geojsonForTopic', 'markersForTopic' ],
  geojsonForTopic: {
    data: function(state) {
      return state.sources.divisions.data;
    },
    key: 'id',
    style: {
      fillColor: '#9e9ac8',
      color: '#9e9ac8',
      weight: 2,
      opacity: 1,
      fillOpacity: 0.3,
    },
  },
  markersForTopic: {
    data: function(state) {
      if (state.sources.pollingPlaces.data) {
        return state.sources.pollingPlaces.data.rows[0];
      }
      return null;

    },
    lat: 'lat',
    lng: 'lng',
    key: 'STREET_ADDRESS',
    color: '#54278f',
    icon: {
      prefix: 'fas',
      icon: 'landmark',
      shadow: false,
      size: '2x',
    },
  },
  basemap: 'pwd',
  identifyFeature: 'address-marker',
  parcels: 'pwd',
};
