import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Row, Col, Form, Input, Radio, Button } from "antd";
import AddOwner from "./AddOwner";
import OwnersTable from "./OwnersTable";
import axios from "axios";
import Loader from "../../../containers/Loader";
import { faArrowLeft, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default class PrivateSector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      address: this.props.address,
      fax: this.props.fax,
      email: this.props.email,
      website: this.props.website,
      phoneNumber: this.props.phoneNumber,
      mobileNumber: this.props.mobileNumber,
      IdNumber: "",
      type: this.props.type,
      status: this.props.status,
      commercialRecordNumber: this.props.commercialRecordNumber,
      emailError: "",
      addedOwners: this.props.addedOwners,
      showCancelModal: null,
      showEditModal: null,
      ownersError: "",
      searchError: "",
      loading: false,
    };
  }

  openAddOwnerModal = (e) => {
    this.setState({ showAddOwner: !this.state.showAddOwner });
  };

  handleUserInput = (e) => {
    this.setState({ searchError: "" });
    if (e.target.name === "IdNumber") {
      this.setState({ loading: true });

      axios
        .get(`${window.ApiUrl}/owners/search?owner_type=1&q=${e.target.value}`)
        .then((res) => {
          if (res.data) {
            this.setState({
              searchError: "",
              loading: false,
              addedOwners: res.data,
            });
          }
        })
        .catch((error) => {
          if (error && error.response.data.Message === "Owners not found") {
            this.setState({ searchError: "لا توجد نتائج", loading: false });
          } else {
            this.setState({ loading: false });
          }
        });
    }
    if (e.target.value.length > 12 && e.target.name === "phoneNumber") {
      e.target.value = e.target.value.slice(0, 12);
      this.setState({ phoneNumber: e.target.value.slice(0, 12) });
    }
    if (e.target.value.length > 9 && e.target.name === "mobileNumber") {
      e.target.value = e.target.value.slice(0, 9);
      this.setState({ mobileNumber: e.target.value.slice(0, 9) });
    }

    if (
      e.target.name === "email" &&
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        e.target.value
      )
    ) {
      this.setState({ emailError: "" });
    }
    if (
      e.target.name === "email" &&
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        e.target.value
      ) === false
    ) {
      this.setState({ emailError: "البريد الإلكتروني غير صحيح" });
    }

    if (e.target.name === "email" && e.target.value === "") {
      this.setState({ emailError: "من فضلك أدخل البريد الإلكتروني" });
    }

    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value, errorMsg: "" });
  };
  keyPressMobile = (e) => {
    return /[\d]/.test(String.fromCharCode(e.target.value.keyCode));
  };
  nextStep = (e) => {
    if (
      (this.state.type === 1 &&
        this.state.name !== "" &&
        this.state.commercialRecordNumber !== "" &&
        this.state.mobileNumber !== "" &&
        this.state.email !== "" &&
        this.state.address !== "" &&
        this.state.emailError.length === 0) ||
      (this.state.type === 2 &&
        this.state.addedOwners.length > 0 &&
        this.state.name !== "" &&
        this.state.commercialRecordNumber !== "" &&
        this.state.mobileNumber !== "" &&
        this.state.email !== "" &&
        this.state.address !== "" &&
        this.state.emailError.length === 0)
    ) {
      this.props.next();
      this.props.getOwnerData(this.state);
      this.setState({
        emailError: "",
        ownersError: "",
      });
    }
    if (this.state.email === "") {
      this.setState({
        emailError: "من فضلك أدخل البريد الإلكتروني",
      });
    }
    if (this.state.addedOwners.length === 0) {
      this.setState({
        ownersError: "من فضلك أدخل الملاك",
      });
    }
  };
  getAddOwners = (owners) => {
    this.setState({ addedOwners: owners });
  };

  cancelOwner = (ssn) => {
    let owners = this.state.addedOwners.filter((x) => {
      return x.ssn !== ssn;
    });
    this.setState({ addedOwners: owners, showCancelModal: null });
    this.props.getAddOwners(owners);
  };
  openCancelModal = (id) => {
    this.setState({ showCancelModal: id });
  };
  closeCancelModal = () => {
    this.setState({ showCancelModal: null });
  };
  openEditModal = (id) => {
    this.setState({ showEditModal: id });
  };
  closeEditModal = () => {
    this.setState({ showEditModal: null });
  };
  render() {
    console.log(this.state.addedOwners);
    return (
      <Container>
        {this.state.loading ? <Loader /> : null}
        <Form
          onFinish={this.nextStep}
          className="mt-4 px-md-5 regForms"
          layout="vertical"
          name="validate_other"
          initialValues={{
            name: this.props.name,
            address: this.props.address,
            fax: this.props.fax,
            email: this.props.email,
            website: this.props.website,
            phoneNumber: this.props.phoneNumber,
            mobileNumber: this.props.mobileNumber,
            IdNumber: "",
            type: this.props.type,
            status: this.props.status,
            commercialRecordNumber: this.props.commercialRecordNumber,
          }}
        >
          <Row>
            <Col
              md={{ span: 12 }}
              sm={{ span: 24 }}
              xs={{ span: 24 }}
              className="px-md-2"
            >
              <Form.Item
                rules={[
                  {
                    message: "من فضلك ادخل اسم الجهة",
                    required: true,
                  },
                ]}
                name="name"
                hasFeedback
                label="اسم الجهة"
              >
                <Input
                  name="name"
                  onChange={this.handleUserInput}
                  value={this.state.name}
                  placeholder="اسم الجهة"
                />
              </Form.Item>
            </Col>
            <Col
              md={{ span: 12 }}
              sm={{ span: 24 }}
              xs={{ span: 24 }}
              className="px-md-2"
            >
              <Form.Item
                name="type"
                // hasFeedback
                label="نوع الجهة"
                style={{ textAlign: "right" }}
              >
                <Radio.Group
                  name="type"
                  onChange={this.handleUserInput}
                  value={this.state.type}
                >
                  <Radio value={1}>شركة</Radio>
                  <Radio value={2}>مؤسسة</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col
              md={{ span: 12 }}
              sm={{ span: 24 }}
              xs={{ span: 24 }}
              className="px-md-2"
            >
              <Form.Item
                rules={[
                  {
                    message: "من فضلك ادخل رقم السجل التجارى",
                    required: true,
                  },
                ]}
                name="commercialRecordNumber"
                hasFeedback
                label="رقم السجل التجارى"
              >
                <Input
                  name="commercialRecordNumber"
                  type="number"
                  onKeyPress={this.keyPressMobile}
                  onChange={this.handleUserInput}
                  value={this.state.commercialRecordNumber}
                  placeholder="رقم السجل التجارى"
                />
              </Form.Item>
            </Col>{" "}
            <Col
              md={{ span: 12 }}
              sm={{ span: 24 }}
              xs={{ span: 24 }}
              className="px-md-2"
            >
              <Form.Item
                name="email"
                hasFeedback={this.state.emailError !== "" ? true : false}
                label="البريد الإلكتروني"
              >
                <Input
                  name="email"
                  className={this.state.emailError !== "" ? "emailErr" : ""}
                  onChange={this.handleUserInput}
                  value={this.state.email}
                  placeholder="البريد الإلكتروني"
                />{" "}
                {this.state.emailError !== "" ? (
                  <div className="ant-form-item-explain ant-form-item-explain-error">
                    <div role="alert"> {this.state.emailError}</div>
                  </div>
                ) : null}
              </Form.Item>
            </Col>
            <Col span={24} className="px-md-2">
              <Form.Item
                rules={[
                  {
                    message: "من فضلك ادخل العنوان",
                    required: true,
                  },
                ]}
                name="address"
                hasFeedback
                label="العنوان"
              >
                <Input
                  name="address"
                  onChange={this.handleUserInput}
                  value={this.state.address}
                  placeholder="العنوان"
                />
              </Form.Item>
            </Col>
            <Col
              md={{ span: 12 }}
              sm={{ span: 24 }}
              xs={{ span: 24 }}
              className="px-md-2"
            >
              <Form.Item name="fax" label="الفاكس">
                <Input
                  name="fax"
                  onChange={this.handleUserInput}
                  value={this.state.fax}
                  placeholder="الفاكس"
                />
              </Form.Item>
            </Col>{" "}
            <Col span={12} className="px-md-2">
              <Form.Item
                name="status"
                // hasFeedback
                label="حالة الجهة"
                style={{ textAlign: "right" }}
              >
                <Radio.Group
                  name="status"
                  onChange={this.handleUserInput}
                  value={this.state.status}
                >
                  <Radio value={1}>مفعلة</Radio>
                  <Radio value={2}> مجمدة</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={24} className="px-md-2">
              <Form.Item
                name="website"
                label="الموقع الإلكتروني"
                rules={[
                  {
                    pattern: new RegExp(
                      /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
                    ),
                    message: "من فضلك أدخل موقع إلكتروني صحيح",
                  },
                ]}
              >
                <Input
                  name="website"
                  onChange={this.handleUserInput}
                  value={this.state.website}
                  placeholder="الموقع الإلكتروني"
                />
              </Form.Item>
            </Col>{" "}
            <Col
              md={{ span: 12 }}
              sm={{ span: 24 }}
              xs={{ span: 24 }}
              className="px-md-2 phoneNum"
            >
              <Form.Item
                name="phoneNumber"
                hasFeedback
                label="رقم الهاتف"
                rules={[
                  {
                    message: "من فضلك أدخل رقم الهاتف",
                    required: true,
                  },
                  {
                    max: 9,
                    message: "رقم الهاتف لا يزيد عن 9 أرقام",
                  },
                  {
                    min: 9,
                    message: "رقم الهاتف لا يقل عن 9 أرقام",
                  },
                ]}
              >
                <Input
                  addonAfter="966"
                  name="phoneNumber"
                  type="number"
                  onChange={this.handleUserInput}
                  value={this.state.phoneNumber}
                  placeholder="رقم الهاتف"
                />
              </Form.Item>
            </Col>{" "}
            <Col
              md={{ span: 12 }}
              sm={{ span: 24 }}
              xs={{ span: 24 }}
              className="px-md-2 phoneNum"
            >
              <Form.Item
                rules={[
                  {
                    message: "من فضلك أدخل رقم الجوال",
                    required: true,
                    max: "9999",
                  },
                  {
                    max: 9,
                    message: "رقم الجوال لا يزيد عن 9 أرقام",
                  },
                  {
                    min: 9,
                    message: "رقم الجوال لا يقل عن 9 أرقام",
                  },
                  {
                    pattern: new RegExp(/^5/),
                    message: "يجب أن يبدأ رقم الجوال بالرقم 5",
                  },
                ]}
                name="mobileNumber"
                hasFeedback
                label="رقم الجوال"
              >
                <Input
                  name="mobileNumber"
                  addonAfter="966"
                  type="number"
                  onChange={this.handleUserInput}
                  value={this.state.mobileNumber}
                  placeholder="رقم الجوال"
                />
              </Form.Item>
            </Col>
          </Row>
          {this.state.type === 2 ? (
            <>
              <hr style={{ color: "#d4d6de" }} />
              <Row>
                <Col
                  sm={{ span: 24 }}
                  xs={{ span: 24 }}
                  md={{ span: 12 }}
                  className="px-5"
                >
                  <h3 style={{ textAlign: "right" }}>المـــــــــــلاك</h3>
                </Col>{" "}
                <Col
                  sm={{ span: 24 }}
                  xs={{ span: 24 }}
                  md={{ span: 12 }}
                  className="m-auto"
                >
                  <p
                    onClick={this.openAddOwnerModal}
                    className="openOwnerModal"
                    style={{ textAlign: "left" }}
                  >
                    <FontAwesomeIcon icon={faPlusCircle} className="mx-md-2" />
                    إضافة مالك
                  </p>
                </Col>
              </Row>
              <AddOwner
                addedOwners={this.state.addedOwners}
                getAddOwners={this.getAddOwners}
                show={this.state.showAddOwner}
                onHide={this.openAddOwnerModal}
              />
              <Row>
                <Col
                  md={{ span: 12 }}
                  sm={{ span: 24 }}
                  xs={{ span: 24 }}
                  className="px-md-2"
                >
                  <Form.Item
                    // rules={[
                    //   {
                    //     message: "من فضلك ادخل رقم الهوية",
                    //     required: true,
                    //   },
                    // ]}
                    name="IdNumber"
                    // hasFeedback
                    label="البحث برقم الهوية"
                  >
                    <Input
                      name="IdNumber"
                      onChange={this.handleUserInput}
                      value={this.state.IdNumber}
                      placeholder="ادخل رقم الهوية"
                    />
                    <div className="ant-form-item-explain ant-form-item-explain-error">
                      <div role="alert"> {this.state.searchError}</div>
                    </div>
                  </Form.Item>
                </Col>
              </Row>{" "}
              {this.state.addedOwners.length === 0 ? (
                <div className="ant-form-item-explain ant-form-item-explain-error">
                  <div role="alert"> {this.state.ownersError}</div>
                </div>
              ) : null}
              {this.state.addedOwners.length > 0 ? (
                <OwnersTable
                  biggetAddOwners={this.props.getAddOwners}
                  openEditModal={this.openEditModal}
                  closeEditModal={this.closeEditModal}
                  addedOwners={this.state.addedOwners}
                  openCancelModal={this.openCancelModal}
                  closeCancelModal={this.closeCancelModal}
                  cancelOwner={this.cancelOwner}
                  editOwner={this.editOwner}
                  getAddOwners={this.getAddOwners}
                  showCancelModal={this.state.showCancelModal}
                  showEditModal={this.state.showEditModal}
                />
              ) : null}
            </>
          ) : null}
          <div className="steps-action my-3">
            <Button
              type="primary"
              htmlType="submit"
              // onClick={this.nextStep}
              className="nextBtn ml-3"
            >
              الخطوة التالية
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            </Button>
          </div>
        </Form>
      </Container>
    );
  }
}
