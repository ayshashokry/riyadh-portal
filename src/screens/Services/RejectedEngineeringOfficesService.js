import React, { Component } from "react";
//Packages
import { Container, Button, Table } from "react-bootstrap";
import {
  Row,
  Col,
  Form,
  Select,
  Pagination,
  ConfigProvider,
  Image,
} from "antd";
import NavBarr from "../../containers/NavBarr";
import moment from "moment-hijri";
import Footer from "../../containers/Footer";
import axios from "axios";
import Loader from "../../containers/Loader";
import PrintComponents from "react-print-components";
import { Print } from "react-easy-print";
import Logo from "../../assets/images/logos/riyadhLogoFooter.png";
import { toArabic } from "arabic-digits";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";

export default class RejectedEngineeringOfficesService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValues: {
        category: "",
        department: "",
      },
      allData: [],
      allCategories: [],
      allDepartments: [],
      loading: false,
      errorMsg: "",
      tableResult: [],
      currentPage: 1,
      allResults: {},
    };
  }
  handleChangePage = (page) => {
    this.setState({
      loading: true,
      currentPage: page,
    });
    // window.scrollTo(0, 0);
    console.log(this.state.allResults);
    if (
      (this.state.allResults.next !== "" &&
        this.state.allResults.next !== undefined) ||
      (this.state.allResults.prevURL !== "" &&
        this.state.allResults.prevURL !== undefined)
    ) {
      axios
        .get(
          window.ApiUrl +
            `/EngineeringCompany/GetAllRejected?page=${page - 1}&pageSize=30`,
          {
            headers: {
              "content-type": "application/json",
              Authorization: `bearer ${localStorage.token}`,
            },
          }
        )
        .then((res) => {
          if (res.data) {
            this.setState({
              allData: res.data.results,
              tableResult: res.data.results,
              loading: false,
              allResults: res.data,
            });
          }
        });
    }
  };
  async componentDidMount() {
    this.setState({ loading: true });
    window.scrollTo(0, 0);

    await new Promise((resolve, reject) => {
      axios
        .get(window.ApiUrl + `/EngineeringCompany/GetAllRejected?pageSize=30`, {
          headers: {
            "content-type": "application/json",
            Authorization: `bearer ${localStorage.token}`,
          },
        })
        .then((res) => {
          resolve(res.data);
          if (res.data) {
            this.setState({
              allData: res.data.results,
              tableResult: res.data.results,
              loading: false,
              allResults: res.data,
            });
          }
        });
    });
    await new Promise((resolve, reject) => {
      axios
        .get(
          window.ApiUrl +
            `/api/Department?q=${1}&filter_key=${"approving_dep"}&operand==`
        )
        .then((res) => {
          resolve(res.data);
          if (res.data) {
            this.setState({
              allDepartments: res.data.results,
              loading: false,
            });
          }
        });
    });
    await new Promise((resolve, reject) => {
      axios.get(window.ApiUrl + "/api/EnginneringCompanyClass").then((res) => {
        resolve(res.data);
        if (res.data) {
          this.setState({
            allCategories: res.data.results,
            loading: false,
          });
        }
      });
    });
  }

  handleSelect = (name) => (value, e) => {
    this.setState({ [name]: value });
  };

  Search = (e) => {
    const filteredTasks = this.filterTasks(
      this.state.allData,
      this.state.category,
      this.state.department
    );
    this.setState({ tableResult: filteredTasks });
  };
  filterTasks = (tasks, category, department) => {
    let filteredTasks = tasks;
    if (category)
      filteredTasks = filteredTasks.filter((t) =>
        t.eng_comp_class !== null
          ? String(t.eng_comp_class.name).includes(category)
          : null
      );
    if (department)
      filteredTasks = filteredTasks.filter((t) =>
        t.department_eng_comp.find((x) =>
          x.departments.name.includes(department)
        )
      );
    return filteredTasks;
  };
  render() {
    return (
      <div className="goalsPage approvedServie">
        <NavBarr />
        <div className="goalsHeader">
          <div className=" pt-5 pb-3 px-5 mr-lg-5">
            {" "}
            <span className="span1">
              {" "}
              <Link to="/"> الرئيسية </Link>
            </span>
            <span className="span2">. المكاتب الهندسية المعتذر عنها</span>
            <h1> المكـاتب الهندسيـة المعتذر عنها</h1>
          </div>
        </div>
        <div className="goals servicePage mb-5 pb-5">
          <Container fluid className="px-lg-4">
            <Form
              className="my-4 px-5 serviceForm"
              layout="vertical"
              name="validate_other"
            >
              <Row>
                <Col
                  md={{ span: 9 }}
                  sm={{ span: 24 }}
                  xs={{ span: 24 }}
                  className="px-2"
                >
                  <Form.Item
                    // hasFeedback
                    label="اسم المكتب"
                    name="category"
                    // rules={[
                    //   {
                    //     message: "أختر اسم المكتب ",
                    //     required: true,
                    //   },
                    // ]}
                  >
                    <Select
                      virtual={false}
                      showSearch
                      allowClear
                      className="dont-show"
                      onChange={this.handleSelect("category")}
                      value={this.state.category}
                      placeholder="اختر فئة"
                      getPopupContainer={(trigger) => trigger.parentNode}
                    >
                      {" "}
                      <Select.Option name="category" id="" v="" value="">
                        الكل
                      </Select.Option>
                      {this.state.allCategories &&
                      this.state.allCategories.length !== 0
                        ? this.state.allCategories.map((c, index) => (
                            <Select.Option
                              value={c.name}
                              key={c.id}
                              id={c.id}
                              name="category"
                            >
                              {c.name}
                            </Select.Option>
                          ))
                        : null}
                    </Select>
                  </Form.Item>
                </Col>{" "}
                <Col
                  md={{ span: 9 }}
                  sm={{ span: 24 }}
                  xs={{ span: 24 }}
                  className="px-2"
                >
                  <Form.Item
                    // hasFeedback
                    label="الإدارة المقدم إليها طلب الاعتماد "
                    name="department"
                    // rules={[
                    //   {
                    //     message: "أختر الإدارة ",
                    //     required: true,
                    //   },
                    // ]}
                  >
                    <Select
                      virtual={false}
                      showSearch
                      allowClear
                      className="dont-show"
                      onChange={this.handleSelect("department")}
                      value={this.state.department}
                      placeholder="اختر الإدارة"
                      getPopupContainer={(trigger) => trigger.parentNode}
                    >
                      <Select.Option name="department" id="" v="" value="">
                        الكل
                      </Select.Option>
                      {this.state.allDepartments &&
                      this.state.allDepartments.length !== 0
                        ? this.state.allDepartments.map((c, index) => (
                            <Select.Option
                              value={c.name}
                              name="department"
                              key={c.id}
                              id={c.id}
                            >
                              {c.name}
                            </Select.Option>
                          ))
                        : null}
                    </Select>
                  </Form.Item>
                </Col>
                <Col
                  md={{ span: 5 }}
                  sm={{ span: 24 }}
                  className="px-2 m-auto engOfficeTablePrint"
                >
                  <Button onClick={this.Search} className="searchBtn">
                    بحث
                  </Button>
                  <div
                    style={{ textAlign: "left" }}
                    className="servicePrintBtn"
                  >
                    <PrintComponents
                      trigger={
                        <Button>
                          <FontAwesomeIcon
                            icon={faPrint}
                            className="mx-2"
                            style={{ fontSize: "15px" }}
                          />
                          طباعة
                        </Button>
                      }
                    >
                      <Row className="mb-5" style={{ width: "100%" }}>
                        <Col span={2}>
                          <Image src={Logo} />
                        </Col>
                        <Col
                          span={13}
                          className="text-right mr-4 pt-3 printTitle"
                        >
                          <h4>المملكة العربية السعودية</h4>
                          <h6>أمانة الرياض </h6>
                        </Col>
                        <Col
                          span={7}
                          className="text-left mr-4 pt-3 printTitle"
                        >
                          <h4>
                            التاريخ :{" "}
                            {toArabic(moment().format("iYYYY/iMM/iDD"))}
                          </h4>
                        </Col>
                      </Row>
                      <ConfigProvider direction="rtl">
                        <Print single>
                          <Table
                            className="mt-2 ownerTable engTable printTable"
                            responsive
                            ref={(el) => (this.componentRef = el)}
                          >
                            <thead>
                              <tr>
                                <th className="thNumber">رقم الجوال </th>
                                <th className="thNumber">رقم الهاتف </th>
                                <th>البريد الإلكتروني</th>
                                <th>سبب الاعتذار </th>
                                <th
                                // className="thDep"
                                >
                                  الإدارة المقدم عليها الطلب
                                </th>
                                <th>اسم المكتب </th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.tableResult !== undefined &&
                                this.state.tableResult.length > 0 &&
                                this.state.tableResult.map((res, index) => (
                                  <tr
                                    index={res.id}
                                    style={{
                                      borderBottom: "1px solid #d4d6de",
                                    }}
                                  >
                                    <td className="thNumber">{res.mobile}</td>
                                    <td className="thNumber">{res.phone}</td>
                                    <td
                                    // className="thDep"
                                    >
                                      {res.email}
                                    </td>
                                    <td>
                                      {res.eng_comp_class !== null
                                        ? res.eng_comp_class.name
                                        : "---"}
                                    </td>
                                    <td>
                                      {" "}
                                      {res.department_eng_comp.map((x) => (
                                        <>
                                          - <span> {x.departments.name}</span>-
                                          {/* {res.department_eng_comp.length > 2 ? (
                                      <br />
                                    ) : (
                                      ""
                                    )} */}
                                        </>
                                      ))}
                                    </td>
                                    <td>{res.name}</td>
                                  </tr>
                                ))}
                            </tbody>
                          </Table>
                        </Print>
                      </ConfigProvider>
                    </PrintComponents>
                  </div>
                </Col>
              </Row>
            </Form>

            {this.state.loading && this.state.tableResult.length === 0 ? (
              <Loader />
            ) : (
              <>
                <div className=" mt-4">
                  <Table
                    className="mt-2 ownerTable engTable engTableApprove"
                    responsive
                  >
                    <thead>
                      <tr>
                        <th className="thNumber">رقم الجوال </th>
                        <th className="thNumber">رقم الهاتف </th>{" "}
                        <th>البريد الإلكتروني</th>
                        <th>سبب الاعتذار </th>
                        <th>الإدارة المقدم عليها الطلب</th>
                        <th>اسم المكتب </th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.tableResult !== undefined &&
                        this.state.tableResult.length > 0 &&
                        this.state.tableResult.map((res, index) => (
                          <tr
                            index={res.id}
                            style={{
                              borderBottom: "1px solid #d4d6de",
                            }}
                          >
                            <td className="thNumber">{res.mobile}</td>
                            <td className="thNumber">{res.phone}</td>
                            <td
                            // className="thDep"
                            >
                              {res.email}
                            </td>
                            <td>
                              {res.department_eng_comp.map((x) => (
                                <>
                                  - <span> {x.comments}</span>-
                                </>
                              ))}
                            </td>
                            <td>
                              {res.department_eng_comp.map((x) => (
                                <>
                                  - <span> {x.departments.name}</span>-
                                  {/* {res.department_eng_comp.length > 2 ? (
                                        <br />
                                      ) : (
                                        ""
                                      )} */}
                                </>
                              ))}
                            </td>
                            <td>{res.name}</td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                </div>
                {this.state.allResults.next === "" &&
                this.state.allResults.prevURL === "" ? null : (
                  <ConfigProvider direction="ltr">
                    <Pagination
                      className="mt-4"
                      current={this.state.currentPage}
                      defaultCurrent={this.state.currentPage}
                      pageSize={30}
                      total={this.state.allResults.count}
                      onChange={this.handleChangePage}
                      style={{ bottom: "0px" }}
                    />
                  </ConfigProvider>
                )}
              </>
            )}
          </Container>
        </div>
        <Footer />
      </div>
    );
  }
}
