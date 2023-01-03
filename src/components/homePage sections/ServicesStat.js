import React, { useState } from "react";
import { Row, Col } from "antd";
import { Fade } from "react-reveal";
//Images
import engOffice from "../../assets/images/servicesStatImages/engOffice.svg";
import bigProject from "../../assets/images/servicesStatImages/bigProject.svg";
import documentedTran from "../../assets/images/servicesStatImages/documentedTran.svg";
import updatedInstrument from "../../assets/images/servicesStatImages/updatedInstrument.svg";

import stat1 from "../../assets/images/servicesStatImages/stat1.png";
import stat2 from "../../assets/images/servicesStatImages/stat2.png";
import stat3 from "../../assets/images/servicesStatImages/stat3.png";
import stat4 from "../../assets/images/servicesStatImages/stat4.png";
export default function ServicesStat(props) {
  const [stat] = useState([
    {
      id: 1,
      number: 1000,
      name: "مكتب هندسي مؤهل",
      icon: engOffice,
      img: stat1,
      animationDelay: 100,
      borderRadius: "16px",
    },
    {
      id: 2,
      number: 230,
      name: "مخطط معتمد",
      icon: bigProject,
      img: stat2,
      animationDelay: 400,
      borderRadius: "0 0 0 0 ",
    },
    {
      id: 3,
      number: 6000,
      name: "معاملة موثقة",
      icon: documentedTran,
      img: stat3,
      animationDelay: 700,
      borderRadius: "0 0 0 0 ",
    },
    {
      id: 4,
      number: 8856,
      name: "إجمالي المساحات المخططة",
      icon: updatedInstrument,
      img: stat4,
      animationDelay: 1000,
      borderRadius: "16px",
    },
  ]);
  return (
    <div className="landingStats servicesContainer">
      <Row>
        {stat.map((s) => (
          <Col xxl={{ span: 6 }} xl={{ span: 6 }} md={{ span: 12 }} xs={{ span: 24 }}>
            <Fade right delay={s.animationDelay}>
              <div className="statDiv">
                <div className="statDiv-img">
                  <img
                    className="img-fluid bg"
                    src={s.img}
                    alt="statBG"
                    style={{ borderRadius: s.borderRadius }}
                  />
                </div>

                <div className="statDiv-info">
                  <img
                    alt="statImage"
                    src={s.icon}
                    className="statIcon"
                    style={{ height: "120px", width: "120px" }}
                  />
                  <h4>{s.number} </h4>
                  <p>{s.name}</p>
                </div>
              </div>
            </Fade>
          </Col>
        ))}
      </Row>
    </div>
  );
}
