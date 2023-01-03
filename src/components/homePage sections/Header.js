import React from "react";
import Slider from "react-slick";
import img1 from "../../assets/images/homeHeaderImages/homeHeader1.png";
import img2 from "../../assets/images/homeHeaderImages/homeHeader2.png";
import img3 from "../../assets/images/homeHeaderImages/homeHeader3.png";
import img4 from "../../assets/images/homeHeaderImages/homeHeader4.png";

import Media from "react-media";
export default function Header() {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 800,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="homeHeader">
      <Media query="(max-width: 768px)">
        {(matches) =>
          matches ? null : (
            <Slider {...settings}>
              <div className="homeSliderDiv ">
                <img src={img1} alt="newsImage" />
                <div className="homeSliderData slideNum1Data">
                  <h5 style={{ textAlign: "center" }}>
                    نعمل للإرتقاء بالالتزام بالمعايير والضوابط التخطيطية والتى
                    من خلالها يتم الإرتقاء بمدينة الرياض عمرانياً وإجتماعياً
                    وإقتصادياً وبيئياً
                  </h5>
                </div>
              </div>
              <div className="homeSliderDiv">
                <img src={img2} alt="newsImage" />
                <div className="homeSliderData">
                  <h5>إدارة تخطيط المدينة</h5>
                  <p>
                    تعنى ادارة تخطيط المدينة بدراسه جميع الطلبات الخاصه بالمشاكل
                    التخطيطيه ضمن المخططات المعتمده على مستوى مدينه الرياض والتي
                    تنشأ لاسباب منها التوسع العمراني وارتفاع الكثافات السكانيه
                    ولتحقيق رغبات السكان و الجهات الحكوميه كما انه يتم دراسه
                    نطاقات الخدمه للمرافق الحكوميه حسب الكثافات السكانيه و مدى
                    حاجتها في المنطقه العمرانيه لوضع الحلول والمقترحات بما
                    يتناسب مع النهضه العمرانيه للمدينه و مواكبه النمو و التطور
                    العمراني لتحقيق الاهداف و الرؤيه
                  </p>
                </div>
              </div>
              <div className="homeSliderDiv">
                <img src={img3} alt="newsImage" />
                <div className="homeSliderData">
                  <h5>إدارة الدمج والتجزئة</h5>
                  <p>
                    تعنى الإدارة باستخراج محاضر اللجنة الفنية وهي محاضر تعنى
                    بتقسيم ودمج الأراضي ضمن المخططات المعتمدة وهى كالتالى:
                    استقبال ومعالجة تجزئة قطع الأرضي ودمجها ضمن الأراضي المخططة
                    والمعتمدة , استحداث ممرات مشاة وشوارع فرعية , طلبات استحداث
                    مساجد في المخططات المعتمدة
                  </p>
                </div>
              </div>
              <div className="homeSliderDiv">
                <img src={img4} alt="newsImage" />
                <div className="homeSliderData">
                  <h5> إدارة اعتماد المخططات</h5>
                  <p>
                    تعنى ادارة إعتماد المخططات بمراجعة طلبات تخطيط الاراضي بكافة
                    انواعها واعتماد المخططات الذي يتم وفق منهجيه محدده تتم عن
                    طريق لجنه مكونه من مجموعه من المختصين والكوادر المؤهله
                    لمناقشه المخططات وضمان تطبيق الانظمه والمعايير لتحقيق تنميه
                    عمرانيه مستدامه لمدينه الرياض ، كما تتولى الاداره مهمه
                    التنسيق مع كافة الجهات ذات العلاقه والمشاركه في اللجان وورش
                    العمل الخاصه بالدراسات والانظمه التخطيطيه
                  </p>
                </div>
              </div>
            </Slider>
          )
        }
      </Media>
      <div className="marquee">
        <div className="marquee__item">
          <>
            <span>
              مرحباً بكم فى البوابة الإلكترونية للإدارة العامة للتخطيط والتصميم العمراني
              بأمانة منطقة الرياض
            </span>
            <span className="marquee__seperator"></span>
          </>
          <>
            <span>
              إطلاق خدمة تأهيل المكاتب الهندسية خدمة الكترونية تتيح للمستفيدين
              تسجيل وتوثيق لكل الإجراءات المطلوبة لتأهيل المكاتب الهندسية
            </span>
            <span className="marquee__seperator"></span>
          </>
        </div>
      </div>
    </div>
  );
}
