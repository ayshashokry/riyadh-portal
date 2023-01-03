import React from "react";

//Components
import SplitService from "./SplitService";
import GeoExplorerService from "./GeoExplorerService";
import SurveyingSketch from "./SurveyingSketch";
import EngOfficesService from "./EngOfficesService";
import PlansService from "./PlansService";
import UpdateInstrumentsService from "./UpdateInstrumentsService";
import BasemapManagementService from "./BasemapManagementService";
import MobileService from "./MobileService";
import DigitalPaintingMapsService from "./DigitalPaintingMapsService";
import SiteQueryService from "./SiteQueryService";
import SpatialDataRequestService from "./SpatialDataRequestService";
import MajorProjectsService from "./MajorProjectsService";
import OwnPropertyService from "./OwnPropertyService";
import MergeStreetsService from "./MergeStreetsService";
import PublicUtilityService from "./PublicUtilityService";
import OrganizationalAppendagesService from "./OrganizationalAppendagesService";
import ApprovedEngineeringOfficesService from "./ApprovedEngineeringOfficesService";
import RejectedEngineeringOfficesService from "./RejectedEngineeringOfficesService";

import { connect } from "react-redux";

function ServicePage(props) {
  return (
    <div>
      {props.location.pathname.substring(10) === "Split" ? (
        <SplitService isAuth={props.isAuth} />
      ) : props.location.pathname.substring(10) === "GeoExplorer" ? (
        <GeoExplorerService isAuth={props.isAuth} />
      ) : props.location.pathname.substring(10) === "SurveyingSketch" ? (
        <SurveyingSketch isAuth={props.isAuth} />
      ) : props.location.pathname.substring(10) === "engOffices" ? (
        <EngOfficesService isAuth={props.isAuth} />
      ) : props.location.pathname.substring(10) === "Plans" ? (
        <PlansService isAuth={props.isAuth} />
      ) : props.location.pathname.substring(10) === "UpdateInstruments" ? (
        <UpdateInstrumentsService isAuth={props.isAuth} />
      ) : props.location.pathname.substring(10) === "BasemapManagement" ? (
        <BasemapManagementService isAuth={props.isAuth} />
      ) : props.location.pathname.substring(10) === "MobileServices" ? (
        <MobileService isAuth={props.isAuth} />
      ) : props.location.pathname.substring(10) === "DigitalMaps" ? (
        <DigitalPaintingMapsService isAuth={props.isAuth} />
      ) : props.location.pathname.substring(10) === "SiteQuery" ? (
        <SiteQueryService isAuth={props.isAuth} />
      ) : props.location.pathname.substring(10) === "SpatialDataRequest" ? (
        <SpatialDataRequestService isAuth={props.isAuth} />
      ) : props.location.pathname.substring(10) === "MajorProjects" ? (
        <MajorProjectsService isAuth={props.isAuth} />
      ) : props.location.pathname.substring(10) === "PublicUtility" ? (
        <PublicUtilityService isAuth={props.isAuth} />
      ) : props.location.pathname.substring(10) ===
        "OrganizationalAppendages" ? (
        <OrganizationalAppendagesService isAuth={props.isAuth} />
      ) : props.location.pathname.substring(10) === "OwnProperty" ? (
        <OwnPropertyService isAuth={props.isAuth} />
      ) : props.location.pathname.substring(10) === "ApprovedOffices" ? (
        <ApprovedEngineeringOfficesService isAuth={props.isAuth} />
      ) : props.location.pathname.substring(10) === "rejectedOffices" ? (
        <RejectedEngineeringOfficesService isAuth={props.isAuth} />
      ) : props.location.pathname.substring(10) === "MergeStreets" ? (
        <MergeStreetsService isAuth={props.isAuth} />
      ) : null}
    </div>
  );
}
const mapStateToProps = function (state) {
  return {
    isAuth: state.auth.isAuth,
  };
};

export default connect(mapStateToProps)(ServicePage);
