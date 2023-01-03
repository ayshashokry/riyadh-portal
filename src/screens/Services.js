import React, { useEffect } from "react";

//Packages
import { Container } from "react-bootstrap";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";
//Icons
import t2helEngOffice from "../assets/images/HomeServicesIcons/t2helEngOffices.svg";
import plansArchive from "../assets/images/HomeServicesIcons/plansArchive.svg";
import instrumentsUpdate from "../assets/images/HomeServicesIcons/instrumentsUpdate.svg";
import arealReports from "../assets/images/HomeServicesIcons/arealReports.svg";
import OrganizationalAppendages from "../assets/images/HomeServicesIcons/OrganizationalAppendages.svg";
import siteInquiry from "../assets/images/HomeServicesIcons/siteInquiry.svg";
import transationStudy from "../assets/images/HomeServicesIcons/transationStudy.svg";
import bigProjects from "../assets/images/HomeServicesIcons/bigProjects.svg";
import administrationCirculars from "../assets/images/HomeServicesIcons/administrationCirculars.svg";
import requirementsProgramming from "../assets/images/HomeServicesIcons/requirementsProgramming.svg";
import transactionsDocumntation from "../assets/images/HomeServicesIcons/transactionsDocumntation.svg";
import statApp from "../assets/images/HomeServicesIcons/statApp.svg";

import NavBarr from "../containers/NavBarr";
import Footer from "../containers/Footer";

