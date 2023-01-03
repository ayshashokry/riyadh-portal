import React from "react";
import Slider from "react-slick";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Link } from "react-router-dom";
//Icons
import t2helEngOffice from "../../assets/images/HomeServicesIcons/t2helEngOffices.svg";
import plansArchive from "../../assets/images/HomeServicesIcons/plansArchive.svg";
import instrumentsUpdate from "../../assets/images/HomeServicesIcons/instrumentsUpdate.svg";
import arealReports from "../../assets/images/HomeServicesIcons/arealReports.svg";
import OrganizationalAppendages from "../../assets/images/HomeServicesIcons/OrganizationalAppendages.svg";
import siteInquiry from "../../assets/images/HomeServicesIcons/siteInquiry.svg";
import transationStudy from "../../assets/images/HomeServicesIcons/transationStudy.svg";
import bigProjects from "../../assets/images/HomeServicesIcons/bigProjects.svg";
import administrationCirculars from "../../assets/images/HomeServicesIcons/administrationCirculars.svg";
import requirementsProgramming from "../../assets/images/HomeServicesIcons/requirementsProgramming.svg";
import transactionsDocumntation from "../../assets/images/HomeServicesIcons/transactionsDocumntation.svg";
import statApp from "../../assets/images/HomeServicesIcons/statApp.svg";

import { Row, Col } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
import Fade from "react-reveal";

