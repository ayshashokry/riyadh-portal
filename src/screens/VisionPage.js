import React, { useEffect } from "react";

//Packages
import { Row, Col } from "antd";
import NavBarr from "../containers/NavBarr";
import Footer from "../containers/Footer";
import { Link } from "react-router-dom";

//Images
import visionIntroduction from "../assets/images/visionIntroduction.png";
import Fade from "react-reveal";
export default function VisionPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <div className="visionPage">
      <NavBarr />
      <div className="goalsHeader">
        <div className=" pt-5 pb-3 px-5 mr-lg-5">
          <span className="span1">
            <Link to="/"> الرئيسية </Link>. عن البوابة الإلكترونية .
          </span>
          <span className="span2">رؤية الإدارة </span>
          <h1>رؤيـة الإدارة </h1>
        </div>
      </div>
      <div className="goals ">
        <Row className="my-3 py-3 visionIntroduction mx-lg-5 px-lg-5 px-3">
          <Col xs={{ span: 24 }} lg={{ span: 12 }} className="visionCol">
            <Fade right>
              <h5 className="pb-3">الرؤية</h5>
              <p>
                التطوير المستمر لبرامج وأعمال الإدارة العامة للتخطيط العمراني
                وتعزيز الامكانات وتوفير الاحتياجات اللازمة لتحديث العمل وتطويره
                بما يتناسب مع المهام والارتقاء بالمكاتب المساحية والاستشارية
                ورفع مستوى أداء العاملين والعمل في الادارة وتحقيق تنمية عمرانية
                مستدامة لمدينة الرياض, وبما يتماشى مع رؤية المملكة 2030 في
                الارتقاء بجودة الخدمات البلدية.{" "}
              </p>
            </Fade>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 12 }} className="visionCol">
            <Fade left>
              <img
                width="552 px"
                height="621 px"
                src={visionIntroduction}
                alt="visionIntroduction"
                className="img-fluid"
              />
            </Fade>
          </Col>
        </Row>
        <div className="visionMsg">
          <Fade right>
            <h5 id="visionMsg">الرسالة</h5>
          </Fade>

          <Fade left>
            <p>
              نسعى لبناء وتخطيط مدينة الرياض وفق اعلى مستويات المعايير التخطيطية
              المحلية والتجارب العالمية في مجال التخطيط بما يساهم في دفع عجلة
              التنمية العمرانية بالتعاون مع كافة الجهات الحكومية المعنية وتطوير
              الخدمات العامة والأنظمة وتسهيل الإجراءات للوصول لأعلى معايير جودة
              الحياة.
            </p>
          </Fade>
        </div>
      </div>
      <Footer />
    </div>
  );
}
