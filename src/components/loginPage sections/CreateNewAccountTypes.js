import React from "react";

//Packages
import { Container } from "react-bootstrap";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";
import engineerIcon from "../../assets/images/engineer.png";
import person from "../../assets/images/man-user.png";
export default function CreateNewAccountForm(props) {
  return (
    <Container className="loginBox">
      <h5 className="mb-5">إنشاء حساب جديد</h5>
      <Container>
        <Row>
          <Col sm={{ span: 24 }} xs={{ span: 24 }} md={{ span: 12 }}>
            <a
              target="_self"
              rel="noreferrer"
              href={`${window.hostURL + window.baseURI+"/#/register"}`}
            >
              {" "}
              <div className="accountBox text-center py-4 px-1 mb-5 mx-2 mt-2">
                <img alt="engIcon" className="img-fluid" src={engineerIcon} />
                <h6 className="pt-4">مكتب هندسي</h6>
              </div>
            </a>
          </Col>
          <Col sm={{ span: 24 }} xs={{ span: 24 }} md={{ span: 12 }}>
            <Link to="/Register/User">
              <div className="accountBox text-center py-4 px-1 mb-5 mx-2 mt-2">
                <img alt="personIcon" className="img-fluid" src={person} />
                <h6 className="pt-4">مستفيد</h6>
              </div>
            </Link>
          </Col>
        </Row>
      </Container>
      <Row className="formRoutes pb-4 pt-5">
        <Col span={24} style={{ textAlign: "center" }}>
          <p>
            <span className="formQuestion pl-2">هل لديك حساب؟</span>
            <Link to="/Login">
              <span className="formAnswer">تسجيل دخول</span>
            </Link>
          </p>
        </Col>
        <Col span={24} style={{ textAlign: "center" }}>
          <p>
            <span className="formQuestion pl-2">هل تريد تنشيط حسابك؟</span>
            <Link to="/Login/Activate">
              <span className="formAnswer" onClick={props.openActivateForm}>
                تنشيط الحساب
              </span>
            </Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
}
