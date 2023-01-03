import React from "react";

//Packages
import { toArabic } from "arabic-digits";

//Images

export default function SmallFooter() {
  return (
    <div className="smallfooter ">
        <p className="smallfooterYear py-3 ">
        جميع الحقوق محفوظة - الإدارة العامة للتخطيط والتصميم العمرانى          {toArabic(new Date().getFullYear())}
        </p>
    </div>
  );
}
