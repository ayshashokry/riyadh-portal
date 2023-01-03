import React, { Component } from "react";
//Packages
import { Container, Table } from "react-bootstrap";
import { Row, Col, Form, Input, Select, Button } from "antd";
import axios from "axios";
import Loader from "../containers/Loader";
import moment from "moment-hijri";
import NavBarr from "../containers/NavBarr";
import Footer from "../containers/Footer";
import { Link } from "react-router-dom";

export default class TransactionInquriy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactionType: "",
      transactionNumbr: "",
      transactionYear: "",
      allApplications: [],
      loading: false,
      errorMsg: "",
      tableResult: {},
      tableLoading: false,
      tableTransactionNumbr: "",
      tabletransactionYear: "",
      yearsArray: []
    };
  }
  async componentDidMount() {
    let yearsArray = [];
    for (
      let i = 1437;
      i <=
      moment(new Date())
        .format("iYYYY/iMM/iDD")
        .slice(0, 4);
      i++
    ) {
      yearsArray.push(i);
    }
    this.setState({ yearsArray: yearsArray });
    let apps = [];
    this.setState({ loading: true });
    window.scrollTo(0, 0);

    await new Promise((resolve, reject) => {
      axios.get(window.ApiUrl + "/allApplications").then(res => {
        resolve(res.data);
        if (res.data) {
          apps = res.data.results.sort(function(a, b) {
            return parseInt(a.id) - parseInt(b.id);
          });
          this.setState({
            allApplications: apps,
            loading: false
          });
        }
      });
    });
  }

  handleSelectType = (value, e) => {
    if (e !== undefined) {
      this.setState({ transactionType: e.id });
    }
  };
  handleChangeYear = (value, e) => {
    if (e !== undefined) {
      this.setState({ transactionYear: value });
    }
  };
  handleUserInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value, errorMsg: "" });
  };
  Inquiry = async e => {
    this.setState({
      tableTransactionNumbr: this.state.transactionNumbr,
      tabletransactionYear: this.state.transactionYear
    });
    if (
      this.state.transactionNumbr !== "" &&
      this.state.transactionType !== "" &&
      this.state.transactionYear !== ""
    ) {
      this.setState({ tableLoading: true, tableResult: [] });
      await new Promise((resolve, reject) => {
        axios
          .get(
            `${window.ApiUrl}/publicSearch?app_id=${
              this.state.transactionType
            }&request_no=${this.state.transactionNumbr +
              "/" +
              this.state.transactionYear}`
          )
          .then(res => {
            resolve(res.data);
            if (res.data) {
              this.setState({
                tableLoading: false,
                errorMsg: "",
                tableResult: res.data
              });
            }
          })
          .catch(error => {
            this.setState({ loading: false });

            if (error.response !== undefined && error.response.status === 400) {
              this.setState({
                tableLoading: false,
                errorMsg: "برجاء التأكد من رقم المعاملة"
              });
            }
          });
      });
    }
  };
  onSearchPress = e => {
    return /[\d]/.test(String.fromCharCode(e.keyCode));
  };
  render() {
    return this.state.loading ? (
      <Loader />
    ) : (
      <div className="goalsPage">
        <NavBarr />
        <div className="goalsHeader">
          <div className=" pt-5 pb-3 px-5 mr-lg-5">
            <span className="span1">
              <Link to="/"> الرئيسية </Link>
              <Link to="/Services"> .خدماتنا .</Link>{" "}
            </span>
            <span className="span2">الإستعـلام عن المعـاملات </span>
            <h1> الإستعـلام عن المعـاملات</h1>
          </div>
        </div>
        <div className="goals mb-5 pb-5 inquiryForm">
          <Container>
            <Row>
              <Col sm={{ span: 24 }} xs={{ span: 24 }} lg={{ span: 8 }}>
                <Form
                  className="mt-5  inquiryForm"
                  layout="vertical"
                  name="validate_other"
                  //   onFinish={onFinish}
                >
                  <h4>للاستعلام عن معاملة</h4>
                  <p>اختر نوع المعاملة ثم أدخل رقم معاملتك :</p>
                  <Row>
                    <Col span={24}>
                      <Form.Item
                        hasFeedback
                        label="نوع المعاملة"
                        name="transactionType"
                        rules={[
                          {
                            message: "أختر نوع المعاملة",
                            required: true
                          }
                        ]}
                      >
                        <Select
                          virtual={false}
                          showSearch
                          allowClear
                          className="dont-show"
                          onChange={this.handleSelectType}
                          value={this.state.transactionType}
                          placeholder="اختر تطبيق"
                          getPopupContainer={trigger => trigger.parentNode}
                        >
                          {this.state.allApplications &&
                          this.state.allApplications.length !== 0
                            ? this.state.allApplications.map((inq, index) => (
                                <Select.Option
                                  className="selectgroup"
                                  value={inq.translate_ar_caption}
                                  key={inq.id}
                                  id={inq.id}
                                >
                                  {inq.translate_ar_caption}
                                </Select.Option>
                              ))
                            : null}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={11}>
                      <Form.Item
                        name="transactionNumbr"
                        label="رقم المعاملة"
                        hasFeedback
                        rules={[
                          {
                            message: "أدخل رقم المعاملة",
                            required: true
                          },
                          {
                            max: 4,
                            message: "رقم المعاملة لا يزيد عن 4 أرقام"
                          }
                        ]}
                      >
                        <Input
                          type={"number"}
                          name="transactionNumbr"
                          onChange={this.handleUserInput}
                          value={this.state.transactionNumbr}
                          placeholder=" رقم المعاملة"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={1} className="pr-2" style={{ margin: "auto" }}>
                      /
                    </Col>
                    <Col span={11} className="pr-2">
                      <Form.Item
                        name="transactionYear"
                        label="سنة المعاملة"
                        hasFeedback
                        rules={[
                          {
                            message: "أدخل سنة المعاملة",
                            required: true
                          }
                        ]}
                      >
                        <Select
                          type="number"
                          virtual={false}
                          showSearch
                          onSearch={this.onSearchPress}
                          allowClear
                          onChange={this.handleChangeYear}
                          value={this.state.transactionYear}
                          placeholder="اختر السنة "
                          getPopupContainer={trigger => trigger.parentNode}
                        >
                          {this.state.yearsArray &&
                          this.state.yearsArray.length !== 0
                            ? this.state.yearsArray.map((inq, index) => (
                                <Select.Option
                                  className="selectgroup"
                                  value={inq}
                                  key={inq}
                                >
                                  {inq}
                                </Select.Option>
                              ))
                            : null}
                        </Select>
                      </Form.Item>
                    </Col>
                    {this.state.errorMsg !== "" ? (
                      <h6 className="errMsg">{this.state.errorMsg}</h6>
                    ) : null}
                    <Col span={24}>
                      <Button htmlType="submit" onClick={this.Inquiry}>
                        استعلام
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
              <Col
                sm={{ span: 24 }}
                xs={{ span: 24 }}
                lg={{ span: 12 }}
                className="inquiryTable mt-auto mr-auto"
              >
                {this.state.tableLoading ? (
                  <Loader />
                ) : this.state.tableResult &&
                  Object.keys(this.state.tableResult).length > 0 ? (
                  <Table className="mt-5 ">
                    <tbody>
                      <tr>
                        <th>رقم المعاملة </th>{" "}
                        <td>
                          {this.state.tableTransactionNumbr +
                            "/" +
                            this.state.tabletransactionYear}
                        </td>
                      </tr>
                      <tr>
                        <th>حالة المعاملة</th>
                        <td>
                          {this.state.tableResult.status === 1
                            ? "قيد المراجعة"
                            : this.state.tableResult.status === 2
                            ? "منتهية"
                            : this.state.tableResult.status === 3
                            ? "معتذر عنها"
                            : null}
                        </td>
                      </tr>
                      <tr>
                        <th>تاريخ إنشاء المعاملة </th>
                        <td>{this.state.tableResult.create_date}</td>
                      </tr>
                    </tbody>
                  </Table>
                ) : null}
              </Col>
            </Row>
          </Container>
        </div>
        <Footer />
      </div>
    );
  }
}
