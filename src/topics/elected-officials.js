import transforms from '../general/transforms';
import { format, parseISO } from 'date-fns';
const phone = transforms.phoneNumber.transform;
const titleCase = transforms.titleCase.transform;
const nth = transforms.nth.transform;
let $t;

export default {
  key: 'elected-officials',
  icon: 'flag-usa',
  label: 'Elected Officials',
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
            return 'electedOfficials.topic.verticalTable2.link';
          },
          href: function(state) {
            return '//vote.phila.gov/voting/current-elected-officials/';
          },
        },
      },
      slots: {
        title: 'electedOfficials.topic.electedRep',
        fields: [
          {
            label: 'electedOfficials.topic.districtCouncilMember',
            value: function(state) {
              const council = state.sources.electedOfficials.data.rows.filter( function(item) {
                return item.office_label == "City Council";
              });
              return '<a href="http://' + council[0].website + '" target="_blank">' +
                council[0].first_name +" " +council[0].last_name + " - " + nth(council[0].district) + " Council District </a>";
            },
          },
          {
            label: 'electedOfficials.topic.cityHallOffice',
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
            label: 'electedOfficials.topic.currentTerm',
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
        subtitle: 'electedOfficials.topic.redistrictingSubtitle',
        // subtitle: 'Some addresses will be represented by a new city council district starting in 2024. Residents will vote in the new district in the 2023 primary and general elections.',
        nullValue: 'None',
        externalLink: {
          action: function() {
            // return 'Read more about the redistricting process ';
            return 'electedOfficials.topic.redistrictingProcess';
          },
          href: function(state) {
            return '//seventy.org/issues-index/council-redistricting';
            // return '//www.philadelphiavotes.com/en/voters/elected-officials';
          },
        },
      },

      slots: {
        title: 'electedOfficials.topic.cityCouncilRedistricting',
        fields: [
          {
            label: 'electedOfficials.topic.oldCityCouncilDistrict',
            value: function(state) {
              const council = state.sources.electedOfficials.data.rows.filter( function(item) {
                return item.office_label == "City Council";
              });
              return '<a href="http://' + council[0].website + '" target="_blank">' +
                nth(council[0].district) + " Council District </a>";
            },
          },
          {
            label: 'electedOfficials.topic.newCityCouncilDistrict',
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
    // {
    //   type: 'vertical-table',
    //   options: {
    //     condition: function(state) {
    //       console.log('state:', state);
    //       let og = state.sources.electedOfficials.data.rows.filter( function(item) {
    //         return item.office_label == "City Council";
    //       });
    //       let newVal = state.sources.electedOfficialsFuture.data.rows.filter( function(item) {
    //         return item.office_label == "City Council";
    //       });
    //       console.log('condition test, og:', og, 'newVal:', newVal);
    //
    //       let val = false;
    //       if (og[0].district !== newVal[0].district) {
    //         val = true;
    //       }
    //       return val;
    //     },
    //     nullValue: 'None',
    //     externalLink: {
    //       action: function() {
    //         return 'electedOfficials.topic.verticalTable2.link';
    //       },
    //       href: function(state) {
    //         return '//www.philadelphiavotes.com/en/voters/elected-officials';
    //       },
    //     },
    //   },
    //
    //   slots: {
    //     title: 'electedOfficials.topic.electedRepFuture',
    //     fields: [
    //       {
    //         label: 'electedOfficials.topic.districtCouncilMember',
    //         value: function(state) {
    //           const council = state.sources.electedOfficialsFuture.data.rows.filter( function(item) {
    //             return item.office_label == "City Council";
    //           });
    //           return '<a href="http://' + council[0].website + '" target="_blank">' +
    //             council[0].first_name +" " +council[0].last_name + " - " + nth(council[0].district) + " Council District </a>";
    //         },
    //       },
    //       {
    //         label: 'electedOfficials.topic.cityHallOffice',
    //         value: function(state) {
    //           const council = state.sources.electedOfficialsFuture.data.rows.filter( function(item) {
    //             return item.office_label == "City Council";
    //           });
    //           return council[0].main_contact_address_2 + '<br>' +
    //                  phone(council[0].main_contact_phone_1) + ", " + phone(council[0].main_contact_phone_2) + '<br>\
    //                   F: '+ phone(council[0].main_contact_fax) + ' <br>\
    //                   <b><a href=mailto:"' + council[0].email + '">' + council[0].email + '</a></b>';
    //         },
    //       },
    //       {
    //         label: 'electedOfficials.topic.term',
    //         value: function(state) {
    //           const council = state.sources.electedOfficialsFuture.data.rows.filter( function(item) {
    //             return item.office_label == "City Council";
    //           });
    //           return council[0].next_election - 4 + ' - ' + council[0].next_election;
    //         },
    //       },
    //     ],
    //   },
    // }, // end table
  ],
  basemap: 'pwd',
  identifyFeature: 'address-marker',
  parcels: 'pwd',
};
