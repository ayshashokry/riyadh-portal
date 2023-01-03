import React, { useState, useEffect } from "react";

//Packages
import { Container } from "react-bootstrap";
import { Collapse } from "antd";
import NavBarr from "../../containers/NavBarr";
import Footer from "../../containers/Footer";
import { toArabic } from "arabic-digits";
import { Link } from "react-router-dom";
// const numEachPage = 5;
export default function CommonQuestions() {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  // const [minValue, setMinValue] = useState(0);
  // const [maxValue, setMaxValue] = useState(numEachPage);
  // const [currentPage, setCurrentPage] = useState(1);
  const [questions] = useState([
    {
      id: 1,
      ques: "ما هى البوابة الإلكترونية لأمانة منطقة الرياض؟",
      answer:
        "هى بوابة الكترونية تضم عدة خدمات الكترونيات خاصة بالادارة العامة لنظم المعلومات الجغرافية.",
    },
    {
      id: 2,
      ques: "ما هى  الخدمات الإلكترونية المتوفرة بالبوابة الإلكترونية؟",
      answer:
        "يمكنك الاطلاع على الخدمات الالكترونية بالبوابة الإلكترونية عن طريق النقر على (خدمات البوابة).",
    },

    {
      id: 3,
      ques: "كيف يمكنني الاستعلام عن معاملة إلكترونيا؟",
      answer:
        "من خلال خاصية  الاستعلام عن معاملة  في الصفحة الرئيسية عن طريق اختيار نوع المعاملة وادخال رقم المعاملة.",
    },
    {
      id: 4,
      ques: "أواجه مشكلة في احد الخدمات الإلكترونية",
      answer: (
        <ul className="contactInfo">
          <li>
            يمكنك التواصل عن طريق الدعم الفني , الهاتف:
            <a href="tel:33404112222" target="_blank" rel="noopener noreferrer">
              {toArabic("33404112222")}
            </a>
          </li>
          <li className="pt-3 pb-3">
            {" "}
            الفاكس:{" "}
            <a href="tel:33404112222" target="_blank" rel="noopener noreferrer">
              {toArabic("33404112222")}
            </a>
          </li>
          <li>
            البريد الألكتروني:
            <a
              href="mailto:ESupport@alriyadh.gov.sa"
              target="_blank"
              rel="noopener noreferrer"
            >
              ESupport@alriyadh.gov.sa
            </a>
          </li>
        </ul>
      ),
    },
  ]);
  // const handleChangePage = (page) => {
  //   setCurrentPage(page);
  //   setMinValue((page - 1) * numEachPage);
  //   setMaxValue(page * numEachPage);
  // };
  const { Panel } = Collapse;

  return (
    <div className="goalsPage commonQuestions">
      {" "}
      <NavBarr />
      <div className="goalsHeader">
        <div className=" pt-5 pb-3 px-5 mr-lg-5">
          {" "}
          <span className="span1">
            <Link to="/"> الرئيسية </Link> .
            <Link to="/ContactUs">عن البوابة الإلكترونية </Link> .
          </span>
          <span className="span2"> الأسئلة الشائعة </span>
          <h1> الأسئلة الشائعة</h1>
        </div>
      </div>
      <Container>
        <Collapse defaultActiveKey={["1"]}>
          {questions?.map((val, index) => (
            <Panel header={val.ques} key={val.id}>
              <p className="pr-4">{val.answer}</p>
            </Panel>
          ))}
        </Collapse>
        {/* <ConfigProvider direction="ltr">
          <Pagination
            className="mt-4"
            pageSize={numEachPage}
            current={currentPage}
            total={questions.length}
            onChange={handleChangePage}
            style={{ bottom: "0px" }}
          />
        </ConfigProvider> */}
      </Container>
      <Footer />
    </div>
  );
}
