import React from "react";

//Packages
import { Container } from "react-bootstrap";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toArabic } from "arabic-digits";
import { HashLink } from "react-router-hash-link";

import {
  faEdgeLegacy,
  faFirefoxBrowser,
  faChrome,
  faYoutube,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { connect } from "react-redux";

//Images
import Logo from "../assets/images/logos/riyadhLogoFooter.png";
import visionLogo from "../assets/images/logos/visionLogo.png";
function Footer(props) {
  return (
    <div className="footer ">
      <div className="footerFirst">
        <Row className="mb-4 pt-3 ">
          <Col xs={{ span: 12 }} style={{ textAlign: "right" }}>
            <img
              src={Logo}
              alt="portalLogo"
              style={{
                width: "64px",
                height: "77px",
              }}
            />
            <img
              src={visionLogo}
              className="mr-4"
              alt="portalLogo"
              style={{
                width: "95px",
                height: "64px",
              }}
            />
          </Col>
          <Col
            xs={{ span: 12 }}
            style={{ textAlign: "left" }}
            className="footerTopI pt-4">
            <span>
              {/* <a
                className="iconLink"
                href="https://www.youtube.com/channel/UC5k-pTxG2WTlj0Bbzcmk6RA"
                target="_blank"
                rel="noreferrer"
              > */}
              <FontAwesomeIcon icon={faYoutube} className="fa-2x youtubeIcon" />
              {/* </a> */}
            </span>
            <span className="mr-5">
              {/* <a
                className="iconLink"
                href="https://twitter.com/easterneamana/"
                target="_blank"
                rel="noreferrer"
              > */}
              <FontAwesomeIcon icon={faTwitter} className="fa-2x twitterIcon" />
              {/* </a> */}
            </span>
          </Col>
        </Row>
        <Row>
          <Col
            sm={{ span: 12 }}
            xs={{ span: 24 }}
            md={{ span: 12 }}
            lg={{ span: 8 }}>
            <h4>روابـط هـامـة</h4>
            <ul>
              <li>
                <a
                  href=" https://www.alriyadh.gov.sa/ar"
                  rel="noreferrer"
                  target="_blank">
                  مـوقع أمـانة الرياض
                </a>
              </li>
              <li>
                <a
                  href="https://eservices.alriyadh.gov.sa/"
                  rel="noreferrer"
                  target="_blank">
                  الخـدمـات الالكـترونيـة
                </a>
              </li>
              <li>
                <a
                  href="https://www.momra.gov.sa/"
                  rel="noreferrer"
                  target="_blank">
                  وزارة الشـؤون البلـدية والقرويـة
                </a>
              </li>
              <li>
                <a
                  href="https://balady.gov.sa/Pages/default.aspx"
                  rel="noreferrer"
                  target="_blank">
                  بـوابـة بـلدي
                </a>
              </li>
              <li>
                <a
                  href="http://www.yesser.gov.sa/ar/Pages/default.aspx"
                  rel="noreferrer"
                  target="_blank">
                  برنامـج التعـاملات الإلكـترونية الحـكـومية - يسـر
                </a>
              </li>
            </ul>
          </Col>
          <Col
            sm={{ span: 12 }}
            xs={{ span: 24 }}
            md={{ span: 12 }}
            lg={{ span: 8 }}>
            <h4>البوابة الإلكترونية</h4>
            <ul>
              <li>
                <Link to="/Vision">رؤيـة الإدارة</Link>
              </li>
              <li>
                <HashLink smooth to="/Vision/#visionMsg">
                  الرسالة
                </HashLink>
              </li>
              <li>
                <Link to="/Goals">الأهـداف</Link>
              </li>
              <li>
                <Link to="/Organization"> الهـيكـل التنـظـيـمي</Link>
              </li>
              <li>
                <Link to="/services">خدمات البوابة</Link>
              </li>
            </ul>
          </Col>
          <Col
            sm={{ span: 12 }}
            xs={{ span: 24 }}
            md={{ span: 12 }}
            lg={{ span: 8 }}>
            <h4>تواصل معنا</h4>
            <ul>
              <li>
                <HashLink smooth to="/ContactUs/#contactsData">
                  جهات الاتصال
                </HashLink>
              </li>
              <li>
                <HashLink smooth to="/ContactUs/#msgUs">
                  راسلنا
                </HashLink>
              </li>
              {/* <li>
                <Link to="/Questions">الأسئلة الشائعة </Link>
              </li>
              {props.isAuth ? (
                <li>
                  <Link to="/Apps">تطبيـقاتي</Link>
                </li>
              ) : (
                <li>
                  <Link to="/Booking"> حجـز مـوعد</Link>
                </li>
              )} */}
            </ul>
          </Col>
        </Row>
      </div>
      <div className="conditions">
        <h6>الشروط اللازمة التى يجب توافرها فى البيئة المشغلة للموقع </h6>
        <p>
          مقاس الشاشة لا تقل عن 600 يدعم متصفحات جوجل كروم, فيرفوكس, سفاري,و
          ايدج بالإضافة إلى جميع الأجهزة الذكية
        </p>
        <div className="footerBottomIcons">
          <FontAwesomeIcon className=" footIcon" icon={faEdgeLegacy} />
          <FontAwesomeIcon className=" footIcon" icon={faFirefoxBrowser} />
          <FontAwesomeIcon className=" footIcon" icon={faChrome} />
        </div>
      </div>
      <Container>
        <p className="footerYear pt-2 pb-2">
          جميع الحقوق محفوظة - الإدارة العامة للتخطيط والتصميم العمرانى{" "}
          {toArabic(new Date().getFullYear())}
        </p>
      </Container>
    </div>
  );
}
const mapStateToProps = function (state) {
  return {
    isAuth: state.auth.isAuth,
  };
};

export default connect(mapStateToProps)(Footer);
