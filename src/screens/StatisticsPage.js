import { Row, Col, DatePicker, Select, Form } from "antd";
import moment from "moment";

import React, { useState } from "react";
import SmallFooter from "../containers/SmallFooter";
import SmallNavbar from "../containers/SmallNavbar";
import statIcon1 from "../assets/images/StatsImages/statIcon1.svg";
import statIcon2 from "../assets/images/StatsImages/statIcon2.svg";
import statIcon3 from "../assets/images/StatsImages/statIcon3.svg";
import statIcon4 from "../assets/images/StatsImages/statIcon4.svg";
import statIcon5 from "../assets/images/StatsImages/statIcon5.svg";
import PieChart1 from "../components/Statistics/PieChart1";
import PieChart2 from "../components/Statistics/PieChart2";
import BarChart1 from "../components/Statistics/BarChart1";
import ProgressChart from "../components/Statistics/ProgressChart";
import PlansGrid from "../components/Statistics/PlansGrid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import img1 from "../assets/images/StatsImages/img2021.png";
import img2 from "../assets/images/StatsImages/img2022.png";
import sakanyIcon from "../assets/images/StatsImages/sakanyIcon.svg";
import togaryIcon from "../assets/images/StatsImages/togaryIcon.svg";
import educationIcon from "../assets/images/StatsImages/educationIcon.svg";
import mosqueIcon from "../assets/images/StatsImages/mosqueIcon.svg";
import gardenIcon from "../assets/images/StatsImages/gardenIcon.svg";
import investIcon from "../assets/images/StatsImages/investIcon.svg";
import securityIcon from "../assets/images/StatsImages/securityIcon.svg";
import healthIcon from "../assets/images/StatsImages/healthIcon.svg";
import muniplacityIcon from "../assets/images/StatsImages/muniplacityIcon.svg";
const dateFormat = "YYYY/MM/DD";

