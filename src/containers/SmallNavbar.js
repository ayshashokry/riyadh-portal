import React, { Component } from "react";

//Packages
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Navbar, Button, Nav, Container } from "react-bootstrap";
import { Dropdown, Menu, notification } from "antd";
import Media from "react-media";
import AvatarImg from "../assets/images/avatar.png";
import { withRouter } from "react-router-dom";
import { LogOut } from "../redux/actions/authActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faChartArea,
  faChevronDown,
  faHome,
  faPhone,
  faSignInAlt,
  faSignOutAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";

class SmallNavbar extends Component {
  confirmationLogout = () => {
    const args = {
      description: "تم تسجيل الخروج بنجاح",
      duration: 5,
      placement: "bottomLeft",
      bottom: 5,
    };
    notification.open(args);
  };
  SignOut = (e) => {
    this.props.LogOut();
    this.props.history.push("/Login");
    this.confirmationLogout();
  };
  render() {
    return (
      <Navbar expand="lg" className="portalNavbar1 " fixed="top">
        <Container fluid>
          <Nav>
            {/* <Link
              to="/"
              style={{
                margin: "auto",
                textAlign: "center",
                position: "absolute",
                right: "50% ",
              }}
            >
              <img
                alt="logo"
                src={Logo}
                style={{ width: "auto", height: "50px" }}
              />
            </Link> */}
            <ul className=" leftUl">
              {/* <li>English</li> */}
              <li>
                {this.props.isAuth ? (
                  <>
                    <Dropdown
                      getPopupContainer={(trigger) => trigger.parentNode}
                      trigger={["click"]}
                      overlay={
                        <Menu>
                          <Media query="(max-width: 768px)">
                            {(matches) =>
                              matches ? (
                                <>
                                  {/* <Menu.Item>
                                      <NotificationsIcon />
                                      الإشعارات
                                    </Menu.Item> */}
                                  <Menu.Item>
                                    <Link to="/UserProfile" className="navitem">
                                      <FontAwesomeIcon
                                        style={{ fontSize: "18px" }}
                                        icon={faUser}
                                        className="fa-x ml-2"
                                      />
                                      الصفحة الشخصية
                                    </Link>
                                  </Menu.Item>
                                  <hr />
                                  {this.props.user.engcompany_id !== null ? (
                                    <>
                                      <Menu.Item>
                                        {/* <a
                                          href={`${
                                            window.hostURL +
                                            window.baseURI +
                                            "/#/editengcomp"
                                          }`}
                                          className="navitem "
                                          target="_self"
                                          rel="noreferrer"
                                        > */}
                                        <FontAwesomeIcon
                                          style={{ fontSize: "18px" }}
                                          icon={faUser}
                                          className="fa-x ml-2"
                                        />
                                        ملف المكتب الهندسي
                                        {/* </a> */}
                                      </Menu.Item>
                                      <hr />
                                    </>
                                  ) : null}
                                  <Menu.Item>
                                    <Link to="/" className="navitem">
                                      <FontAwesomeIcon
                                        style={{ fontSize: "18px" }}
                                        icon={faHome}
                                        className="fa-x ml-2"
                                      />
                                      الرئيـسية
                                    </Link>
                                  </Menu.Item>
                                  {this.props.isAuth ? (
                                    <>
                                      <hr />
                                      <Menu.Item>
                                        <Link className="navitem " to="/Apps">
                                          <FontAwesomeIcon
                                            style={{ fontSize: "18px" }}
                                            icon={faCalendarCheck}
                                            className="fa-x ml-2"
                                          />
                                          تطبيقاتي
                                        </Link>
                                      </Menu.Item>
                                    </>
                                  ) : (
                                    <>
                                      <hr />
                                      <Menu.Item>
                                        <Link
                                          className="navitem "
                                          to="/Booking">
                                          <FontAwesomeIcon
                                            style={{ fontSize: "18px" }}
                                            icon={faCalendarCheck}
                                            className="fa-x ml-2"
                                          />
                                          حجـز مـوعد
                                        </Link>
                                      </Menu.Item>
                                    </>
                                  )}
                                  <hr />
                                  <Menu.Item
                                    style={{ cursor: "pointer" }}
                                    className="navitem ">
                                    <FontAwesomeIcon
                                      style={{ fontSize: "18px" }}
                                      icon={faPhone}
                                      className="fa-x ml-2"
                                    />
                                    <Link to="/ContactUs" className="navitem">
                                      تواصل معنا
                                    </Link>
                                  </Menu.Item>
                              
                                  <hr />
                                  <Menu.Item
                                    style={{ cursor: "pointer" }}
                                    className="navitem "
                                    onClick={this.SignOut}>
                                    <FontAwesomeIcon
                                      style={{ fontSize: "18px" }}
                                      icon={faSignOutAlt}
                                      className="fa-x ml-2"
                                    />
                                    تسجيل خروج
                                  </Menu.Item>{" "}
                                </>
                              ) : (
                                <>
                                  <Menu.Item>
                                    <Link to="/UserProfile" className="navitem">
                                      <FontAwesomeIcon
                                        style={{ fontSize: "18px" }}
                                        icon={faUser}
                                        className="fa-x ml-2"
                                      />
                                      الصفحة الشخصية
                                    </Link>
                                  </Menu.Item>
                                  <hr />
                                  {this.props.user.engcompany_id !== null ? (
                                    <>
                                      <Menu.Item>
                                        {/* <a
                                          href={`${
                                            window.hostURL +
                                            window.baseURI +
                                            "/#/editengcomp"
                                          }`}
                                          className="navitem "
                                          target="_self"
                                          rel="noreferrer"
                                        > */}
                                        <FontAwesomeIcon
                                          style={{ fontSize: "18px" }}
                                          icon={faUser}
                                          className="fa-x ml-2"
                                        />
                                        ملف المكتب الهندسي
                                        {/* </a> */}
                                      </Menu.Item>
                                      <hr />
                                    </>
                                  ) : null}
                                
                                  <Menu.Item
                                    style={{ cursor: "pointer" }}
                                    className="navitem "
                                    onClick={this.SignOut}>
                                    <FontAwesomeIcon
                                      style={{ fontSize: "18px" }}
                                      icon={faSignOutAlt}
                                      className="fa-x ml-2"
                                    />
                                    تسجيل خروج
                                  </Menu.Item>
                                </>
                              )
                            }
                          </Media>
                        </Menu>
                      }
                      placement="bottomLeft"
                      arrow>
                      <Button>
                        <img
                          style={{ width: "auto", height: "30px" }}
                          src={
                            this.props.user.image === null
                              ? AvatarImg
                              : `${
                                  window.filesURL +
                                  this.props.user.image.replace("GISAPI", "")
                                }`
                          }
                          className="img-fluid"
                          alt="userPhoto"
                        />
                        <span className="navitem px-2">
                          {this.props.user.name}
                        </span>
                        <FontAwesomeIcon
                          className="mr-2"
                          icon={faChevronDown}
                        />
                      </Button>
                    </Dropdown>
                  </>
                ) : null}
              </li>

              <Media query="(max-width: 768px)">
                {(matches) =>
                  matches ? (
                    <>
                      {this.props.isAuth ? null : (
                        <Dropdown
                          getPopupContainer={(trigger) => trigger.parentNode}
                          trigger={["click"]}
                          overlay={
                            <Menu>
                              <Menu.Item>
                                <Link to="/" className="navitem">
                                  <FontAwesomeIcon
                                    style={{ fontSize: "18px" }}
                                    icon={faHome}
                                    className="fa-x ml-2"
                                  />
                                  الرئيسية
                                </Link>
                              </Menu.Item>
                              <hr />
                              <Menu.Item>
                                {
                                window.origin.includes(window.testIP) ? (
                                  <Link to="/Login" className="navitem">
                                    <FontAwesomeIcon
                                      icon={faSignInAlt}
                                      className="ml-2 fa-x"
                                      style={{ fontSize: "18px" }}
                                    />
                                    الدخول
                                  </Link>
                                ) : (
                                  <a
                                    target="_target"
                                    rel="noreferrer"
                                    href="https://eservices.alriyadh.gov.sa/Pages/UserProfile/RmLogin.aspx">
                                    <FontAwesomeIcon
                                      icon={faSignInAlt}
                                      className="ml-2 fa-x"
                                      style={{ fontSize: "18px" }}
                                    />
                                    الدخول
                                  </a>
                                )}
                              </Menu.Item>
                              {/* <hr />
                              <Menu.Item>
                                <Link to="/Login/Register" className="navitem">
                                  <FontAwesomeIcon
                                    style={{ fontSize: "18px" }}
                                    icon={faUserPlus}
                                    className="fa-x ml-2"
                                  />
                                  إنشاء حساب
                                </Link>
                              </Menu.Item> */}
                              {this.props.isAuth ? (
                                <>
                                  <hr />
                                  <Menu.Item>
                                    <Link className="navitem " to="/Apps">
                                      <FontAwesomeIcon
                                        style={{ fontSize: "18px" }}
                                        icon={faCalendarCheck}
                                        className="fa-x ml-2"
                                      />
                                      تطبيقاتي
                                    </Link>
                                  </Menu.Item>
                                </>
                              ) : null}
                              {/* <hr />
                              <Menu.Item>
                                <Link className="navitem " to="/Booking">
                                  <FontAwesomeIcon
                                    style={{ fontSize: "18px" }}
                                    icon={faCalendarCheck}
                                    className="fa-x ml-2"
                                  />
                                  حجز موعد
                                </Link>
                              </Menu.Item> */}
                            </Menu>
                          }
                          placement="bottomLeft"
                          arrow>
                          <Button>
                            <FontAwesomeIcon
                              className=" mr-2 "
                              icon={faChevronDown}
                              style={{ fontSize: "15px" }}
                            />
                          </Button>
                        </Dropdown>
                      )}
                    </>
                  ) : !this.props.isAuth ? (
                    <>
                      <li>
                        <Link to="/" className="navitem">
                          الرئيـسية
                        </Link>
                      </li>
                      {/* <span className="navitemBorder"></span>
                      <li>
                      {window.origin.slice(-4) === "7070" ||
                          window.origin.slice(-4) === "3000" ||
                          window.origin.includes("77.30.168.86") ? (
                            <Link to="/Login" className="navitem">
                              الدخول
                            </Link>
                          ) : (
                            <a
                              target="_target"
                              rel="noreferrer"
                              href="https://eservices.alriyadh.gov.sa/Pages/UserProfile/RmLogin.aspx"
                            >
                              الدخول
                            </a>
                          )}
                      </li> */}
                      {/* <span className="navitemBorder"></span> */}
                      {/* <li>
                        <Link to="/Login/Register" className="navitem">
                          
                          إنشاء حساب
                        </Link>
                      </li> */}
                      {/* <span className="navitemBorder"></span> */}
                      {/* <li>
                        <Link to="/Booking" className="navitem">
                         
                          حجز موعد
                        </Link>
                      </li> */}
                    </>
                  ) : this.props.isAuth ? (
                    <>
                      <span className="navitemBorder"></span>
                      <li>
                        <Link to="/Apps" className="navitem ">
                          تطبيقاتي
                        </Link>
                      </li>
                      <span className="navitemBorder"></span>
                      <li>
                        <Link to="/" className="navitem ">
                          الرئيـسية
                        </Link>
                      </li>
                    </>
                  ) : null
                }
              </Media>
            </ul>
            <ul className="rightUl">
              <Media query="(max-width: 768px)">
                {(matches) =>
                  matches ? (
                    <>
                      {!this.props.isAuth ? (
                        <>
                          <Link to="/ContactUs" className="navitem">
                            تواصل معنا{" "}
                            <FontAwesomeIcon
                              icon={faPhone}
                              className="ml-1 fa-x"
                              style={{ fontSize: "18px" }}
                            />
                          </Link>
                          <span className="navitemBorder"></span>
                        </>
                      ) : null}
                    </>
                  ) : (
                    <>
                      <Link to="/ContactUs" className="navitem">
                        تواصل معنا{" "}
                        <FontAwesomeIcon
                          icon={faPhone}
                          className="ml-1 fa-x"
                          style={{ fontSize: "18px" }}
                        />
                      </Link>
                      <span className="navitemBorder"></span>
                    </>
                  )
                }
              </Media>
              <li className="centerLi">
                <a
                  className="iconLink"
                  href="https://twitter.com/easterneamana/"
                  target="_blank"
                  rel="noreferrer">
                  <FontAwesomeIcon
                    icon={faTwitter}
                    style={{ fontSize: "20px" }}
                    className="twitterIcon"
                  />
                </a>
              </li>
              <span className="navitemBorder"></span>
              <li>
                <a
                  className="iconLink"
                  href="https://www.youtube.com/channel/UC5k-pTxG2WTlj0Bbzcmk6RA"
                  target="_blank"
                  rel="noreferrer">
                  <FontAwesomeIcon
                    icon={faYoutube}
                    className="youtubeIcon"
                    style={{ fontSize: "20px" }}
                  />
                </a>
              </li>
            </ul>
          </Nav>
        </Container>
      </Navbar>
    );
  }
}
const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  user: state.auth.user,
  token: state.auth.token,
});
const mapDispatchToProps = {
  LogOut,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SmallNavbar));
