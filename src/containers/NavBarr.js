import React, { Component } from "react";

//Packages
import { Navbar, Button, Nav, Container } from "react-bootstrap";
import { Dropdown, Menu, notification } from "antd";
import { Link, NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LogOut } from "../redux/actions/authActions";
import Media from "react-media";
import AvatarImg from "../assets/images/avatar.png";
// import NotifyIcon from "./NotifyIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube, faTwitter } from "@fortawesome/free-brands-svg-icons";
// import ticketGroupIcon from "../assets/images/ticketIcon.svg";
// import ticketsInboxIcon from "../assets/images/ticketsInboxIcon.svg";
// import addTicketIcon from "../assets/images/addTicketIcon.svg";
// import TicketCreator from "../components/tickets/ticketCreator";
// import AddTaskModal from "../components/tickets/AddTaskModal";
import NotificationsMenu from "./NotificationsMenu";
import moment from "moment-hijri";

import {
  faBars,
  faCalendarCheck,
  faChartArea,
  faChevronDown,
  faPhone,
  faSignInAlt,
  faSignOutAlt,
  faTimes,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
//Images
import Logo from "../assets/images/logos/riyadhLogo.png";

// import generateNotification from "./generateNotification";

class NavBarr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultDisplay: "block",
      changeDisplay: "none",
      searchOpened: false,
      appsArabicNames: {},
      addTaskModalShow: false,
      openengNotificationMenu: true,
    };
  }
  openEngMenu = () => {
    this.setState({
      openengNotificationMenu: !this.state.openengNotificationMenu,
    });
  };
  componentDidUpdate(prevProps, prevState) {
    let todayDate = moment();

    if (
      prevProps.user !== this.props.user &&
      this.props.user.engineering_companies !== undefined &&
      this.props.user.engineering_companies !== null
    ) {
      if (
        (this.props.user.engineering_companies.department_eng_comp.length > 0 &&
          this.props.user.engineering_companies.department_eng_comp.find(
            (n) => n.is_approved === 2
          )) ||
        (this.props.user.engineering_companies.insurance_license !== null &&
          todayDate.isAfter(
            moment(
              this.props.user.engineering_companies.insurance_license.end_date,
              "iDD/iMM/iYYYY"
            ),
            "day"
          )) ||
        (this.props.user.engineering_companies.insurance_license !== null &&
          moment(
            this.props.user.engineering_companies.insurance_license.end_date,
            "iDD/iMM/iYYYY"
          ).diff(todayDate, "days") <= 30 &&
          todayDate.isBefore(
            moment(
              this.props.user.engineering_companies.insurance_license.end_date,
              "iDD/iMM/iYYYY"
            ),
            "day"
          )) ||
        (this.props.user.engineering_companies.municipality_license !== null &&
          todayDate.isAfter(
            moment(
              this.props.user.engineering_companies.municipality_license
                .end_date,
              "iDD/iMM/iYYYY"
            ),
            "day"
          )) ||
        (this.props.user.engineering_companies.municipality_license !== null &&
          moment(
            this.props.user.engineering_companies.municipality_license.end_date,
            "iDD/iMM/iYYYY"
          ).diff(todayDate, "days") <= 30 &&
          todayDate.isBefore(
            moment(
              this.props.user.engineering_companies.municipality_license
                .end_date,
              "iDD/iMM/iYYYY"
            ),
            "day"
          )) ||
        (this.props.user.engineering_companies.saudi_license !== null &&
          todayDate.isAfter(
            moment(
              this.props.user.engineering_companies.saudi_license.end_date,
              "iDD/iMM/iYYYY"
            ),
            "day"
          )) ||
        (this.props.user.engineering_companies.saudi_license !== null &&
          moment(
            this.props.user.engineering_companies.saudi_license.end_date,
            "iDD/iMM/iYYYY"
          ).diff(todayDate, "days") <= 30 &&
          todayDate.isBefore(
            moment(
              this.props.user.engineering_companies.saudi_license.end_date,
              "iDD/iMM/iYYYY"
            ),
            "day"
          ))
      ) {
        this.setState({ notiVisible: true });
      }
    }
  }
  closeAddTaskModal = () => {
    setTimeout(() => {
      this.setState({
        addTaskModalShow: false,
      });
    }, 100);
  };
  openAddTaskModal = (e) => {
    this.setState({
      addTaskModalShow: true,
    });
  };

  confirmationAddTicket = () => {
    const args = {
      description: "تم إرسال التذكرة بنجاح",
      duration: 5,
      placement: "bottomLeft",
    };
    notification.open(args);
  };
  componentDidMount = () => {
    const { token } = this.state;
    const request = new Request(
      window.ApiUrl + "/applications/allApplications?pageSize=100",
      {
        headers: {
          authorization: `bearer ${token}`,
        },
      }
    );
    fetch(request)
      .then(async (res) => {
        if (res.ok) {
          const results = (await res.json()).results;
          let appsArabicNames = {};
          results.forEach((r) => {
            appsArabicNames[r.id] = r.translate_ar_caption;
          });
          this.setState({ appsArabicNames });
        }
      })
      .catch((err) => console.log(err));
  };

  openSearch = (e) => {
    this.setState({ searchOpened: !this.state.searchOpened });
  };
  changeTogg = (e) => {
    if (
      this.state.changeDisplay === "block" &&
      this.state.defaultDisplay === "none"
    ) {
      this.setState({ changeDisplay: "none", defaultDisplay: "block" });
    } else {
      this.setState({ changeDisplay: "block", defaultDisplay: "none" });
    }
  };
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
      <>
        <Navbar expand="lg" className="portalNavbar1 " fixed="top">
          <Container fluid>
            <Nav>
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
                                    <Menu.Item>
                                      <Link
                                        to="/UserProfile"
                                        className="navitem ">
                                        <FontAwesomeIcon
                                          icon={faUser}
                                          className="ml-2 fa-x"
                                          style={{ fontSize: "18px" }}
                                        />
                                        الصفحـة الشـخصـية
                                      </Link>
                                    </Menu.Item>
                                    <hr />

                                    <Menu.Item>
                                      <Link className="navitem " to="/Apps">
                                        <FontAwesomeIcon
                                          icon={faCalendarCheck}
                                          className="ml-2 fa-x"
                                          style={{ fontSize: "18px" }}
                                        />
                                        تطبيقاتي
                                      </Link>
                                    </Menu.Item>

                                    <hr />
                                    <Menu.Item
                                      style={{ cursor: "pointer" }}
                                      className="navitem ">
                                      <FontAwesomeIcon
                                        icon={faPhone}
                                        className="ml-2 fa-x"
                                        style={{ fontSize: "18px" }}
                                      />
                                      <Link to="/ContactUs" className="navitem">
                                        تواصـل معنـا
                                      </Link>
                                    </Menu.Item>
                                    <hr />
                                    <Menu.Item
                                      style={{ cursor: "pointer" }}
                                      className="navitem "
                                      onClick={this.SignOut}>
                                      <FontAwesomeIcon
                                        icon={faSignOutAlt}
                                        className="ml-2 fa-x"
                                        style={{ fontSize: "18px" }}
                                      />
                                      تسجيـل خـروج
                                    </Menu.Item>
                                  </>
                                ) : (
                                  <>
                                    <Menu.Item>
                                      <Link
                                        to="/UserProfile"
                                        className="navitem ">
                                        <FontAwesomeIcon
                                          icon={faUser}
                                          className="ml-2 fa-x"
                                          style={{ fontSize: "18px" }}
                                        />
                                        الصفحـة الشخصيـة
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
                                            href=""
                                            className="navitem "
                                            target="_self"
                                            rel="noreferrer"
                                          > */}
                                          <FontAwesomeIcon
                                            icon={faUser}
                                            className="ml-2 fa-x"
                                            style={{ fontSize: "18px" }}
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
                                        icon={faSignOutAlt}
                                        className="ml-2 fa-x"
                                        style={{ fontSize: "18px" }}
                                      />
                                      تسجيـل خروج
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
                            className=" mr-2 "
                            icon={faChevronDown}
                            style={{ fontSize: "15px" }}
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
                                {!this.props.isAuth ? (
                                  <>
                                    <Menu.Item>
                                      {window.origin.includes(window.testIP) ? (
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
                                      <Link
                                        to="/Login/Register"
                                        className="navitem"
                                      >
                                        <FontAwesomeIcon
                                          icon={faUserPlus}
                                          className="ml-2 fa-x"
                                          style={{ fontSize: "18px" }}
                                        />
                                        إنشاء حساب
                                      </Link>
                                    </Menu.Item> */}
                                  </>
                                ) : null}
                                {/* <hr />
                                <Menu.Item>
                                  <Link className="navitem " to="/Booking">
                                    <FontAwesomeIcon
                                      icon={faCalendarCheck}
                                      className="ml-2 fa-x"
                                      style={{ fontSize: "18px" }}
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
                          {window.origin.includes(window.testIP) ? (
                            <Link to="/Login" className="navitem">
                              الدخول
                            </Link>
                          ) : (
                            <a
                              target="_target"
                              rel="noreferrer"
                              href="https://eservices.alriyadh.gov.sa/Pages/UserProfile/RmLogin.aspx">
                              الدخول
                            </a>
                          )}
                        </li>
                        {/* <span className="navitemBorder"></span>{" "}
                        <li>
                          <Link to="/Login/Register" className="navitem">
                            إنشاء حساب
                          </Link>
                        </li> */}
                        {/* <span className="navitemBorder"></span>{" "} */}
                        {/* <li>
                          <Link to="/Booking" className="navitem">
                            {" "}
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
                      </>
                    ) : null
                  }
                </Media>
                {this.props.isAuth ? (
                  <>
                    <span className="navitemBorder"></span>
                    <li>
                      {/* <NotifyIcon
                        appsIds={[
                          1, 5, 8, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
                        ]}
                        userToken={localStorage.token}
                        generateNotification={(n) =>
                          generateNotification(n, appsArabicNames)
                        }
                        baseUrl={window.ApiUrl}
                      /> */}
                      {this.props.isAuth &&
                      this.props.user.engcompany_id !== null &&
                      this.props.user.engcompany_id !== undefined ? (
                        <NotificationsMenu />
                      ) : null}
                    </li>
                  </>
                ) : null}
                {/* <Dropdown
                  className="serviceNavItem"
                  getPopupContainer={(trigger) => trigger.parentNode}
                  trigger={["click"]}
                  overlay={
                    <Menu>
                      <Menu.Item>
                        {this.props.isAuth ? (
                          <Link to="/tickets/add" target="_blank">
                            <img
                              className=""
                              alt="ticketIcon"
                              onClick={this.openAddTaskModal}
                              src={addTicketIcon}
                            />
                            <span>تذكرة جديدة</span>
                          </Link>
                        ) : (
                          <Link to="/Login" target="_blank">
                            <img
                              className=""
                              alt="ticketIcon"
                              src={addTicketIcon}
                            />{" "}
                            <span>تذكرة جديدة</span>
                          </Link>
                        )}
                      </Menu.Item>
                      <hr />
                      <Menu.Item>
                        <Link to="/tickets" target="_blank">
                          <img
                            className=""
                            alt="ticketIcon"
                            src={ticketsInboxIcon}
                          />
                          <span>التذاكر الجارية</span>
                        </Link>
                      </Menu.Item>
                    </Menu>
                  }
                  placement="bottomLeft"
                  arrow
                >
                  <Button>
                    <Tooltip placement="right" title="الدعم الفني">
                      <img
                        className=""
                        alt="ticketIcon"
                        onClick={this.openTicketsMenu}
                        src={ticketGroupIcon}
                        style={{ cursor: "pointer" }}
                      />
                      <span className="navitemBorder"></span>
                    </Tooltip>
                  </Button>
                </Dropdown>

                <AddTaskModal
                  show={this.state.addTaskModalShow}
                  onHide={this.closeAddTaskModal}
                  title={"إضافة تذكرة جديدة"}
                >
                  <TicketCreator
                    confirmationAddTicket={this.confirmationAddTicket}
                    onHide={this.closeAddTaskModal}
                  />
                </AddTaskModal> */}
              </ul>
              <ul className="rightUl">
                <Media query="(max-width: 768px)">
                  {(matches) =>
                    matches ? (
                      <>
                        {!this.props.isAuth ? (
                          <>
                            <Link to="/ContactUs" className="navitem">
                              تواصـل معنا
                            </Link>
                            <span className="navitemBorder"></span>
                          </>
                        ) : null}
                      </>
                    ) : (
                      <>
                        <Link to="/ContactUs" className="navitem">
                          تواصل معنا
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
                </Media>{" "}
                <li className="centerLi">
                  <a
                    className="iconLink"
                    // href="https://twitter.com/easterneamana/"
                    // target="_blank"
                    // rel="noreferrer"
                  >
                    <FontAwesomeIcon
                      className=" twitterIcon"
                      icon={faTwitter}
                      style={{ fontSize: "20px" }}
                    />
                  </a>
                </li>
                <span className="navitemBorder"></span>
                <li>
                  <a
                    className="iconLink"
                    // href="https://www.youtube.com/channel/UC5k-pTxG2WTlj0Bbzcmk6RA"
                    // target="_blank"
                    // rel="noreferrer"
                  >
                    <FontAwesomeIcon
                      className=" youtubeIcon"
                      icon={faYoutube}
                      style={{ fontSize: "20px" }}
                    />
                  </a>
                </li>
              </ul>
            </Nav>
          </Container>
        </Navbar>
        <Navbar expand="lg" className="portalNavbar " fixed="top">
          <Container fluid>
            <Navbar.Brand className=" pr-lg-5  ">
              {/* <img alt="vision" src={visionLogo} className="mr-4 visionLogo" /> */}
              <Link to="/">
                <img alt="logo" src={Logo} className=" mainLogo" />
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle
              aria-controls="responsive-navbar-nav"
              onClick={this.changeTogg}>
              <div
                className="togDefault"
                style={{ display: this.state.defaultDisplay }}>
                <FontAwesomeIcon className=" fa-x" icon={faBars} />
              </div>
              <div
                className="togChange"
                style={{ display: this.state.changeDisplay }}>
                <FontAwesomeIcon className=" fa-x" icon={faTimes} />
              </div>
            </Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto " style={{ marginRight: "260px" }}>
                {" "}
                <Dropdown
                  className="serviceNavItem"
                  getPopupContainer={(trigger) => trigger.parentNode}
                  trigger={["click"]}
                  overlay={
                    <Menu>
                      <Menu.Item>
                        <NavLink
                          to="/Services/ApprovedOffices"
                          exact
                          className="navitem mynavitem"
                          activeClassName="navitem-active">
                          قائمة المكاتب الهندسية المعتمدة
                        </NavLink>
                      </Menu.Item>
                      <hr />{" "}
                      <Menu.Item>
                        <NavLink
                          to="/Services/rejectedOffices"
                          exact
                          className="navitem mynavitem"
                          activeClassName="navitem-active">
                          قائمة المكاتب الهندسية المعتذر عنها
                        </NavLink>
                      </Menu.Item>
                      <hr />
                      <Menu.Item>
                        <NavLink
                          to="/Services/engOffices"
                          exact
                          className="navitem mynavitem"
                          activeClassName="navitem-active">
                          خدمة تأهيل المكاتب الهندسية
                        </NavLink>
                      </Menu.Item>
                    </Menu>
                  }
                  placement="bottomLeft"
                  arrow>
                  <Button>
                    <span className="navitem"> المكاتب الهندسية</span>
                    <FontAwesomeIcon
                      className=" mr-2 "
                      icon={faChevronDown}
                      style={{ fontSize: "15px" }}
                    />
                  </Button>
                </Dropdown>
                <span style={{ margin: "0 15px" }}></span>
                <Dropdown
                  getPopupContainer={(trigger) => trigger.parentNode}
                  trigger={["click"]}
                  overlay={
                    <Menu>
                      <Menu.Item>
                        <NavLink
                          to="/Services"
                          exact
                          className="navitem mynavitem"
                          activeClassName="navitem-active">
                          دليـل الخـدمـات
                        </NavLink>
                      </Menu.Item>
                      <hr />
                      <Menu.Item>
                        <NavLink
                          to="/Inquiry"
                          exact
                          className="navitem mynavitem"
                          activeClassName="navitem-active">
                          الإستـعلام عن معـاملـة
                        </NavLink>
                      </Menu.Item>
                      <hr />
                      <Menu.Item>
                        <NavLink
                          to="/dashboard"
                          exact
                          className="navitem mynavitem"
                          activeClassName="navitem-active">
                          {" "}
                          {/* <FontAwesomeIcon
                                          icon={faChartArea}
                                          className="ml-2 fa-x"
                                          style={{ fontSize: "18px" }}
                                        /> */}
                          مؤشرات الأداء
                        </NavLink>
                      </Menu.Item>
                    </Menu>
                  }
                  placement="bottomLeft"
                  arrow>
                  <Button>
                    <span className="navitem">خـدماتـنا</span>
                    <FontAwesomeIcon
                      className=" mr-2 "
                      icon={faChevronDown}
                      style={{ fontSize: "15px" }}
                    />
                  </Button>
                </Dropdown>
                <span style={{ margin: "0 15px" }}></span>
                <Dropdown
                  getPopupContainer={(trigger) => trigger.parentNode}
                  className="serviceNavItem"
                  trigger={["click"]}
                  overlay={
                    <Menu>
                      <Menu.Item>
                        <NavLink
                          to="/Vision"
                          exact
                          className="navitem mynavitem"
                          activeClassName="navitem-active">
                          رؤيـة الإدارة
                        </NavLink>
                      </Menu.Item>
                      <hr />
                      <Menu.Item>
                        <NavLink
                          to="/Goals"
                          exact
                          className="navitem mynavitem"
                          activeClassName="navitem-active">
                          الأهداف
                        </NavLink>
                      </Menu.Item>
                      <hr />
                      <Menu.Item>
                        <NavLink
                          to="/Organization"
                          exact
                          className="navitem mynavitem"
                          activeClassName="navitem-active">
                          الهيكل التنظيمي{" "}
                        </NavLink>
                      </Menu.Item>{" "}
                      <hr />
                      <Menu.Item>
                        <NavLink
                          to="/Questions"
                          exact
                          className="navitem mynavitem"
                          activeClassName="navitem-active">
                          الأسئلة الشائعة
                        </NavLink>
                      </Menu.Item>
                    </Menu>
                  }
                  placement="bottomLeft"
                  arrow>
                  <Button>
                    <span className="navitem ">عن البـوابة الإلكترونية </span>
                    <FontAwesomeIcon
                      className=" mr-2 "
                      icon={faChevronDown}
                      style={{ fontSize: "15px" }}
                    />
                  </Button>
                </Dropdown>
                <span style={{ margin: "0 15px" }}></span>
                <NavLink
                  to="/"
                  exact
                  className="navitem mr-lg-4"
                  activeClassName="navitem-active">
                  الصفحة الرئيسية
                </NavLink>
                <span style={{ margin: "0 15px" }}></span>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
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
)(withRouter(NavBarr));
