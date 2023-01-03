import React from "react";
import Fade from "react-reveal";
export default function HomeMessage() {
  return (
    <div className="homeMsg">
      <h5>الرسالة</h5>
      <Fade left>
        <p>
          الإلتزام بالمعايير والضوابط التخطيطية والتى من خلالها يتم الإرتقاء
          بمدينة الرياض عمرانياً وإجتماعياً وإقتصادياً وبيئياً
        </p>
      </Fade>
    </div>
  );
}
