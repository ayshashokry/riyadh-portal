window.__config = {
  prod: {
    ApiUrl: "https://webgis.eamana.gov.sa/GISAPIV2",
    hostURL: "https://webgis.eamana.gov.sa",
    filesURL: "https://webgis.eamana.gov.sa/GISAPI/",
    baseURI: "/gisnew",
    openWizardUrl:
      window.location.protocol + "//" + window.location.hostname + "/gisv2/",
    newTabShowWizardApps: [
      "addedparcels",
      "planapproval",
      "splitemargelabel",
      "gisservices",
      "tamlikakar",
    ],
  },
  prod_deploy: {
    ApiUrl: window.origin + "/GISAPIV2",
    hostURL: window.origin,
    filesURL: window.origin + "/GISAPI/",
    baseURI: "/gisnew",
    openWizardUrl:
      window.location.protocol + "//" + window.location.hostname + "/gisv2/",
    newTabShowWizardApps: [
      "addedparcels",
      "planapproval",
      "splitemargelabel",
      "gisservices",
      "tamlikakar",
    ],
  },
  stage: {
    ApiUrl: "http://77.30.168.86/gisapiryv2",
    hostURL: "http://77.30.168.86",
    testIP: "77.30.168.86",
    homepage: "/homery/",
    filesURL: "http://77.30.168.86/gisapiry/",
    baseURI: "/gisriyadh",
    openWizardUrl:
      window.location.protocol + "//" + window.location.hostname + "/gisv2/",
    newTabShowWizardApps: [
      "addedparcels",
      "planapproval",
      "splitemargelabel",
      "gisservices",
      "tamlikakar",
    ],
  },
  master: {
    ApiUrl: "http://77.30.168.86/gisapiryv2",
    hostURL: "http://77.30.168.86",
    APIHost: "http://77.30.168.86",
    testIP: "localhost:3002",
    homepage: "/homery/",
    filesURL: "http://77.30.168.86/gisapiry/",
    baseURI: "/gisriyadh",
    openWizardUrl:
      window.location.protocol + "//" + window.location.hostname + "/gisv2/",
    newTabShowWizardApps: [
      "addedparcels",
      "planapproval",
      "splitemargelabel",
      "gisservices",
      "tamlikakar",
    ],
  },
};
