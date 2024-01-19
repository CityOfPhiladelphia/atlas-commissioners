export default {
  id: 'voting-sites',
  type: 'http-get-nearby',
  dependent: 'none',
  resettable: false,
  url: 'https://phl.carto.com:443/api/v2/sql',
  options: {
    table: 'voting_sites',
    distances: 5000,
    // params: {
    // q: "select * from voting_sites where temporary_closure = 'FALSE' and site_approved = 'TRUE'",
    // },
  },
};
