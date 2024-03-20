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
  dataSources: [ 'votingSites' ],
  errorMessage: function() {
    return 'No voting assignment found for this address.';
  },
  components: [
    {
      type: 'exclamation-callout',
      slots: {
        text: 'mailInVoting.topic.exclamationCallout1.p1',
      },
    },
    {
      type: 'vertical-table',
      slots: {
        title: 'mailInVoting.topic.table1.title',
      },
    },

    {
      type: 'paragraph',
      slots: {
        text: 'mailInVoting.topic.paragraph1.text',
        vshowProp: true,
      },
    },

    {
      type: 'any-header',
      options: {
        headerType: 'h4',
        style: 'font-weight: bold;',
      },
      slots: {
        text: 'mailInVoting.topic.h4_1',
      },
    },

    {
      type: 'paragraph',
      slots: {
        text: 'mailInVoting.topic.paragraph2.text',
        vshowProp: true,
      },
    },

    {
      type: 'unordered-list',
      // options: {
      //   style: 'list-style: initial',
      // },
      slots: {
        listItems: [
          'mailInVoting.topic.ul1.li1',
          'mailInVoting.topic.ul1.li2',
          'mailInVoting.topic.ul1.li3',
        ],
      },
    },

    {
      type: 'paragraph',
      slots: {
        text: 'mailInVoting.topic.paragraph3.text',
        vshowProp: true,
      },
    },

    {
      type: 'horizontal-table',
      options: {
        id: 'mailInVotingTable',
        sort: {
          select: true,
          sortFields: [
            'distance',
            'location',
            // 'date',
          ],
          getValue: function(item, sortField) {
            var val;
            if (sortField === 'location' || !sortField) {
              val = item.site_name;
            } else if (sortField === 'distance') {
              val = item.distance;
            }
            return val;
          },
          order: function(sortField) {
            var val;
            // if (sortField === 'date') {
            //   val = 'desc';
            // } else {
            val = 'asc';
            // }
            return val;
          },
        },
        // filters: [
        //   {
        //     type: 'time',
        //     getValue: function(item) {
        //       return item.requested_datetime;
        //     },
        //     label: 'From the last',
        //     values: [
        //       {
        //         label: '30 days',
        //         value: '30',
        //         unit: 'days',
        //         direction: 'subtract',
        //       },
        //       {
        //         label: '90 days',
        //         value: '90',
        //         unit: 'days',
        //         direction: 'subtract',
        //       },
        //       {
        //         label: 'year',
        //         value: '1',
        //         unit: 'years',
        //         direction: 'subtract',
        //       },
        //     ],
        //   },
        // ],
        filterByText: {
          label: 'Filter by',
          fields: [
            'service_name',
            'address',
          ],
        },
        mapOverlay: {
          marker: 'circle',
          style: {
            radius: 6,
            fillColor: '#ff3f3f',
            borderColor: '#ff3f3f',
            color: '#ff0000',
            weight: 1,
            opacity: 1,
            fillOpacity: 1.0,
            'z-index': 1,
          },
          hoverStyle: {
            radius: 6,
            fillColor: 'yellow',
            borderColor: '#ff3f3f',
            color: '#ff0000',
            weight: 1,
            opacity: 1,
            fillOpacity: 1.0,
            'z-index': 2,
          },
        },
        fields: [
          {
            label: 'mailInVoting.topic.horizontalTable1.location',
            value: function(state, item) {
              let name = item.site_name;
              name += '<br>' + item.street_address;
              return name;
              // return item.site_name += '<br>test';
            },
          },
          {
            label: 'mailInVoting.topic.horizontalTable1.typeAndHours',
            value: function(state, item) {
              // if (item.media_url) {
              //   return '<a target="_blank" href='+item.media_url+'>'+item.service_name+'</a>';
              // }
              let type = item.site_type;
              type += '<br>(Location dates and hours here)';
              return type;

            },
          },
          {
            label: 'mailInVoting.topic.horizontalTable1.distance',
            value: function(state, item) {
              return (parseInt(item.distance)/5280).toFixed(2) + ' mi';
            },
          },
        ],
      },
      slots: {
        title: 'mailInVoting.topic.horizontalTable1.title',
        data: 'votingSites',
        items: function(state) {
          var data = state.sources['votingSites'].data || [];
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
  zoom: 12,
  // zoomToShape: [ 'reactiveCircleMarkers' ],
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
