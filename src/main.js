/*

____   ____     __                   ___ ___      ___.    
\   \ /   /____/  |_  ___________   /   |   \ __ _\_ |__  
 \   Y   /  _ \   __\/ __ \_  __ \ /    ~    \  |  \ __ \ 
  \     (  <_> )  | \  ___/|  | \/ \    Y    /  |  / \_\ \
   \___/ \____/|__|  \___  >__|     \___|_  /|____/|___  /
                         \/               \/           \/ 
*/


// turn off console logging in production
const { hostname='' } = location;
if (hostname !== 'localhost' && !hostname.match(/(\d+\.){3}\d+/)) {
  console.log = console.info = console.debug = console.error = function () {};
}

import i18n from './i18n/i18n.js';

// Font Awesome Icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { faDotCircle } from '@fortawesome/free-regular-svg-icons/faDotCircle';
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome';
import { faBook } from '@fortawesome/free-solid-svg-icons/faBook';
import { faWrench } from '@fortawesome/free-solid-svg-icons/faWrench';
import { faUniversity } from '@fortawesome/free-solid-svg-icons/faUniversity';
import { faGavel } from '@fortawesome/free-solid-svg-icons/faGavel';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons/faMapMarkerAlt';
import { faLandmark } from '@fortawesome/free-solid-svg-icons/faLandmark';
import { faBuilding } from '@fortawesome/free-solid-svg-icons/faBuilding';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons/faExclamationTriangle';
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';
import { faFlagUsa } from '@fortawesome/free-solid-svg-icons/faFlagUsa';
library.add(faFlagUsa, faEnvelope, faStar, faDotCircle, faHome, faBook, faWrench, faUniversity, faGavel, faMapMarkerAlt, faLandmark, faBuilding, faExclamationTriangle);

import accounting from 'accounting';
import mapboard from '@phila/mapboard/src/main.js';

// General Config Modules
import helpers from './util/helpers';
import map from './general/map';
import transforms from './general/transforms';
import parcels from './general/parcels';
import legendControls from './general/legendControls';
import imageOverlayGroups from './general/imageOverlayGroups';
import greeting from './general/greeting';

// data sources
import threeOneOneCarto from './data-sources/311-carto';
import condoList from './data-sources/condo-list';
import divisions from './data-sources/divisions';
import electedOfficials from './data-sources/elected-officials';
import electedOfficialsFuture from './data-sources/elected-officials-future';
import nextElectionAPI from './data-sources/election-next';
import opa from './data-sources/opa';
import pollingPlaces from './data-sources/polling-places';
import votingSites from './data-sources/voting-sites';

// Topics
import pollingPlace from './topics/polling-place.js';
import ballot from './topics/ballot.js';
import mailInVoting from './topics/mail-in-voting.js';
import officials from './topics/elected-officials.js';

import exclamationCallout from './components/ExclamationCallout';
import exclamationContentTopic from './components/ExclamationContentTopic';
import exclamationContentGreeting from './components/ExclamationContentGreeting';
import greetingDefault from './components/GreetingDefault';
import greetingPollingPlace from './components/GreetingPollingPlace';
import greetingBallot from './components/GreetingBallot';
import greetingMailInVoting from './components/GreetingMailInVoting';
import greetingElectedOfficials from './components/GreetingElectedOfficials';
import i18nBanner from '@phila/mapboard/src/components/i18nBanner.vue';

const customComps = {
  'exclamationCallout': exclamationCallout,
  'exclamationContentTopic': exclamationContentTopic,
  'exclamationContentGreeting': exclamationContentGreeting,
  'greetingdefault': greetingDefault,
  'greetingpolling-place': greetingPollingPlace,
  'greetingballot': greetingBallot,
  'greetingmail-in-voting': greetingMailInVoting,
  'greetingelected-officials': greetingElectedOfficials,
  'i18nBanner': i18nBanner,
};

// import 'phila-standards/dist/css/phila-app.min.css';
import './styles.css';

var BASE_CONFIG_URL = 'https://cdn.jsdelivr.net/gh/cityofphiladelphia/mapboard-default-base-config@ea6dd85bf8f82b6ff0d582b2e27cd47a53320ca6/config.js';

// configure accounting.js
accounting.settings.currency.precision = 0;

