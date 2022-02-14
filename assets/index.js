//containers
var div = document.querySelector("#plants");

apiUrl =
  "https://www.usanpn.org/npn_portal/observations/getSummarizedData.json?&start_date=2021-01-01&end_date=2021-12-10&state=OR&kingdom=Plantae&request_src=rest_test";

//console log all plants in Oregon (407)
fetch(apiUrl).then(function (response) {
  response.json().then(function (data) {
    console.log(data);
    displayStats(data);
  });
});

var displayStats = function (data) {
  for (var i = 0; i < 20; i++) {
    var liEl = document.createElement("li");
    liEl.innerHTML = data[i].common_name
    // var phenophase = data[i].phenophase_description;
    div.appendChild(liEl);
  }
};

//functionality: enter area, list of plants currently in season.

//Summarized details (individual id is not the same as species id) itis_taxonomic_sn?
//https://www.usanpn.org/npn_portal/observations/getSummarizedData.json?&start_date=2021-01-01&end_date=2021-12-10&state=OR&kingdom=Plantae&request_src=rest_test

// phenophase_category
// Leaves [for plants]|Flowers [for plants]|Fruits [for plants]|Needles [for plants]|Pollen cones [for plants]|Seed cones [for plants]

//**preliminary plan**
//enter state = all stations in state
//feed station id(s) to get individuals at station(s)
//feed individual id(s) to plant details by id(s)

//other options:
//getspeciesbystate

//OR plants:
//http://www.usanpn.org/npn_portal/species/getSpeciesByState.xml?state=OR&kingdom=Plantae

//getAllObservationsForSpecies:
//for loop for OR plant ID and date range should be within the season.
//I want to understand phenophase_id more
//http://www.usanpn.org/npn_portal/observations/getAllObservationsForSpecies.json?species_id[0]=52&species_id[1]=53&start_date=2021-01-01&end_date=2021-12-13

//eventual data output: common_name, genus, species

//use common name > iNaturalist photo
