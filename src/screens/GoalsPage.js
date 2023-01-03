import React, { useEffect } from "react";

//Packages
import NavBarr from "../containers/NavBarr";
import Footer from "../containers/Footer";
import { Link } from "react-router-dom";
//Images
import img1 from "../assets/images/goalsPageImg.png";

import Fade from "react-reveal";

export default function GoalsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <div className="goalsPage">
      <NavBarr />
      <div className="goalsHeader">
        <div className=" pt-5 pb-3 px-5 mr-lg-5">
          <span className="span1">
            <Link to="/"> الرئيسية </Link> . عن البـوابـة الإلكترونية .
          </span>
          <span className="span2">أهداف البـوابـة الإلكترونية </span>
          <h1>الأهـداف </h1>
        </div>
      </div>
      <div className="goals">
        <div className="my-3 py-3 visionIntroduction goalsIntro mx-lg-5 px-lg-5 px-3">
          <Fade right>
            <h5 className="pb-3"> الأهداف المؤسسية </h5>
            <div style={{ textAlign: "center" }}>
              <img
                src={img1}
                alt="visionIntroduction"
                className="img-fluid"
                style={{width:"100%"}}
            
              />
            </div>
            <ul className="mt-5 goalsUL">
              <li> الدقة في الأداء وتقديم الخدمات وفق اعلى معايير الجودة. </li>
              <li>
                فتح قنوات التواصل مع المجتمع المحلي وشركاء التنمية في المدينة.
              </li>
              <li>
                تحسين البيئة العمرانية ورفع مستوى جودة الحياة وذلك من خلال
                الدراسات العمرانية والسكانية ووضع الحلول والمقترحات لتوفير
                الخدمات المطلوبة (الأمنية والصحية والترفيهية والتعليمية والدينية
                والثقافية) للاحتياج الحالي والمستقبلي.
              </li>
              <li>
                سرعة أداء الاعمال عبر تقديم قنوات الكترونية لإنهاء الإجراءات.
              </li>
              <li>
                المشاركة في الدراسات العمرانية لتطوير وتحسين المشهد الحضري
                للمدينة.
              </li>
              <li>
                تحديد المهام والمسئوليات وفق الهيكل الإداري ووضع خطة ممارسة
                الاعمال وتحديثها باستمرار.
              </li>
              <li> دراسة المشاكل والمعوقات وإيجاد الحلول والبدائل. </li>
              <li> وضع معايير وبرامج لتقييم الأداء ومتابعة الإنجاز. </li>
              <li>
                تطبيق معايير الجودة والتطوير وتحسين مستوى الاعمال والتحديث
                والتحسين المستمر للإجراءات.
              </li>
              <li> التطوير المستمر للكوادر الفنية والإدارية. </li>
            </ul>
          </Fade>
        </div>
      </div>
      <Footer />
    </div>
  );
}
