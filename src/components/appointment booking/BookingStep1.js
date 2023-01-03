import React, { Component } from "react";

//Packages
import { Container } from "react-bootstrap";
import { Row, Col, Button } from "antd";
import drasatT5tetya from "../../assets/images/bookingDepartments/drasatT5tetya.png";
import edaretElta5tet from "../../assets/images/bookingDepartments/edaretElta5tet.png";
import importantProjects from "../../assets/images/bookingDepartments/importantProjects.png";
import nozomInfo from "../../assets/images/bookingDepartments/nozomInfo.png";
import msa7a from "../../assets/images/bookingDepartments/msa7a.png";
import tnmya from "../../assets/images/bookingDepartments/tnmya.png";
import t5tetOmrany from "../../assets/images/bookingDepartments/t5tetOmrany.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
export default class BookingStep1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      highlightDepartment: 0,
      selectDep: {},
      noSlots: "",
      departmentDates: [],
      departmentsImages: [
        {
          id: 2148,
          img: t5tetOmrany,
        },
        {
          id: 228,
          img: msa7a,
        },
        {
          id: 1928,
          img: nozomInfo,
        },
        {
          id: 1929,
          img: tnmya,
        },
        {
          id: 1988,
          img: drasatT5tetya,
        },
        {
          id: 2071,
          img: importantProjects,
        },
        {
          id: 2072,
          img: edaretElta5tet,
        },
      ],
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  getDepartmentData(data) {
    this.props.getSelectedDepartment(data);
    this.setState({ highlightDepartment: data.id, selectDep: data });
  }
  nextStep = (e) => {
    this.props.getSelectedDepartment(this.props.selectedDepartment);
    this.props.next();
  };
  render() {
    console.log(this.props.selectedDepartment);
    return (
      <Container>
        <Row className="my-2 ">
          {this.props.departments !== undefined &&
          this.props.departments.length !== 0
            ? this.props.departments.map((d, index) => (
                <Col
                  onClick={this.getDepartmentData.bind(this, d)}
                  id={d.id}
                  key={index}
                  xs={{ span: 24 }}
                  md={{ span: 24 }}
                  lg={{ span: 4 }}
                  className={`${
                    d.id === this.state.highlightDepartment ||
                    d.id === this.props.selectedDepartment.id
                      ? "highlight p-3 mb-4 managementItem"
                      : "noHiglight p-3 mb-4 managementItem"
                  }`}
                >
                  <div className=" pt-2  ">
                    <div className="text-center">
                      {this.state.departmentsImages.length > 0 &&
                        this.state.departmentsImages.map((img, index) =>
                          img.id === d.id ? (
                            <img
                              className="img-fluid"
                              style={{ width: "50px", height: "50px" }}
                              src={img.img}
                              alt="icon1"
                            />
                          ) : null
                        )}
                    </div>
                    <p className="pt-2">{d.name}</p>
                  </div>
                </Col>
              ))
            : null}
        </Row>{" "}
        <div className="steps-action my-3">
          {" "}
          <Button
            type="primary"
            htmlType="submit"
            onClick={this.nextStep}
            className="nextBtn ml-3"
            disabled={Object.keys(this.props.selectedDepartment).length === 0}
          >
            الخطوة التالية
            <FontAwesomeIcon className=" mr-2 " icon={faArrowLeft} />
          </Button>
        </div>
      </Container>
    );
  }
}
