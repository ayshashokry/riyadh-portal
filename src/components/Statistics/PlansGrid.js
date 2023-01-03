import React, { useState } from "react";

import { Col, Row } from "antd";

export default function PlansGrid(props) {
  const gridData= props.selectedDate==1?props.Data2021.PlansGrid:props.Data2022.PlansGrid

  return (
    <>
      <Row className="smallChartCardGrid1 mt-3">
        {gridData.map((d) => (
          <Col
            sm={{ span: 12 }}
            md={{ span: 8 }}
            lg={{ span: 12 }}
            className="gridDetails">
            <h6>
              <img
                alt="imgIcon"
                src={d.icon}
                style={{ backgroundColor: d.color }}
              />
              {d.name}
            </h6>
            <p>
              <span className="title">عدد:</span>
              <span className="result">{d.number}</span>
            </p>
            <p>
              <span className="title">مساحة:</span>
              <span className="result">{d.space} م2</span>
            </p>
          </Col>
        ))}
      </Row>
    </>
  );
}
