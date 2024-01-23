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
              return '<a href="https://' + council[0].website + '" target="_blank">' +
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
              const councilAtLarge = state.sources.electedOfficials.data.rows.filter( function(item) {
                return item.office == "city_council_at_large";
              });
              let theString = '';
              for (let councilMember of councilAtLarge) {
                if (councilMember.last_name != null) {
                  theString += '<a href="https://' + councilMember.website + '" target="_blank">' +
                  councilMember.first_name + " " + councilMember.last_name + '</a><br>';
                }
              }
              return theString;
            },
          },
          {
            label: 'electedOfficials.topic.verticalTable1.mayor',
            value: function(state) {
              const mayor = state.sources.electedOfficials.data.rows.filter( function(item) {
                return item.office == "mayor";
              });
              return '<a href="https://' + mayor[0].website + '" target="_blank">' +
              mayor[0].first_name + " " + mayor[0].last_name + '</a><br>';
            },
          },
          {
            label: 'electedOfficials.topic.verticalTable1.districtAttorney',
            value: function(state) {
              const districtAttorney = state.sources.electedOfficials.data.rows.filter( function(item) {
                return item.office == "district_attorney";
              });
              return '<a href="https://' + districtAttorney[0].website + '" target="_blank">' +
              districtAttorney[0].first_name + " " + districtAttorney[0].last_name + '</a><br>';
            },
          },
          {
            label: 'electedOfficials.topic.verticalTable1.controller',
            value: function(state) {
              const controller = state.sources.electedOfficials.data.rows.filter( function(item) {
                return item.office == "city_controller";
              });
              return '<a href="' + controller[0].website + '" target="_blank">' +
              controller[0].first_name + " " + controller[0].last_name + '</a><br>';
            },
          },
          {
            label: 'electedOfficials.topic.verticalTable1.cityCommissioners',
            value: function(state) {
              const commissioners = state.sources.electedOfficials.data.rows.filter( function(item) {
                return item.office == "city_commissioners";
              });
              let theString = '';
              for (let commissioner of commissioners) {
                if (commissioner.last_name != null) {
                  theString += '<a href="' + commissioner.website + '" target="_blank">' +
                  commissioner.first_name + " " + commissioner.last_name + '</a><br>';
                }
              }
              return theString;
            },
          },
          {
            label: 'electedOfficials.topic.verticalTable1.sheriff',
            value: function(state) {
              const sheriff = state.sources.electedOfficials.data.rows.filter( function(item) {
                return item.office == "sheriff";
              });
              return '<a href="https://' + sheriff[0].website + '" target="_blank">' +
              sheriff[0].first_name + " " + sheriff[0].last_name + '</a><br>';
            },
          },
          {
            label: 'electedOfficials.topic.verticalTable1.registerOfWills',
            value: function(state) {
              const registerOfWills = state.sources.electedOfficials.data.rows.filter( function(item) {
                return item.office == "register_of_wills";
              });
              return '<a href="https://' + registerOfWills[0].website + '" target="_blank">' +
              registerOfWills[0].first_name + " " + registerOfWills[0].last_name + '</a><br>';
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
              const stateHouse = state.sources.electedOfficials.data.rows.filter( function(item) {
                return item.office == "state_house";
              });
              return '<a href="https://' + stateHouse[0].website + '" target="_blank">' +
                stateHouse[0].first_name +" " +stateHouse[0].last_name + " - " + nth(stateHouse[0].district) + " District </a> <br>" +
                stateHouse[0].main_contact_address_2 + '<br>' +
                phone(stateHouse[0].main_contact_phone_1) + ", " + phone(stateHouse[0].main_contact_phone_2) + '<br>\
                F: '+ phone(stateHouse[0].main_contact_fax) + ' <br>\
                <b><a href=mailto:"' + stateHouse[0].email + '">' + stateHouse[0].email + '</a></b> <br>\
                Current Term: ' + (stateHouse[0].next_election-4) + ' - ' + stateHouse[0].next_election;
            },
          },
          {
            label: 'electedOfficials.topic.verticalTable2.stateSenator',
            value: function(state) {
              const stateSenate = state.sources.electedOfficials.data.rows.filter( function(item) {
                return item.office == "state_senate";
              });
              return '<a href="https://' + stateSenate[0].website + '" target="_blank">' +
                stateSenate[0].first_name +" " +stateSenate[0].last_name + " - " + nth(stateSenate[0].district) + " District </a> <br>" +
                stateSenate[0].main_contact_address_1 + '<br>' +
                stateSenate[0].main_contact_address_2 + '<br>' +
                phone(stateSenate[0].main_contact_phone_1) + ", " + phone(stateSenate[0].main_contact_phone_2) + '<br>\
                F: '+ phone(stateSenate[0].main_contact_fax) + ' <br>\
                <b><a href=mailto:"' + stateSenate[0].email + '">' + stateSenate[0].email + '</a></b> <br>\
                Current Term: ' + (stateSenate[0].next_election-4) + ' - ' + stateSenate[0].next_election;
            },
          },
          {
            label: 'electedOfficials.topic.verticalTable2.governor',
            value: function(state) {
              const governor = state.sources.electedOfficials.data.rows.filter( function(item) {
                return item.office == "governor";
              });
              return '<a href="https://' + governor[0].website + '" target="_blank">' +
              governor[0].first_name + " " + governor[0].last_name + '</a><br>';
            },
          },
          {
            label: 'electedOfficials.topic.verticalTable2.lieutenantGovernor',
            value: function(state) {
              const ltGovernor = state.sources.electedOfficials.data.rows.filter( function(item) {
                return item.office == "lt_governor";
              });
              return '<a href="https://' + ltGovernor[0].website + '" target="_blank">' +
              ltGovernor[0].first_name + " " + ltGovernor[0].last_name + '</a><br>';
            },
          },
          {
            label: 'electedOfficials.topic.verticalTable2.attorneyGeneral',
            value: function(state) {
              const attorneyGeneral = state.sources.electedOfficials.data.rows.filter( function(item) {
                return item.office == "attorney_general";
              });
              return '<a href="https://' + attorneyGeneral[0].website + '" target="_blank">' +
              attorneyGeneral[0].first_name + " " + attorneyGeneral[0].last_name + '</a><br>';
            },
          },
          {
            label: 'electedOfficials.topic.verticalTable2.stateTreasurer',
            value: function(state) {
              const stateTreasurer = state.sources.electedOfficials.data.rows.filter( function(item) {
                return item.office == "state_treasurer";
              });
              return '<a href="https://' + stateTreasurer[0].website + '" target="_blank">' +
              stateTreasurer[0].first_name + " " + stateTreasurer[0].last_name + '</a><br>';
            },
          },
          {
            label: 'electedOfficials.topic.verticalTable2.auditorGeneral',
            value: function(state) {
              const auditorGeneral = state.sources.electedOfficials.data.rows.filter( function(item) {
                return item.office == "auditor_general";
              });
              return '<a href="https://' + auditorGeneral[0].website + '" target="_blank">' +
              auditorGeneral[0].first_name + " " + auditorGeneral[0].last_name + '</a><br>';
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
              const usHouse = state.sources.electedOfficials.data.rows.filter( function(item) {
                return item.office == "us_house";
              });
              return '<a href="https://' + usHouse[0].website + '" target="_blank">' +
                usHouse[0].first_name +" " +usHouse[0].last_name + " - " + nth(usHouse[0].district) + " District </a> <br>" +
                usHouse[0].main_contact_address_2 + '<br>' +
                phone(usHouse[0].main_contact_phone_1) + ", " + phone(usHouse[0].main_contact_phone_2) + '<br>\
                F: '+ phone(usHouse[0].main_contact_fax) + ' <br>\
                <b><a href=mailto:"' + usHouse[0].email + '">' + usHouse[0].email + '</a></b> <br>\
                Current Term: ' + (usHouse[0].next_election-4) + ' - ' + usHouse[0].next_election;
            },
          },
          {
            label: 'electedOfficials.topic.verticalTable3.senators',
            value: function(state) {
              const senators = state.sources.electedOfficials.data.rows.filter( function(item) {
                return item.office == "us_senate";
              });
              let theString = '';
              for (let senator of senators) {
                if (senator.last_name != null) {
                  theString += '<a href="https://' + senator.website + '" target="_blank">' +
                  senator.first_name + " " + senator.last_name + '</a><br>';
                }
              }
              return theString;
            },
          },
          {
            label: 'electedOfficials.topic.verticalTable3.president',
            value: function(state) {
              return '<a href="https://www.whitehouse.gov/administration/president-biden/" target="_blank">Joseph Biden</a><br> \
              <a href="https://www.whitehouse.gov/administration/vice-president-harris/" target="_blank">Kamala Harris</a>';
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