export default function Services() {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <div className="goalsPage ">
      <NavBarr />
      <div className="goalsHeader">
        <div className=" pt-5 pb-3 px-5 mr-lg-5">
          <span className="span1">
            <Link to="/"> الرئيسية </Link>
            .خدماتنا .
          </span>
          <span className="span2">دليل الخدمات </span>
          <h1> دليل الخدمات</h1>
        </div>
      </div>
      <div className="goals servicesIcons">
        <Container>
          {" "}
          {
          window.origin.includes(window.testIP) ? (
            <Row className="my-5">
              <Col
                xs={{ span: 24 }}
                md={{ span: 12 }}
                lg={{ span: 6 }}
                className="p-3"
              >
                <Link to="Services/engOffices">
                  <div className="goalItem pb-2">
                    <div>
                      <img src={t2helEngOffice} alt="engOffices" />
                    </div>
                    <h6 className="pt-4">تأهيل المكاتب الهندسية</h6>
                  </div>
                </Link>
              </Col>
              <Col
                xs={{ span: 24 }}
                md={{ span: 12 }}
                lg={{ span: 6 }}
                className="p-3"
              >
                <Link to="Services/UpdateInstruments">
                  <div className="goalItem pb-2">
                    <div>
                      <img src={instrumentsUpdate} alt="UpdateInstruments" />
                    </div>
                    <h6 className="pt-4">تحديث الصكوك</h6>
                  </div>
                </Link>
              </Col>
              <Col
                xs={{ span: 24 }}
                md={{ span: 12 }}
                lg={{ span: 6 }}
                className="p-3"
              >
                <Link to="Services/SurveyingSketch">
                  <div className="goalItem pb-2">
                    <div>
                      <img src={arealReports} alt="SpatialDataRequest" />
                    </div>
                    <h6 className="pt-4">تقارير مساحية</h6>
                  </div>
                </Link>
              </Col>
              <Col
                xs={{ span: 24 }}
                md={{ span: 12 }}
                lg={{ span: 6 }}
                className="p-3"
              >
                {/* <Link to="Services/Split"> */}
                <div className="goalItem pb-2 servNoLink">
                  <div className="servNoLinkOverlay">
                    <p>تحت التطوير</p>
                  </div>
                  <div>
                    <img src={OrganizationalAppendages} alt="split" />
                  </div>
                  <h6 className="pt-4">الزوائد التنظيمية</h6>
                </div>
                {/* </Link> */}
              </Col>
              <Col
                xs={{ span: 24 }}
                md={{ span: 12 }}
                lg={{ span: 6 }}
                className="p-3"
              >
                {/* <Link to="Services/GeoExplorer"> */}
                <div className="goalItem pb-2 servNoLink">
                  {" "}
                  <div className="servNoLinkOverlay">
                    <p>تحت التطوير</p>
                  </div>
                  <div>
                    <img src={siteInquiry} alt="GeoExplorer" />
                  </div>
                  <h6 className="pt-4">إستعلام عن موقع بحد النطاق العمرانى</h6>
                </div>
                {/* </Link> */}
              </Col>
              <Col
                xs={{ span: 24 }}
                md={{ span: 12 }}
                lg={{ span: 6 }}
                className="p-3"
              >
                {/* <Link to="Services/SurveyingSketch"> */}
                <div className="goalItem pb-2 servNoLink">
                  {" "}
                  <div className="servNoLinkOverlay">
                    <p>تحت التطوير</p>
                  </div>
                  <div>
                    <img src={transationStudy} alt="SurveyingSketch" />
                  </div>
                  <h6 className="pt-4">دراسة المعاملات </h6>
                </div>
                {/* </Link> */}
              </Col>
              <Col
                xs={{ span: 24 }}
                md={{ span: 12 }}
                lg={{ span: 6 }}
                className="p-3"
              >
                {/* <Link to="Services/EngineeringOffices"> */}
                <div className="goalItem pb-2 servNoLink">
                  {" "}
                  <div className="servNoLinkOverlay">
                    <p>تحت التطوير</p>
                  </div>
                  <div>
                    <img src={bigProjects} alt="EngOfficesApproval" />
                  </div>
                  <h6 className="pt-4">المشاريع الكبرى</h6>
                </div>
                {/* </Link> */}
              </Col>
              <Col
                xs={{ span: 24 }}
                md={{ span: 12 }}
                lg={{ span: 6 }}
                className="p-3"
              >
                {/* <Link to="Services/Plans"> */}
                <div className="goalItem pb-2 servNoLink">
                  {" "}
                  <div className="servNoLinkOverlay">
                    <p>تحت التطوير</p>
                  </div>
                  <div>
                    <img src={administrationCirculars} alt="plans" />
                  </div>
                  <h6 className="pt-4">دراسة تعاميم الإدارة</h6>
                </div>
                {/* </Link> */}
              </Col>
              <Col
                xs={{ span: 24 }}
                md={{ span: 12 }}
                lg={{ span: 6 }}
                className="p-3"
              >
                {/* <Link to="Services/UpdateInstruments"> */}
                <div className="goalItem pb-2 servNoLink">
                  {" "}
                  <div className="servNoLinkOverlay">
                    <p>تحت التطوير</p>
                  </div>
                  <div>
                    <img
                      src={requirementsProgramming}
                      alt="UpdateInstruments"
                    />
                  </div>
                  <h6 className="pt-4">برمجة الاشتراطات</h6>
                </div>
                {/* </Link> */}
              </Col>
              <Col
                xs={{ span: 24 }}
                md={{ span: 12 }}
                lg={{ span: 6 }}
                className="p-3"
              >
                {/* <Link to="Services/BasemapManagement"> */}
                <div className="goalItem pb-2 servNoLink">
                  {" "}
                  <div className="servNoLinkOverlay">
                    <p>تحت التطوير</p>
                  </div>
                  <div>
                    <img src={transactionsDocumntation} alt="basemapManage" />
                  </div>
                  <h6 className="pt-4">توثيق المعاملات</h6>
                </div>
                {/* </Link> */}
              </Col>
              <Col
                xs={{ span: 24 }}
                md={{ span: 12 }}
                lg={{ span: 6 }}
                className="p-3"
              >
                {/* <Link to="Services/MobileServices"> */}
                <div className="goalItem pb-2 servNoLink">
                  {" "}
                  <div className="servNoLinkOverlay">
                    <p>تحت التطوير</p>
                  </div>
                  <div>
                    <img src={statApp} alt="statApp" />
                  </div>
                  <h6 className="pt-4">تطبيق الإحصائيات</h6>
                </div>
                {/* </Link> */}
              </Col>
              <Col
                xs={{ span: 24 }}
                md={{ span: 12 }}
                lg={{ span: 6 }}
                className="p-3"
              >
                {/* <Link to="Services/OwnProperty"> */}
                <div className="goalItem pb-2 servNoLink">
                  {" "}
                  <div className="servNoLinkOverlay">
                    <p>تحت التطوير</p>
                  </div>
                  <div>
                    <img src={plansArchive} alt="OwnProperty" />
                  </div>
                  <h6 className="pt-4">أرشفة المخططات</h6>
                </div>
                {/* </Link> */}
              </Col>
            </Row>
          ) : (
            <Row className="my-5">
              <Col
                xs={{ span: 24 }}
                md={{ span: 12 }}
                lg={{ span: 6 }}
                className="p-3"
              >
                <Link to="Services/engOffices">
                  <div className="goalItem pb-2">
                    <div>
                      <img src={t2helEngOffice} alt="engOffices" />
                    </div>
                    <h6 className="pt-4">تأهيل المكاتب الهندسية</h6>
                  </div>
                </Link>
              </Col>
              <Col
                xs={{ span: 24 }}
                md={{ span: 12 }}
                lg={{ span: 6 }}
                className="p-3"
              >
                <Link to="Services/UpdateInstruments">
                  <div className="goalItem pb-2">
                    <div>
                      <img src={instrumentsUpdate} alt="UpdateInstruments" />
                    </div>
                    <h6 className="pt-4">تحديث الصكوك</h6>
                  </div>
                </Link>
              </Col>
              <Col
                xs={{ span: 24 }}
                md={{ span: 12 }}
                lg={{ span: 6 }}
                className="p-3"
              >
                <Link to="Services/SurveyingSketch">
                  <div className="goalItem pb-2">
                    <div>
                      <img src={arealReports} alt="SpatialDataRequest" />
                    </div>
                    <h6 className="pt-4">تقارير مساحية</h6>
                  </div>
                </Link>
              </Col>
            </Row>
          )}
        </Container>
      </div>
      <Footer />
    </div>
  );
}
