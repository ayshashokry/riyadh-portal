import React,{ useEffect, useState } from "react";
import { connect } from "react-redux";
import moment from "moment-hijri";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { Dropdown, Menu, Tooltip } from "antd";
import { Button } from "react-bootstrap";

function NotificationsMenu(props) {
  const [engNotificationsShow,setEngNotifShow]=useState(false)
  let todayDate = moment();
useEffect(()=>{
if(props.user.engineering_companies !== undefined &&
  props.user.engineering_companies !== null){
    setEngNotifShow(true)
  }
  else{
    setEngNotifShow(false)
  }
},[])

const handleEngNotificationShow=()=>{
  setEngNotifShow(!engNotificationsShow)
}
  return (
    <>
      <Dropdown visible={engNotificationsShow}
        getPopupContainer={(trigger) => trigger.parentNode}
        trigger={["click"]}
        overlay={
          <Menu>
            {props.user.engineering_companies !== undefined &&
              props.user.engineering_companies !== null &&
              props.user.engineering_companies.department_eng_comp.length > 0 &&
              props.user.engineering_companies.department_eng_comp.map(
                (n, index) =>
                  n.is_approved === 2 ? (
                    <>
                      <Menu.Item>
                        <p>
                      لقد تم الإعتذار عن إعتماد طلبك لدي {' '}  
                          {n.departments.name} {' '}
                          بسبب {' '} {n.comments}{' '}
                          <FontAwesomeIcon
                            icon={faArrowLeft}
                            className="inboxArrow mx-2"
                            style={{ color: "#d62f2f" }}
                          />
                        </p>
                      </Menu.Item>
                      <hr />
                    </>
                  ) : n.is_approved === 1 ? (
                    <>
                      <Menu.Item>
                        <p>
                          لقد تم الموافقة علي طلبك لدي {n.departments.name}
                          <FontAwesomeIcon
                            icon={faArrowLeft}
                            className="inboxArrow mx-2"
                            style={{ color: "#97c268" }}
                          />
                        </p>
                      </Menu.Item>
                      <hr />
                    </>
                  ) : n.is_approved === null ? (
                    <>
                      <Menu.Item>
                        <p>
                          طلبك لدي {n.departments.name} قيد الإعتماد
                          <FontAwesomeIcon
                            icon={faArrowLeft}
                            className="sentArrow mx-2"
                            style={{ color: "#385894" }}
                          />
                        </p>
                      </Menu.Item>
                      <hr />
                    </>
                  ) : null
              )}
            {props.user.engineering_companies.insurance_license != null &&
            todayDate.isAfter(
              moment(
                props.user.engineering_companies.insurance_license.end_date,
                "iDD/iMM/iYYYY"
              ),
              "day"
            ) ? (
              <>
                <Menu.Item>
                  <p>
                    رخصة التأمينات الإجتماعية إنتهت , برجاء تجديد الرخصة
                    <FontAwesomeIcon
                      icon={faArrowLeft}
                      className="inboxArrow mx-2"
                      style={{ color: "#d62f2f" }}
                    />
                  </p>
                </Menu.Item>
                <hr />
              </>
            ) : props.user.engineering_companies.insurance_license !== null &&
              moment(
                props.user.engineering_companies.insurance_license.end_date,
                "iDD/iMM/iYYYY"
              ).diff(todayDate, "days") <= 30 &&
              todayDate.isBefore(
                moment(
                  props.user.engineering_companies.insurance_license.end_date,
                  "iDD/iMM/iYYYY"
                ),
                "day"
              ) ? (
              <>
                <Menu.Item>
                  <p>
                    رخصة التأمينات الإجتماعية قاربت علي الإنتهاء , برجاء تجديد
                    الرخصة
                    <FontAwesomeIcon
                      icon={faArrowLeft}
                      className="inboxArrow mx-2"
                      style={{ color: "#faad14ba" }}
                    />
                  </p>
                </Menu.Item>
                <hr />
              </>
            ) : null}
            {props.user.engineering_companies.municipality_license !== null &&
            todayDate.isAfter(
              moment(
                props.user.engineering_companies.municipality_license.end_date,
                "iDD/iMM/iYYYY"
              ),
              "day"
            ) ? (
              <>
                <Menu.Item>
                  <p>
                    رخصة البلدية إنتهت , برجاء تجديد الرخصة
                    <FontAwesomeIcon
                      icon={faArrowLeft}
                      className="inboxArrow mx-2"
                      style={{ color: "#d62f2f" }}
                    />
                  </p>
                </Menu.Item>
                <hr />
              </>
            ) : props.user.engineering_companies.municipality_license !==
                null &&
              moment(
                props.user.engineering_companies.municipality_license.end_date,
                "iDD/iMM/iYYYY"
              ).diff(todayDate, "days") <= 30 &&
              todayDate.isBefore(
                moment(
                  props.user.engineering_companies.municipality_license
                    .end_date,
                  "iDD/iMM/iYYYY"
                ),
                "day"
              ) ? (
              <>
                <Menu.Item>
                  <p>
                    رخصة البلدية قاربت علي الإنتهاء , برجاء تجديد الرخصة
                    <FontAwesomeIcon
                      icon={faArrowLeft}
                      className="inboxArrow mx-2"
                      style={{ color: "#faad14ba" }}
                    />
                  </p>
                </Menu.Item>
                <hr />
              </>
            ) : null}
            {props.user.engineering_companies.saudi_license !== null &&
            todayDate.isAfter(
              moment(
                props.user.engineering_companies.saudi_license.end_date,
                "iDD/iMM/iYYYY"
              ),
              "day"
            ) ? (
              <>
                <Menu.Item>
                  <p>
                    رخصة الهيئة السعودية إنتهت , برجاء تجديد الرخصة
                    <FontAwesomeIcon
                      icon={faArrowLeft}
                      className="inboxArrow mx-2"
                      style={{ color: "#d62f2f" }}
                    />
                  </p>
                </Menu.Item>
                <hr />
              </>
            ) : props.user.engineering_companies.saudi_license !== null &&
              moment(
                props.user.engineering_companies.saudi_license.end_date,
                "iDD/iMM/iYYYY"
              ).diff(todayDate, "days") <= 30 &&
              todayDate.isBefore(
                moment(
                  props.user.engineering_companies.saudi_license.end_date,
                  "iDD/iMM/iYYYY"
                ),
                "day"
              ) ? (
              <>
                <Menu.Item>
                  <p>
                    رخصة الهيئة السعودية قاربت علي الإنتهاء , برجاء تجديد الرخصة
                    <FontAwesomeIcon
                      icon={faArrowLeft}
                      className="inboxArrow mx-2"
                      style={{ color: "#faad14ba" }}
                    />
                  </p>
                </Menu.Item>
                <hr />
              </>
            ) : null}
          </Menu>
        }
        placement="bottomLeft"
        arrow
      >
        <Button onClick={
          handleEngNotificationShow
        }>
          <Tooltip placement="topLeft" title="تنبيهات المكتب الهندسي">
            <NotificationsIcon className="engNotificationIcon" />
          </Tooltip>
          {/* <span className="navitem px-2">{this.props.user.name}</span> */}
        </Button>
      </Dropdown>
    </>
  );
}
const mapStateToProps = function (state) {
  return {
    isAuth: state.auth.isAuth,
    user: state.auth.user,
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(NotificationsMenu);
