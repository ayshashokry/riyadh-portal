import React, { useEffect } from "react";
import NavBarr from "../containers/NavBarr";
import Footer from "../containers/Footer";
import { Slide, Flip, Rotate } from "react-reveal";
import { Link } from "react-router-dom";
import AvatarImg from "../assets/images/avatar.png";

export default function OrganizationChartPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="goalsPage organizeChart">
      <NavBarr />
      <div className="goalsHeader">
        <div className=" pt-5 pb-3 px-5 mr-lg-5">
          <span className="span1">
            <Link to="/"> الرئيسية </Link> . عن البوابة الإلكترونية .
          </span>
          <span className="span2">الهيكـل التنـظـيمي </span>
          <h1>الهيكـل التنـظـيمي </h1>
        </div>
      </div>
      <div className="goals ">
        <div className="orgChart ">
          <ul>
            <li className="m-auto firstHirearcyLI">
              <Slide left>
                <div className="firstHirearcy">
                  {/* <img
                    src={AvatarImg}
                    alt="avatarImg"
                    style={{ width: "48px", height: "48px" }}
                  /> */}
                  <div>
                    <p>أمين منطقة الرياض</p>
                    <h5>الأمير / فيصل بن عبد العزيز بن عياف</h5>
                  </div>
                </div>
              </Slide>
              <div className="firstUL">
                <li className="secondLiNOBeforeAfter">
                  <Slide right>
                    <div className="secondHirearcy">
                      {/* <img
                        src={AvatarImg}
                        alt="avatarImg"
                        style={{ width: "48px", height: "48px" }}
                      />{" "} */}
                      <div>
                        <p style={{paddingTop:'20px'}}>مساعد الأمين لإدارة المدينة </p>
                      </div>
                    </div>
                  </Slide>
                </li>
                <li className="secondLiBeforeAfter">
                  <Slide right>
                    <div className="secondHirearcy">
                      {/* <img
                        src={AvatarImg}
                        alt="avatarImg"
                        style={{ width: "48px", height: "48px" }}
                      />{" "} */}
                      <div>
                        <p>وكيل التنمية الحضرية</p>
                        <h5>دكتور / عبد الإله بن محمد المعيوف</h5>
                      </div>
                    </div>
                  </Slide>
                </li>
                <li className="secondLiBeforeAfter">
                  <Slide right>
                    <div className="secondHirearcy">
                      {/* <img
                        src={AvatarImg}
                        alt="avatarImg"
                        style={{ width: "48px", height: "48px" }}
                      />{" "} */}
                      <div>
                        <p>الوكيل المساعد للتخطيط العمراني</p>
                        <h5>المهندس / صالح بن محمد السيف</h5>
                      </div>
                    </div>
                  </Slide>
                </li>
              </div>
            </li>
          </ul>
        </div>
        <div className="orgChart ">
          <ul>
            <li className="m-auto ul100">
              <hr />

              <ul className="noBeforeThird">
                <li className="thirdLI ul100">
                  <Flip left>
                    <div className="thirdHirearcy">
                      {/* <img
                        src={AvatarImg}
                        alt="avatarImg"
                        style={{ width: "48px", height: "48px" }}
                      />{" "} */}
                      <div>
                        <p>مدير عام التخطيط والتصميم العمرانى</p>
                        <h5>المهندس / محمد بن غانم العابسى</h5>
                      </div>
                    </div>
                  </Flip>
                  <hr />

                  <ul className="finalUl row">
                    <li className="col-xl-4 col-lg-12 col-sm-12">
                      <Rotate bottom right>
                        <div className="finalHirearcy">
                          {/* <img
                            src={AvatarImg}
                            alt="avatarImg"
                            style={{ width: "48px", height: "48px" }}
                          />{" "} */}
                          <div>
                            <p>مدير إدارة الدمج والتجزئة</p>
                            <h5>المهندس/إبراهيم عبد الله الحجى</h5>{" "}
                          </div>
                        </div>
                      </Rotate>
                    </li> <li className="col-xl-3 col-lg-12 col-sm-12">
                      <Rotate bottom right>
                        <div className="finalHirearcy">
                          {/* <img
                            src={AvatarImg}
                            alt="avatarImg"
                            style={{ width: "48px", height: "48px" }}
                          />{" "} */}
                          <div>
                            <p>مدير إدارة إعتماد المخططات </p>
                            <h5>المهندس/ أحمد بن صالح سماره</h5>
                          </div>
                        </div>
                      </Rotate>
                    </li>
                    <li className="col-xl-4 col-lg-12 col-sm-12 beforeNone">
                      <Rotate bottom left>
                        <div className="finalHirearcy">
                          {/* <img
                            src={AvatarImg}
                            alt="avatarImg"
                            style={{ width: "48px", height: "48px" }}
                          />{" "} */}
                          <div>
                            <p>مدير إدارة تخطيط المدينة</p>
                            <h5>المهندس/ بندر بن رباح الحربى</h5>
                          </div>
                        </div>
                      </Rotate>
                    </li>
                   
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}
