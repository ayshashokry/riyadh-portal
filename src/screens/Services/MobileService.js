import React, { useEffect } from "react";

//Packages
import { Container } from "react-bootstrap";
import { Row, Col } from "antd";
import NavBarr from "../../containers/NavBarr";
import Footer from "../../containers/Footer";
//Images
import android from "../../assets/images/GooglePlay.png";
import ios from "../../assets/images/AppStore.png";
import { Link } from "react-router-dom";

export default function MobileService() {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <div className="goalsPage">
      <NavBarr />
      <div className="goalsHeader">
        <div className=" pt-5 pb-3 px-5 mr-lg-5">
          {" "}
          <span className="span1">
            {" "}
            <Link to="/"> الرئيسية </Link>
            <Link to="/Services"> . خدماتنا . دليل الخدمات . </Link>
          </span>
          <span className="span2">خدمات الجوال</span>
          <h1>خدمـات الجـوال</h1>
        </div>
      </div>
      <div className="goals servicePage mb-5 pb-5">
        <Container>
          <Row className="my-5 servicePageHeader">
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 16 }}>
              <h2>نظام خدمات الجوال</h2>
              <p>
                تطبيــق المستكشــف الجغرافــي للهواتــف الذكيــة يتيــح
                للمســتخدمين الاطــلاع علـى الخارطـة الرقميـة عبـر شـبكة
                الانترنـت لاستعراض خريطـة المنطقـة الشـرقية، وتنفيــذ عمليــات
                بحــث وإســتعلام بإســتخدام مــا يتوفــر مــن البيانــات
                الوصفيــة أو المكانيــة، كمــا يوفــر التطبيــق العديــد مــن
                الخدمــات مثــل (تحديــد الموقــع الحالــي - للاستعلام عــن
                المعالــم والخدمــات القريبــة حولــي الاستفسار عــن جميــع
                بيانات الخارطة الرقمية) وهو متاح لكل من هواتف IOS and Android
              </p>
            </Col>
            {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }}>
              <Button>
                الذهاب إلي الخدمة
                <i className="fas fa-long-arrow-alt-left pr-2"></i>
              </Button>
            </Col> */}
          </Row>
          {/* <Row className="my-5 serviceUserManual">
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }}>
              <h2>دليل الاستخدام</h2>{" "}
              <div style={{ textAlign: "right" }}>
                {" "}
                <a
                  rel="noreferrer"
                  target="_blank"
                  href={`${process.env.PUBLIC_URL}/servicesManual/تطبيق المستكشف الجغرافي للهواتف الذكية.pdf`}
                  download
                >
                  تحميل دليل الاستخدام 
                     <FontAwesomeIcon
                    className="mx-3"
                    style={{ fontSize: "20px" }}
                    icon={faDownload}
                  />
                </a>
              </div>
            </Col>
          </Row> */}
          <Row className="my-5 serviceUserManual">
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 16 }}>
              <div>
                <h5>رابط الخدمة</h5>
                <ul style={{ display: "flex", listStyleType: "none" }}>
                  <li>
                    <a
                      rel="noreferrer"
                      target="_blank"
                      href="https://play.google.com/store/apps/details?id=com.eamana.webgis"
                    >
                      <img
                        alt="android-download"
                        src={android}
                        className="img-fluid"
                      />
                    </a>
                  </li>

                  <li className="pr-4">
                    <a
                      rel="noreferrer"
                      target="_blank"
                      href="https://apps.apple.com/eg/app/%D9%85%D8%AF%D9%8A%D9%86%D8%AA%D9%89/id1237574491"
                    >
                      <img alt="ios-download" src={ios} className="img-fluid" />
                    </a>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  );
}
