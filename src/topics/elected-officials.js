import transforms from '../general/transforms';
import { format, parseISO } from 'date-fns';
const phone = transforms.phoneNumber.transform;
const titleCase = transforms.titleCase.transform;
const nth = transforms.nth.transform;
let $t;

function formatMember(person, termLength, districtLabel) {
  
  const website = '<a href="https://' + person.website + '" target="_blank">' + person.first_name +" " + person.last_name + "</a>";
  
  let district;
  if (person.district != 0 && districtLabel) {
    district = nth(person.district);
  } else {
    district = '';
  }

  let addressLine1;
  if (person.main_contact_address_1) {
    addressLine1 = person.main_contact_address_1 || '';
  }
  let addressLine2;
  if (person.main_contact_address_2) {
    addressLine2 = person.main_contact_address_2 || '';
  }

  let city;
  if (person.main_contact_city != 'Philadelphia') {
    city = person.main_contact_city;
  }
  const state = person.main_contact_state || '';
  const zip = person.main_contact_zip || '';
  
  const phone1 = phone(person.main_contact_phone_1) || '';
  const phone2 = phone(person.main_contact_phone_2) || '';
  const fax = 'F: '+ phone(person.main_contact_fax) || '';
  const email = '<b><a href=mailto:"' + person.email + '">' + person.email + '</a></b>';
  const term = 'Current Term: ' + (person.next_election-termLength) + ' - ' + person.next_election;

  let returnString = website;
  if (district) {
    returnString += ' - ' + district + " " + districtLabel + '<br>';
  } else {
    returnString += '<br>';
  }

  if (addressLine1) {
    returnString += addressLine1 + '<br>';
  }
  if (addressLine2) {
    returnString += addressLine2 + '<br>';
  }

  if (city) {
    returnString += city + ', ' + state + ' ' + zip + '<br>';
  }
  
  returnString += phone1;
  if (phone2) {
    returnString += ", " + phone2 + '<br>';
  } else {
    returnString += '<br>';
  }
  if (person.main_contact_fax && person.main_contact_fax != '0') {
    returnString += fax + '<br>';
  }
  if (person.email) {
    returnString += email + '<br>';
  }
  returnString += term;

  return returnString;
}

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
              const councilMember = state.sources.electedOfficials.data.rows.filter(person => person.office_label == "City Council");
              const districtLabel = 'Council District';
              return formatMember(councilMember[0], 4, districtLabel);
            },
          },
          {
            label: 'electedOfficials.topic.verticalTable1.atLargeCouncilMembers',
            value: function(state) {
              const councilAtLarge = state.sources.electedOfficials.data.rows.filter(person => person.office == "city_council_at_large");
              let theString = '';
              for (const [ index, councilMember ] of councilAtLarge.entries()) {
                theString += formatMember(councilMember, 4);
                index < councilAtLarge.length - 1 ? theString += '<br><br>' : theString += '';
              }
              return theString;
            },
          },
          {
            label: 'electedOfficials.topic.verticalTable1.mayor',
            value: function(state) {
              const mayor = state.sources.electedOfficials.data.rows.filter(person => person.office == "mayor");
              return formatMember(mayor[0]);
            },
          },
          {
            label: 'electedOfficials.topic.verticalTable1.districtAttorney',
            value: function(state) {
              const districtAttorney = state.sources.electedOfficials.data.rows.filter(person => person.office == "district_attorney");
              return formatMember(districtAttorney[0], 4);
            },
          },
          {
            label: 'electedOfficials.topic.verticalTable1.controller',
            value: function(state) {
              const controller = state.sources.electedOfficials.data.rows.filter(person => person.office == "city_controller");
              return formatMember(controller[0], 4);
            },
          },
          {
            label: 'electedOfficials.topic.verticalTable1.cityCommissioners',
            value: function(state) {
              const commissioners = state.sources.electedOfficials.data.rows.filter(person => person.office == "city_commissioners");
              let theString = '';
              for (const [ index, commissioner ] of commissioners.entries()) {
                if (commissioner.last_name != null) {
                  theString += formatMember(commissioner, 4);
                  index < commissioners.length - 1 ? theString += '<br><br>' : theString += '';
                }
              }
              return theString;
            },
          },
          {
            label: 'electedOfficials.topic.verticalTable1.sheriff',
            value: function(state) {
              const sheriff = state.sources.electedOfficials.data.rows.filter(person => person.office == "sheriff");
              return formatMember(sheriff[0], 4);
            },
          },
          {
            label: 'electedOfficials.topic.verticalTable1.registerOfWills',
            value: function(state) {
              const registerOfWills = state.sources.electedOfficials.data.rows.filter(person => person.office == "register_of_wills");
              return formatMember(registerOfWills[0], 4);
            },
          },
        ],
      },
    }, // end table
    {
      type: 'vertical-table',
      options: {
        nullValue: 'None',
      },
      slots: {
        title: 'electedOfficials.topic.verticalTable2.title',
        fields: [
          {
            label: 'electedOfficials.topic.verticalTable2.stateHouseRepresentatives',
            value: function(state) {
              const stateHouse = state.sources.electedOfficials.data.rows.filter(person => person.office == "state_house");
              const districtLabel = 'District';
              return formatMember(stateHouse[0], 4, districtLabel);
            },
          },
          {
            label: 'electedOfficials.topic.verticalTable2.stateSenator',
            value: function(state) {
              const stateSenate = state.sources.electedOfficials.data.rows.filter(person => person.office == "state_senate");
              const districtLabel = 'District';
              return formatMember(stateSenate[0], 4, districtLabel);
            },
          },
          {
            label: 'electedOfficials.topic.verticalTable2.governor',
            value: function(state) {
              const governor = state.sources.electedOfficials.data.rows.filter(person => person.office == "governor");
              return formatMember(governor[0], 4);
            },
          },
          {
            label: 'electedOfficials.topic.verticalTable2.lieutenantGovernor',
            value: function(state) {
              const ltGovernor = state.sources.electedOfficials.data.rows.filter(person => person.office == "lt_governor");
              return formatMember(ltGovernor[0], 4);
            },
          },
          {
            label: 'electedOfficials.topic.verticalTable2.attorneyGeneral',
            value: function(state) {
              const attorneyGeneral = state.sources.electedOfficials.data.rows.filter(person => person.office == "attorney_general");
              return formatMember(attorneyGeneral[0], 4);
            },
          },
          {
            label: 'electedOfficials.topic.verticalTable2.stateTreasurer',
            value: function(state) {
              const stateTreasurer = state.sources.electedOfficials.data.rows.filter(person => person.office == "state_treasurer");
              return formatMember(stateTreasurer[0], 4);
            },
          },
          {
            label: 'electedOfficials.topic.verticalTable2.auditorGeneral',
            value: function(state) {
              const auditorGeneral = state.sources.electedOfficials.data.rows.filter(person => person.office == "auditor_general");
              return formatMember(auditorGeneral[0], 4);
            },
          },
        ],
      },
    },
    {
      type: 'vertical-table',
      options: {
        nullValue: 'None',
      },
      slots: {
        title: 'electedOfficials.topic.verticalTable3.title',
        fields: [
          {
            label: 'electedOfficials.topic.verticalTable3.congressionalRepresentative',
            value: function(state) {
              const usHouse = state.sources.electedOfficials.data.rows.filter(person => person.office == "us_house");
              return formatMember(usHouse[0], 2);
            },
          },
          {
            label: 'electedOfficials.topic.verticalTable3.senators',
            value: function(state) {
              const senators = state.sources.electedOfficials.data.rows.filter(person => person.office == "us_senate");
              let theString = '';
              // for (let senator of senators) {
              for (const [ index, senator ] of senators.entries()) {
                if (senator.last_name != null) {
                  theString += formatMember(senator, 6);
                  index < senators.length - 1 ? theString += '<br><br>' : theString += '';
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