let pictApiKey, pictSecretKey;
const host = window.location.hostname;
if (host === 'cityatlas-dev.phila.gov') {
  pictApiKey = process.env.VUE_APP_DEV_PICTOMETRY_API_KEY;
  pictSecretKey = process.env.VUE_APP_DEV_PICTOMETRY_SECRET_KEY;
} else {
  pictApiKey = process.env.VUE_APP_PICTOMETRY_API_KEY;
  pictSecretKey = process.env.VUE_APP_PICTOMETRY_SECRET_KEY;
}

// console.log('atlas main.js about to call mapboard');

mapboard({
  // defaultAddress: '1234 MARKET ST',
  // plugin: true,
  // app: {},
  headerImg: 'philadelphia-city-commissioners-logo-edit_6.png',
  smallHeaderImg: 'philadelphia-city-commissioners-logo-edit_small_6_2.png',
  resetDataOnGeocode: true,
  customComps,
  header: {
    enabled: true,
    text: 'Voter Hub',
  },
  panels: [
    'topics',
    'map',
  ],
  router: {
    enabled: true,
    type: 'vue',
    // returnToDefaultTopicOnGeocode: false,
  },
  defaultAddressTextPlaceholder: {
    // text: "Search Address or 9-digit OPA Property Number",
    wideStyle: {
      'max-width': '100%',
      'font-size': '24px',
      'line-height': '28px',
    },
    narrowStyle: {
      'max-width': '100%',
      'font-size': '20px',
      'line-height': '24px',
    },
  },
  geolocation: {
    enabled: true,
    icon: [ 'far', 'dot-circle' ],
  },
  addressInput: {
    width: 415,
    mapWidth: 300,
    position: 'right',
    autocompleteEnabled: false,
    autocompleteMax: 15,
    placeholder: 'Search the map',
  },
  rootStyle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  gatekeeperKey: process.env.VUE_APP_GATEKEEPER_KEY,
  map,
  mbStyle: {
    glyphs: '//fonts.openmaptiles.org/{fontstack}/{range}.pbf',
  },
  // mbStyle,
  baseConfig: BASE_CONFIG_URL,
  parcels,
  imageOverlayGroups,
  legendControls,
  cyclomedia: {
    enabled: true,
    // orientation: 'horizontal',
    measurementAllowed: false,
    popoutAble: true,
    // recordingsUrl: 'https://atlas.cyclomedia.com/Recordings/wfs',
    recordingsUrl: 'https://atlasapi.cyclomedia.com/api/recording/wfs',
    username: process.env.VUE_APP_CYCLOMEDIA_USERNAME,
    password: process.env.VUE_APP_CYCLOMEDIA_PASSWORD,
    apiKey: process.env.VUE_APP_CYCLOMEDIA_API_KEY,
  },
  pictometry: {
    enabled: true,
    orientation: 'horizontal',
    iframeId: 'pictometry-ipa',
    apiKey: pictApiKey,
    secretKey: pictSecretKey,
  },
  transforms,
  greeting,
  dataSources: {
    threeOneOneCarto,
    condoList,
    divisions,
    electedOfficials,
    electedOfficialsFuture,
    nextElectionAPI,
    opa,
    pollingPlaces,
    votingSites,
    // crimeIncidents,
    // dorCondoList,
    // dorDocuments,
    // liBusinessLicenses,
    // liInspections,
    // liPermits,
    // liViolations,
    // nearbyZoningAppeals,
    // rco,
    // regmaps,
    // vacantIndicatorsPoints,
    // zoningAppeals,
    // zoningBase,
    // zoningDocs,
    // zoningDocsEclipse,
    // zoningOverlay,
    // charterSchools,
    // neighboringProperties,
  },
  topics: [
    ballot,
    pollingPlace,
    mailInVoting,
    officials,
  ],
  defaultTopic: 'ballot',
  components: [
    {
      type: 'topic-set',
      // options: {
      //   defaultTopic: 'polling-place',
      // },
    },
  ],
  // components: [
  //   {
  //     type: 'topic',
  //     key: 'voting',
  //     topicKey: 'voting',
  //     props: {
  //       topicKey: 'voting',
  //     },
  //     options: {
  //       topicKey: 'voting',
  //       // voting,
  //       // defaultTopic: 'property',
  //     },
  //   },
  // ],
  i18n: i18n.i18n,
});
