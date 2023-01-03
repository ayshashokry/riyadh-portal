import React from "react";
import { Progress } from "antd";
import CountUp from "react-countup";

export default function ProgressChart(props) {
  return (
    <div className="progressChart">
      <Progress
        type="dashboard"
        percent={50}
        format={() => (
          <CountUp
            start={props.number / 4}
            end={props.number}
            duration={4}
            separator=""
            decimals={0}
            delay={0}
            decimal=",">
            {({ countUpRef }) => (
              <div>
                <span ref={countUpRef} />
              </div>
            )}
          </CountUp>
        )}
      />
      <p>{props.title}</p>
    </div>
  );
}