export default function Services() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 1,
    // swipe: false,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
          infinite: true,
          // swipe: false,
          autoplay: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          infinite: true,
          // swipe: false,
          autoplay: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          infinite: true,
          // swipe: false,
          autoplay: true,
        },
      },
    ],
  };
  return (
    <div className="services pt-5 homeServicesdiv">
      <h2>خدمات البوابة الإلكترونية</h2>
      <div className="servicesContainer">
        <Tabs defaultIndex={0}>
          <TabList>
            <Tab>أحدث الخدمات</Tab>
            <Tab>الخدمات الأكثر استخداماً</Tab>
          </TabList>
          <TabPanel>
            <div className="homeservSlider">
              <Slider
                {...settings}
                className="servicesIcons homeRotateSlider mt-4  ">
                <div className="px-3 newServicesHome">
                  <Link to="Services/engOffices">
                    <div className="goalItem pb-5">
                      <div className="pt-4">
                        <img src={t2helEngOffice} alt="engOffices" />
                      </div>
                      <h6 className="pt-3">تأهيل المكاتب الهندسية</h6>
                    </div>
                  </Link>
                </div>
                <div className="px-3 newServicesHome">
                  <Link to="Services/UpdateInstruments">
                    <div className="goalItem pb-5">
                      <div className="pt-4">
                        <img src={instrumentsUpdate} alt="instrumentsUpdate" />
                      </div>
                      <h6 className="pt-3"> تحديث الصكوك</h6>
                    </div>
                  </Link>
                </div>
                <div className="px-3 newServicesHome">
                  <Link to="Services/SurveyingSketch">
                    <div className="goalItem pb-5">
                      <div className="pt-4">
                        <img src={arealReports} alt="arealReports" />
                      </div>
                      <h6 className="pt-3">تقارير مساحية</h6>
                    </div>
                  </Link>
                </div>
                <div className="px-3 newServicesHome">
                  {/* <Link to="Services/OwnProperty"> */}
                  <div className="goalItem pb-5">
                    <div className="pt-4">
                      <img
                        src={OrganizationalAppendages}
                        alt="tamlikAkarIcon"
                      />
                    </div>
                    <h6 className="pt-3">الزوائد التنظيمية</h6>
                  </div>
                  {/* </Link> */}
                </div>
                <div className="px-3 newServicesHome">
                  {/* <Link to="Services/MergeStreets"> */}
                  <div className="goalItem pb-5">
                    <div className="pt-4">
                      <img src={siteInquiry} alt="mergeStreetIcon" />
                    </div>
                    <h6 className="pt-3">
                      إستعلام عن موقع بحد النطاق العمرانى
                    </h6>
                  </div>
                  {/* </Link> */}
                </div>
                <div className="px-3 newServicesHome">
                  {/* <Link to="Services/PublicUtility"> */}

                  <div className="goalItem pb-5">
                    <div className="pt-4">
                      <img src={transationStudy} alt="transationStudy" />
                    </div>
                    <h6 className="pt-3">دراسة المعاملات </h6>
                  </div>
                  {/* </Link> */}
                </div>
                <div className="px-3 newServicesHome">
                  {/* <Link to="Services/SpatialDataRequest"> */}

                  <div className="goalItem pb-5">
                    <div className="pt-4">
                      <img src={bigProjects} alt="bigProjects" />
                    </div>
                    <h6 className="pt-3">المشاريع الكبرى</h6>
                  </div>
                  {/* </Link> */}
                </div>
                <div className="px-3 newServicesHome">
                  {/* <Link to="Services/SiteQuery"> */}
                  <div className="goalItem pb-5">
                    <div className="pt-4">
                      <img
                        src={administrationCirculars}
                        alt="administrationCirculars"
                      />
                    </div>
                    <h6 className="pt-3">دراسة تعاميم الإدارة</h6>
                  </div>
                  {/* </Link> */}
                </div>
                <div className="px-3 newServicesHome">
                  {/* <Link to="Services/DigitalMaps"> */}
                  <div className="goalItem pb-5">
                    <div className="pt-4">
                      <img
                        src={requirementsProgramming}
                        alt="requirementsProgramming"
                      />
                    </div>
                    <h6 className="pt-3">برمجة الاشتراطات</h6>
                  </div>
                  {/* </Link> */}
                </div>
                <div className="px-3 newServicesHome">
                  {/* <Link to="Services/Plans"> */}
                  <div className="goalItem pb-5">
                    <div className="pt-4">
                      <img
                        src={transactionsDocumntation}
                        alt="transactionsDocumntation"
                      />
                    </div>
                    <h6 className="pt-3">توثيق المعاملات</h6>
                  </div>
                  {/* </Link> */}
                </div>
                <div className="px-3 newServicesHome">
                  {/* <Link to="Services/EngineeringOffices"> */}
                  <div className="goalItem pb-5">
                    <div className="pt-4">
                      <img src={statApp} alt="statApp" />
                    </div>
                    <h6 className="pt-3">تطبيق الإحصائيات</h6>
                  </div>
                  {/* </Link> */}
                </div>
              </Slider>
              <p
                className="servicesDetails py-5 mb-3"
                style={{ textAlign: "center" }}>
                <Link to="/Services">
                  <FontAwesomeIcon className="mr-2" icon={faLongArrowAltLeft} />
                  استعراض جميع الخدمات
                </Link>
              </p>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="servicesIcons">
              <Row className="mt-4">
                <Col
                  xs={{ span: 24 }}
                  md={{ span: 12 }}
                  lg={{ span: 6 }}
                  className="px-3">
                  <Link to="Services/engOffices">
                    <div className="goalItem pb-5">
                      <div className="pt-4">
                        <img src={t2helEngOffice} alt="engOffices" />
                      </div>
                      <h6 className="pt-3">تأهيل المكاتب الهندسية</h6>
                    </div>
                  </Link>
                </Col>
                <Col
                  xs={{ span: 24 }}
                  md={{ span: 12 }}
                  lg={{ span: 6 }}
                  className="px-3">
                  <Link to="Services/UpdateInstruments">
                    <div className="goalItem pb-5">
                      <div className="pt-4">
                        <img src={instrumentsUpdate} alt="UpdateInstruments" />
                      </div>
                      <h6 className="pt-3"> تحديث الصكوك</h6>
                    </div>
                  </Link>
                </Col>
                <Col
                  xs={{ span: 24 }}
                  md={{ span: 12 }}
                  lg={{ span: 6 }}
                  className="px-3">
                  <Link to="Services/SurveyingSketch">
                    <div className="goalItem pb-5">
                      <div className="pt-4">
                        <img src={arealReports} alt="arealReports" />
                      </div>
                      <h6 className="pt-3">تقارير مساحية</h6>
                    </div>
                  </Link>
                </Col>
                <Col
                  xs={{ span: 24 }}
                  md={{ span: 12 }}
                  lg={{ span: 6 }}
                  className="px-3">
                  {/* <Link to="Services/EngineeringOffices"> */}
                  <div className="goalItem pb-5">
                    <div className="pt-4">
                      <img src={plansArchive} alt="EngOfficesApproval" />
                    </div>
                    <h6 className="pt-3">أرشفة المخططات</h6>
                  </div>
                  {/* </Link> */}
                </Col>
              </Row>
              <p
                className="servicesDetails py-5 mb-3"
                style={{ textAlign: "center" }}>
                <Link to="/Services">
                  <FontAwesomeIcon className="mr-2" icon={faLongArrowAltLeft} />
                  استعراض جميع الخدمات
                </Link>
              </p>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}
