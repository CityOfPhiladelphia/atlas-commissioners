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
        // externalLink: {
        //   action: function() {
        //     return 'electedOfficials.topic.verticalTable1.link';
        //   },
        //   href: function(state) {
        //     return '//vote.phila.gov/voting/current-elected-officials/';
        //   },
        // },
      },
      slots: {
        title: 'electedOfficials.topic.verticalTable1.title',
        fields: [
          {
            label: 'electedOfficials.topic.verticalTable1.districtCouncilMember',
            value: function(state) {
              const council = state.sources.electedOfficials.data.rows.filter( function(item) {
                return item.office_label == "City Council";
              });
              return '<a href="http://' + council[0].website + '" target="_blank">' +
                council[0].first_name +" " +council[0].last_name + " - " + nth(council[0].district) + " Council District </a> <br>" +
                council[0].main_contact_address_2 + '<br>' +
                phone(council[0].main_contact_phone_1) + ", " + phone(council[0].main_contact_phone_2) + '<br>\
                F: '+ phone(council[0].main_contact_fax) + ' <br>\
                <b><a href=mailto:"' + council[0].email + '">' + council[0].email + '</a></b> <br>\
                Current Term: ' + (council[0].next_election-4) + ' - ' + council[0].next_election;
            },
            // Current Term ' + council[0].next_election - 4 + ' - ' + council[0].next_election;
          },
          {
            label: 'electedOfficials.topic.verticalTable1.atLargeCouncilMembers',
            value: function(state) {
              return 'test';
            },
          },
          {
            label: 'electedOfficials.topic.verticalTable1.mayor',
            value: function(state) {
              return 'mayor';
            },
          },
          {
            label: 'electedOfficials.topic.verticalTable1.districtAttorney',
            value: function(state) {
              return 'districtAttorney';
            },
          },
          {
            label: 'electedOfficials.topic.verticalTable1.controller',
            value: function(state) {
              return 'controller';
            },
          },
          {
            label: 'electedOfficials.topic.verticalTable1.cityCommissioners',
            value: function(state) {
              return 'city commissioners';
            },
          },
          {
            label: 'electedOfficials.topic.verticalTable1.sheriff',
            value: function(state) {
              return 'sheriff';
            },
          },
          {
            label: 'electedOfficials.topic.verticalTable1.registerOfWills',
            value: function(state) {
              return 'register of wills';
            },
          },
        ],
      },
    }, // end table
    {
      type: 'vertical-table',
      options: {
        nullValue: 'None',
        // externalLink: {
        //   action: function() {
        //     return 'electedOfficials.topic.verticalTable2.link';
        //   },
        //   href: function(state) {
        //     return '//vote.phila.gov/voting/current-elected-officials/';
        //   },
        // },
      },
      slots: {
        title: 'electedOfficials.topic.verticalTable2.title',
        fields: [
          {
            label: 'electedOfficials.topic.verticalTable2.stateHouseRepresentatives',
            value: function(state) {
              return 'state house representatives';
            },
          },
          {
            label: 'electedOfficials.topic.verticalTable2.stateSenator',
            value: function(state) {
              return 'state senator';
            },
          },
          {
            label: 'electedOfficials.topic.verticalTable2.governor',
            value: function(state) {
              return 'governor';
            },
          },
          {
            label: 'electedOfficials.topic.verticalTable2.lieutenantGovernor',
            value: function(state) {
              return 'lieutenant governor';
            },
          },
          {
            label: 'electedOfficials.topic.verticalTable2.attorneyGeneral',
            value: function(state) {
              return 'attorney general';
            },
          },
          {
            label: 'electedOfficials.topic.verticalTable2.stateTreasurer',
            value: function(state) {
              return 'state treasurer';
            },
          },
          {
            label: 'electedOfficials.topic.verticalTable2.auditorGeneral',
            value: function(state) {
              return 'auditor general';
            },
          },
        ],
      },
    },
    {
      type: 'vertical-table',
      options: {
        nullValue: 'None',
        // externalLink: {
        //   action: function() {
        //     return 'electedOfficials.topic.verticalTable2.link';
        //   },
        //   href: function(state) {
        //     return '//vote.phila.gov/voting/current-elected-officials/';
        //   },
        // },
      },
      slots: {
        title: 'electedOfficials.topic.verticalTable3.title',
        fields: [
          {
            label: 'electedOfficials.topic.verticalTable3.congressionalRepresentative',
            value: function(state) {
              return 'congressional representative';
            },
          },
          {
            label: 'electedOfficials.topic.verticalTable3.senators',
            value: function(state) {
              return 'senators';
            },
          },
          {
            label: 'electedOfficials.topic.verticalTable3.president',
            value: function(state) {
              return 'president and vice president';
            },
          },
        ],
      },
    },
    {
      type: 'callout',
      slots: {
        text: 'electedOfficials.topic.callout1.text',
      },
    },
    {
      type: 'vertical-table',
      options: {
        nullValue: 'None',
      },
      slots: {
        title: 'electedOfficials.topic.verticalTable4.title',
        fields: [
          {
            label: 'electedOfficials.topic.verticalTable4.wardAndDivision',
            value: function(state) {
              return 'ward and division';
            },
          },
          {
            label: 'electedOfficials.topic.verticalTable4.totalDivisions',
            value: function(state) {
              return 'total divisions';
            },
          },
          {
            label: 'electedOfficials.topic.verticalTable4.democraticWardLeader',
            value: function(state) {
              return 'democratic ward leader';
            },
          },
        ],
      },
    },
    {
      type: 'horizontal-table',
      options: {
        id: 'mailInVotingTable',
        fields: [
          {
            label: 'electedOfficials.topic.horizontalTable1.party',
            value: function(state, item) {
              return item.site_name;
            },
          },
          {
            label: 'electedOfficials.topic.horizontalTable1.name',
            value: function(state, item) {
              return item.site_name;
            },
          },
          {
            label: 'electedOfficials.topic.horizontalTable1.zipCode',
            value: function(state, item) {
              return item.site_name;
            },
          },
          {
            label: 'electedOfficials.topic.horizontalTable1.yearElected',
            value: function(state, item) {
              return item.site_name;
            },
          },
        ],
      },
      slots: {
        title: 'electedOfficials.topic.horizontalTable1.title',
        data: 'pollingPlaces',
        items: function(state) {
          var data = state.sources.pollingPlaces.data.rows || [];
          console.log('data:', data);
          var rows = data.map(function(row){
            var itemRow = row;
            // var itemRow = Object.assign({}, row);
            return itemRow;
          });
          return rows;
        },
      },

    },
  ],
  basemap: 'pwd',
  identifyFeature: 'address-marker',
  parcels: 'pwd',
};