export default function StatisticsPage() {
  const Data2021 = {
    finishedSubmissions: "13,223",
    underStudySubmissions: "2,390",
    m7aderNum: 637,
    approvOfficeNum: 21,
    plansNum: 20,
    totalSpace: "18,746,812.17",
    PlansGrid: [
      {
        id: 1,
        name: "سكني",
        icon: sakanyIcon,
        number: "20,088",
        space: "7,490,212",
        color: "#08a76c",
      },
      {
        id: 2,
        name: "تجاري",
        icon: togaryIcon,
        number: 1012,
        space: "1,558,849",
        color: "#ACCFE7",
      },
      {
        id: 3,
        name: "المرافق التعليمية",
        icon: educationIcon,
        number: 27,
        space: "191,357",
        color: "#7BACD4",
      },
      {
        id: 4,
        name: "المرافق الدينية",
        icon: mosqueIcon,
        number: 82,
        space: "500,860",
        color: "#87B9FE",
      },
      {
        id: 5,
        name: "الحدائق",
        icon: gardenIcon,
        number: 19,
        space: "927,513",
        color: "#A2B6D1",
      },
      {
        id: 6,
        name: "إستثمارات بلدية",
        icon: investIcon,
        number: 9,
        space: "49,585",
        color: "#79C8FE",
      },
      {
        id: 7,
        name: "مرافق أمنية",
        icon: securityIcon,
        number: 0,
        space: "0",
        color: "#698EA7",
      },
      {
        id: 8,
        name: "المرافق الصحية",
        icon: healthIcon,
        number: 5,
        space: "15,361",
        color: "#929BA2",
      },
      {
        id: 9,
        name: "المرافق البلدية",
        icon: muniplacityIcon,
        number: 0,
        space: "0",
        color: "#ADA9AE",
      },
    ],
  };
  const Data2022 = {
    finishedSubmissions: "16,721",
    underStudySubmissions: "2,974",
    m7aderNum: 582,
    approvOfficeNum: 26,
    plansNum: 32,
    totalSpace: "23804170.63",
    PlansGrid: [
      {
        id: 1,
        name: "سكني",
        icon: sakanyIcon,
        number: "27,180",
        space: "10,781,916.63",
        color: "#08a76c",
      },
      {
        id: 2,
        name: "تجاري",
        icon: togaryIcon,
        number: 1034,
        space: "2,478,220.06",
        color: "#ACCFE7",
      },
      {
        id: 3,
        name: "المرافق التعليمية",
        icon: educationIcon,
        number: 77,
        space: "403,219.71",
        color: "#7BACD4",
      },
      {
        id: 4,
        name: "المرافق الدينية",
        icon: mosqueIcon,
        number: 137,
        space: "429,888.57",
        color: "#87B9FE",
      },
      {
        id: 5,
        name: "الحدائق",
        icon: gardenIcon,
        number: 137,
        space: "3,626,331.68",
        color: "#A2B6D1",
      },
      {
        id: 6,
        name: "إستثمارات بلدية",
        icon: investIcon,
        number: 20,
        space: "79,586.53",
        color: "#79C8FE",
      },
      {
        id: 7,
        name: "مرافق أمنية",
        icon: securityIcon,
        number: 6,
        space: "28,522",
        color: "#698EA7",
      },
      {
        id: 8,
        name: "المرافق الصحية",
        icon: healthIcon,
        number: 9,
        space: "30,214",
        color: "#929BA2",
      },
      {
        id: 9,
        name: "المرافق البلدية",
        icon: muniplacityIcon,
        number: 7,
        space: " 86,894.61",
        color: "#ADA9AE",
      },
    ],
  };
  const [selectedDate, setDate] = useState(2);
  const changeDate = (value) => {
    setDate(value);
  };

  return (
    <div className="StatisticsPage">
      <SmallNavbar />
      <h3 className="statTitle">مؤشرات أداء الإدارة العامة للتخطيط العمرانى</h3>
      <div
        style={{ textAlign: "right", padding: "0 100px" }}
        className=" mt-3 mb-3">
        {/* <DatePicker.RangePicker inputReadOnly placeholder={["الفتره من يناير -2022 ","/ يونيو -2022 "]}
      // defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
      format={dateFormat}
    /> */}
        <Row>
          <Col
            sm={{ span: 14 }}
            xs={{ span: 14 }}
            md={{ span: 12 }}
            lg={{ span: 8 }}
            xl={{ span: 6 }}>
            <Form initialValues={{ selectedDate: 2 }}>
              <Form.Item
                initialValue={2}
                name="selectedDate"
                className="statSelectDate">
                <Select
                  suffixIcon={
                    <FontAwesomeIcon
                      className="fx-2 calendarIcon"
                      icon={faCalendar}
                    />
                  }
                  onChange={changeDate}
                  value={selectedDate}
                  name="selectedDate">
                  <Select.Option value={1}>
                    <span className="periodFrom">الفترة من</span> يناير 2021 -
                    ديسمبر 2021
                  </Select.Option>
                  <Select.Option value={2}>
                    <span className="periodFrom">الفترة من</span> يناير 2022 -
                    ديسمبر 2022
                  </Select.Option>
                </Select>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
      <Row className="StatData" type="flex">
        <Col
          sm={{ span: 24 }}
          xs={{ span: 24 }}
          md={{ span: 24 }}
          lg={{ span: 12 }}
          xl={{ span: 8 }}>
          <div className="smallChartCard">
            <h5>
              <img alt="statIcon" src={statIcon1} className="mx-2" />
              عدد المعاملات
            </h5>
            <div className="chartWithData chartWithData1 ">
              <div>
                <p>
                  <span className="ColorCircleGreen"></span>المعاملات المنجزة:
                </p>
                <h6 className="NumGreen">
                  {selectedDate == 1
                    ? Data2021.finishedSubmissions
                    : Data2022.finishedSubmissions}{" "}
                  معاملة
                </h6>
                <p>
                  <span className="ColorCircleGray"></span>المعاملات تحت
                  الدراسة:
                </p>
                <h6 className="NumGray">
                  {" "}
                  {selectedDate == 1
                    ? Data2021.underStudySubmissions
                    : Data2022.underStudySubmissions}{" "}
                  معاملة
                </h6>
              </div>
              <PieChart1 />
            </div>
          </div>
        </Col>
        <Col
          sm={{ span: 24 }}
          xs={{ span: 24 }}
          md={{ span: 24 }}
          lg={{ span: 12 }}
          xl={{ span: 8 }}>
          <div className="smallChartCard">
            <h5>
              <img alt="statIcon" src={statIcon2} className="mx-2" /> محاضر
              التجزئة والدمج
            </h5>
            <div className="chartWithData noflex mt-3">
              {selectedDate == 1 ? (
                <div>
                  <p>عدد المحاضر لسنة 2021 </p>
                  <h6 className="NumGreen2">{Data2021.m7aderNum}</h6>
                </div>
              ) : (
                <div>
                  <p>عدد المحاضر لسنة 2022 </p>
                  <h6 className="NumGreen2">{Data2022.m7aderNum}</h6>
                </div>
              )}
              <BarChart1 selectedDate={selectedDate} />
            </div>
          </div>
        </Col>
        <Col
          sm={{ span: 24 }}
          xs={{ span: 24 }}
          md={{ span: 24 }}
          lg={{ span: 12 }}
          xl={{ span: 8 }}>
          <div className="smallChartCard">
            <h5>
              <img alt="statIcon" src={statIcon3} className="mx-2" /> المكاتب
              الهندسية التى تم تأهيلها
            </h5>
            <ProgressChart
              title="عدد المكاتب الهندسية المعتمدة"
              number={
                selectedDate == 1
                  ? Data2021.approvOfficeNum
                  : Data2022.approvOfficeNum
              }
            />
          </div>
        </Col>
      </Row>

      <Row className="StatData mb-5 pb-5" type="flex">
        <Col
          sm={{ span: 24 }}
          xs={{ span: 24 }}
          md={{ span: 24 }}
          lg={{ span: 12 }}>
          <div className="smallChartCard smallChartCardHeight ">
            <h5>
              <img alt="statIcon" src={statIcon4} className="mx-2" />
              المخططات الأولية
            </h5>
            <div className="chartWithData chartWithData1 ">
              <div className="dataFlex">
                <div>
                  <p>إجمالى عدد المخططات المعتمدة:</p>
                  <h6 className="NumGreen">
                    {selectedDate == 1 ? Data2021.plansNum : Data2022.plansNum}{" "}
                    مخطط
                  </h6>
                </div>
                <div>
                  <p>إجمالى المساحة:</p>
                  <h6 className="NumGreen">
                    {" "}
                    {selectedDate == 1
                      ? Data2021.totalSpace
                      : Data2022.totalSpace}
                    م 2{" "}
                  </h6>
                </div>
              </div>
            </div>
            <div className="gridFlexDiv">
              {" "}
              <PlansGrid
                selectedDate={selectedDate}
                Data2021={Data2021}
                Data2022={Data2022}
              />
              <div style={{ position: "relative" }}>
                <PieChart2 selectedDate={selectedDate} />
              </div>
            </div>
          </div>
        </Col>

        <Col
          sm={{ span: 24 }}
          xs={{ span: 24 }}
          md={{ span: 24 }}
          lg={{ span: 12 }}>
          <div className="smallChartCard" style={{ textAlign: "center" }}>
            <h5>
              <img alt="statIcon" src={statIcon5} className="mx-2" />
              أعداد المخططات لبلديات الرياض
            </h5>
            <img
              style={{ width: "100%" }}
              src={selectedDate == 1 ? img1 : img2}
            />{" "}
          </div>
        </Col>
      </Row>
      <SmallFooter />
    </div>
  );
}
