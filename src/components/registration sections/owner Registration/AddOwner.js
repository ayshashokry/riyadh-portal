import React, { Component } from "react";
import { Modal, Container } from "react-bootstrap";
import { Form, Row, Col, Input, Radio, Select, Button, Tooltip } from "antd";
import { CloudUploadOutlined } from "@material-ui/icons";
import Loader from "../../../containers/Loader";
import axios from "axios";
import DatePicker from "react-multi-date-picker";
import moment from "moment-hijri";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPlusCircle,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

export default class AddOwner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      gender: 1,
      IdTypeObject: {},
      IdType: null,
      IdNumber: "",
      IdSide: "",
      nationalityObject: {},
      selectedNationality: null,
      phoneNumber: "",
      mobileNumber: "",
      birthDate: null,
      email: "",
      address: "",
      IdImage: null,
      loading: false,
      IdTypes: [],
      nationalities: [],
      idError: "",
      errorMsg: "",
      imageError: "",
      imageConfirm: "",
      dateRequired: true,
    };
    this.formRef = React.createRef();
  }
  componentDidMount() {
    axios.get(`${window.ApiUrl}/api/NatinalIdTypes`).then((res) => {
      this.setState({
        IdTypes: res.data.results,
        loading: false,
      });
    });
  }
  handleUserInput = (e) => {
    if (e.target.value.length > 12 && e.target.name === "phoneNumber") {
      e.target.value = e.target.value.slice(0, 12);
      this.setState({
        phoneNumber: e.target.value.slice(0, 12),
      });
    }

    if (this.state.IdType !== null && e.target.name === "IdNumber") {
      axios
        .get(
          `${window.ApiUrl}/owners/ownerExists?q=${e.target.value}&owner_type=${this.state.IdTypeObject.id}`
        )
        .then((res) => {
          if (res) {
            this.setState({
              loading: false,
              // idError: "رقم الهوية مسجل من قبل",
            });
          } else {
            this.setState({
              loading: false,
              idError: "",
            });
          }
        })
        .catch((error) => {
          if (error.response.status === 409) {
            this.setState({
              loading: false,
              idError: "رقم الهوية مسجل من قبل",
            });
          }
        });
    }
    if (
      (this.state.IdType === null || this.state.IdType === undefined) &&
      e.target.name === "IdNumber"
    ) {
      e.target.value = e.target.value.slice(0, 0);
      this.setState({
        idError: "من فضلك أدخل نوع الهوية أولا",
        IdNumber: e.target.value.slice(0, 0),
      });
    }
    if (
      (this.state.IdType !== null || this.state.IdType !== undefined) &&
      e.target.name === "IdNumber"
    ) {
      e.target.value = e.target.value.trim();

      var sum = 0;
      for (var i = 0; i < 10; i++) {
        if (i % 2 === 0) {
          var ZFOdd = String(
            "00" + String(Number(e.target.value.substr(i, 1)) * 2)
          ).slice(-2);
          sum += Number(ZFOdd.substr(0, 1)) + Number(ZFOdd.substr(1, 1));
        } else {
          sum += Number(e.target.value.substr(i, 1));
        }
      }
      // return sum % 10 !== 0 ? -1 : type;
      if (sum % 10 !== 0 && this.state.IdTypeObject.id === 1890) {
        this.setState({ saudiIdError: true });
      } else {
        this.setState({
          saudiIdError: false,
          IdNumber: e.target.value,
        });
      }
    }
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value, errorMsg: "" });
  };

  keyPressMobile = (e) => {
    return /[\d]/.test(String.fromCharCode(e.target.value.keyCode));
  };

  handleDateChangeRaw = (e) => {
    e.preventDefault();
  };
  handleChangeIdType = (value, e) => {
    this.formRef.current.setFieldsValue({
      IdNumber: "",
      selectedNationality: null,
    });
    // this.setState({ IdType: null, IdNumber: "" });
    if (e !== undefined) {
      this.setState({
        IdType: value,
        idError: "",
        loading: true,
        // IdNumber: "",
      });
      this.setState({
        IdTypeObject: this.state.IdTypes.filter((type) => type.id === e.id)[0],
      });
      axios
        .get(
          `${window.ApiUrl}/api/Nationalities/?filter_key=nationalty_type_id&operand=%3D&q=${e.id}`
        )
        .then((res) => {
          if (e.id === 1890) {
            this.formRef.current.setFieldsValue({
              selectedNationality: "سعودي",
              nationalityObject: res.data.results[0],
            });
          }
          this.setState({
            loading: false,
            nationalities: res.data.results,
            selectedNationality: "سعودي",
            nationalityObject: res.data.results[0],
          });
        });
    }
  };

  setFile = async (e) => {
    if (e.target.files.length !== 0) {
      this.setState({ loading: true, imageError: "" });
      const formData = new FormData();
      if (e.target.files) {
        formData.append(`file1`, e.target.files[0]);
      }

      await axios
        .post(window.ApiUrl + "/uploadMultifiles", formData)
        .then(
          (res) => (
            this.setState(
              {
                loading: false,
                IdImage: res.data[0].data,
                imageConfirm: "تم تحميل صورة الهوية بنجاح",
                imageError: "",
              },
              () => (e.target.value = null)
            ),
            this.formRef.current.setFieldsValue({
              IdImage: res.data[0].data,
            })
          )
        )
        .catch((error) => {
          this.setState({ loading: false, IdImage: null });
          if (
            error !== undefined &&
            error.response !== undefined &&
            error.response.status === 500
          ) {
            this.setState({
              imageError: "حدث خطأ اثناء التحميل, حاول مرة أخري",
              IdImage: null,
              imageConfirm: "",
            });
          }
        });
    }
  };
  handleChangeNationality = (value, e) => {
    if (e !== undefined) {
      this.setState({
        selectedNationality: value,
        nationalityObject: this.state.nationalities.filter(
          (type) => type.id === e.id
        )[0],
      });
    }
  };

  addOwner = (e) => {
    console.log(e);
    let addedOwners = [];

    addedOwners.push({
      address: this.state.address,
      date_of_birth: this.state.birthDate,
      email: this.state.email,
      image: this.state.IdImage,
      mobile: this.state.mobileNumber,
      "mobile-part": this.state.mobileNumber,
      name: this.state.name,
      nationalid_issuer_name: this.state.IdSide,
      nationalidtype_id: this.state.IdTypeObject.id,
      nationalidtypes: this.state.IdTypeObject,
      nationalities: this.state.nationalityObject,
      nationality_id: this.state.nationalityObject.id,
      phone: this.state.phoneNumber,
      ssn: this.state.IdNumber,
      subtype: this.state.gender,
    });
    this.props.getAddOwners(addedOwners);
    this.setState({
      name: "",
      gender: 1,
      IdTypeObject: {},
      IdType: null,
      IdNumber: "",
      IdSide: "",
      nationalityObject: {},
      selectedNationality: null,
      phoneNumber: "",
      mobileNumber: "",
      birthDate: null,
      email: "",
      address: "",
      dateRequired: false,
      IdImage: null,
      loading: false,
      idError: "",
      errorMsg: "",
      imageError: "",
      imageConfirm: "",
    });
    this.props.onHide();
  };
  onSelectDate = (value) => {
    this.setState({
      dateRequired: false,
      birthDate: moment(new Date(value)).format("iYYYY/iMM/iDD"),
    });
    this.formRef.current.setFieldsValue({
      birthDate: moment(new Date(value)).format("iYYYY/iMM/iDD"),
    });
  };
  onhideModal = (e) => {
    this.setState({
      name: "",
      gender: 1,
      IdTypeObject: {},
      IdType: null,
      IdNumber: "",
      IdSide: "",
      nationalityObject: {},
      selectedNationality: null,
      phoneNumber: "",
      mobileNumber: "",
      birthDate: null,
      email: "",
      address: "",
      dateRequired: false,
      IdImage: null,
      loading: false,
      idError: "",
      errorMsg: "",
      imageError: "",
      imageConfirm: "",
    });
    this.props.onHide();
  };
  render() {
    console.log(this.state.IdImage);
    let today = new Date();
    let yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    return (
      <Modal
        keyboard={false}
        onHide={this.onhideModal}
        show={this.props.show}
        backdrop="static"
        className="AddOwnerModal"
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Container fluid>
          <div>
            <h5 className="px-5 pt-4">
              <span>
                <FontAwesomeIcon
                  icon={faTimes}
                  className=" fa-1x"
                  onClick={this.onhideModal}
                  style={{
                    textAlign: "left",
                    float: "left",
                    cursor: "pointer",
                  }}
                />
              </span>{" "}
              تفاصيل المالك
            </h5>
          </div>
          <Form
            onFinish={this.addOwner}
            ref={this.formRef}
            className="my-4 px-md-5 regForms"
            layout="vertical"
            name="validate_other"
            initialValues={{
              name: this.state.name,
              gender: this.state.gender,
              IdTypeObject: this.state.IdTypeObject,
              IdType: this.state.IdType,
              IdNumber: this.state.IdNumber,
              IdSide: this.state.IdSide,
              nationalityObject: this.state.nationalityObject,
              selectedNationality: this.state.selectedNationality,
              phoneNumber: this.state.phoneNumber,
              mobileNumber: this.state.mobileNumber,
              birthDate: this.state.birthDate,
              email: this.state.email,
              address: this.state.address,
              IdImage: this.state.IdImage,
            }}
          >
            {" "}
            {this.state.loading ? <Loader /> : null}{" "}
            <Row>
              <Col
                md={{ span: 24 }}
                sm={{ span: 24 }}
                xs={{ span: 24 }}
                className="px-2"
              >
                <Form.Item
                  rules={[
                    {
                      message: "من فضلك ادخل الإسم",
                      required: true,
                    },
                  ]}
                  name="name"
                  hasFeedback
                  label="الإسم"
                >
                  <Input
                    name="name"
                    onChange={this.handleUserInput}
                    value={this.state.name}
                    placeholder="الإسم"
                  />
                </Form.Item>
              </Col>
              <Col
                md={{ span: 12 }}
                sm={{ span: 24 }}
                xs={{ span: 24 }}
                className="px-2"
              >
                <Form.Item
                  name="gender"
                  label="النوع "
                  style={{ textAlign: "right" }}
                >
                  <Radio.Group
                    // defaultValue={this.state.gender}
                    onChange={this.handleUserInput}
                    name="gender"
                    value={this.state.gender}
                  >
                    <Radio value={1}>ذكر</Radio>
                    <Radio value={2}>أنثي</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col
                md={{ span: 12 }}
                sm={{ span: 24 }}
                xs={{ span: 24 }}
                className="px-2"
              >
                <Form.Item
                  rules={[
                    {
                      message: "من فضلك ادخل نوع الهوية",
                      required: true,
                    },
                  ]}
                  name="IdType"
                  hasFeedback
                  label="نوع الهوية"
                >
                  <Select
                    virtual={false}
                    showSearch
                    allowClear
                    onChange={this.handleChangeIdType}
                    value={this.state.IdTypeObject.name}
                    placeholder="اختر نوع الهوية"
                    onClear={() => this.setState({ IdType: null })}
                    getPopupContainer={(trigger) => trigger.parentNode}
                  >
                    {this.state.IdTypes && this.state.IdTypes.length !== 0
                      ? this.state.IdTypes.map((inq, index) => (
                          <Select.Option
                            className="selectgroup"
                            value={inq.name}
                            key={inq.id}
                            id={inq.id}
                            passport={inq.passport}
                          >
                            {inq.name}
                          </Select.Option>
                        ))
                      : null}
                  </Select>
                </Form.Item>
              </Col>{" "}
              <Col
                md={{ span: 12 }}
                sm={{ span: 24 }}
                xs={{ span: 24 }}
                className="px-2"
              >
                <Form.Item
                  name="IdNumber"
                  hasFeedback
                  label="رقم الهوية"
                  rules={[
                    {
                      message: "من فضلك ادخل رقم الهوية",
                      required: true,
                    },
                    {
                      validator: (_, value) =>
                        !this.state.saudiIdError
                          ? Promise.resolve()
                          : Promise.reject(new Error("رقم الهوية غير صحيح")),
                    },

                    // {
                    //   required: this.state.saudiIdError,
                    //   message: "رقم الهوية غير صحيح"
                    // },
                    {
                      min:
                        this.state.IdTypeObject.id === 1890
                          ? 10
                          : this.state.IdTypeObject.id === 1990
                          ? 10
                          : 8,
                      message:
                        this.state.IdTypeObject.id === 1890
                          ? "رقم الهوية لا يقل عن 10 أرقام"
                          : this.state.IdTypeObject.id === 1990
                          ? "رقم الهوية لا يقل عن 10 أرقام"
                          : "رقم الهوية لا يقل عن 8 أرقام",
                    },
                    {
                      max:
                        this.state.IdTypeObject.id === 1890
                          ? 10
                          : this.state.IdTypeObject.id === 1990
                          ? 10
                          : 14,
                      message:
                        this.state.IdTypeObject.id === 1890
                          ? "رقم الهوية لا يزيد عن 10 أرقام"
                          : this.state.IdTypeObject.id === 1990
                          ? "رقم الهوية لا يزيد عن 10 أرقام"
                          : "رقم الهوية لا يزيد عن 14 رقم",
                    },
                    {
                      pattern:
                        this.state.IdTypeObject.id === 1890
                          ? new RegExp(/^1/)
                          : this.state.IdTypeObject.id === 1990
                          ? new RegExp(/^2/)
                          : null,
                      message:
                        this.state.IdTypeObject.id === 1890
                          ? "يجب أن يبدأ رقم الهوية بالرقم 1"
                          : this.state.IdTypeObject.id === 1990
                          ? "يجب أن يبدأ رقم الهوية بالرقم 2"
                          : null,
                    },
                  ]}
                >
                  <Input
                    // disabled={this.state.IdType === null ? true : false}
                    type="number"
                    onChange={this.handleUserInput}
                    onInput={this.handleUserInput}
                    onKeyPress={this.keyPressMobile}
                    name="IdNumber"
                    value={this.state.IdNumber}
                    placeholder="ادخل رقم الهوية"
                  />
                </Form.Item>
                {this.state.idError !== "" ? (
                  <p className="errMsg">{this.state.idError}</p>
                ) : null}
              </Col>
              <Col
                md={{ span: 12 }}
                sm={{ span: 24 }}
                xs={{ span: 24 }}
                className="px-2"
              >
                <Form.Item
                  rules={[
                    {
                      message: "من فضلك ادخل جهة إصدار الهوية",
                      required: true,
                    },
                  ]}
                  name="IdSide"
                  hasFeedback
                  label="جهة إصدار الهوية"
                >
                  <Input
                    name="IdSide"
                    onChange={this.handleUserInput}
                    value={this.state.IdSide}
                    placeholder="جهة إصدار الهوية"
                  />
                </Form.Item>
              </Col>
              <Col
                md={{ span: 12 }}
                sm={{ span: 24 }}
                xs={{ span: 24 }}
                className="px-2"
              >
                <Form.Item
                  rules={[
                    {
                      message: "من فضلك ادخل الجنسية",
                      required: true,
                    },
                  ]}
                  name="selectedNationality"
                  hasFeedback
                  label="الجنسية"
                >
                  <Select
                    virtual={false}
                    showSearch
                    allowClear
                    value={this.state.nationalityObject.local_name}
                    className="dont-show"
                    onChange={this.handleChangeNationality}
                    placeholder="اختر الجنسية"
                    getPopupContainer={(trigger) => trigger.parentNode}
                    disabled={
                      this.state.IdType === null ||
                      this.state.IdTypeObject.id === 1890
                        ? true
                        : false
                    }
                  >
                    {this.state.nationalities &&
                    this.state.nationalities.length !== 0
                      ? this.state.IdTypeObject !== undefined &&
                        this.state.IdTypeObject.id === 1990
                        ? this.state.nationalities
                            .sort(function (a, b) {
                              return parseInt(a.sort_id) - parseInt(b.sort_id);
                            })
                            .map((inq, index) => (
                              <Select.Option
                                title={
                                  this.state.IdType === null
                                    ? null
                                    : inq.local_name
                                }
                                className="selectgroup"
                                value={inq.local_name}
                                key={inq.id}
                                id={inq.id}
                                passport={inq.nationalidtypes.passport}
                              >
                                {inq.local_name}
                              </Select.Option>
                            ))
                        : this.state.nationalities
                            .sort(function (a, b) {
                              return parseInt(a.id) - parseInt(b.id);
                            })
                            .map((inq, index) => (
                              <Select.Option
                                title={
                                  this.state.IdType === null
                                    ? null
                                    : inq.local_name
                                }
                                className="selectgroup"
                                value={inq.local_name}
                                key={inq.id}
                                id={inq.id}
                                passport={inq.nationalidtypes.passport}
                              >
                                {inq.local_name}
                              </Select.Option>
                            ))
                      : null}
                  </Select>
                </Form.Item>
              </Col>
              <Col
                md={{ span: 12 }}
                sm={{ span: 24 }}
                xs={{ span: 24 }}
                className="px-2 phoneNum"
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
                    type="number"
                    onChange={this.handleUserInput}
                    name="phoneNumber"
                    value={this.state.phoneNumber}
                    placeholder="ادخل رقم الهاتف"
                  />
                </Form.Item>
              </Col>
              <Col
                md={{ span: 12 }}
                sm={{ span: 24 }}
                xs={{ span: 24 }}
                className="px-2 phoneNum"
              >
                <Form.Item
                  name="mobileNumber"
                  hasFeedback
                  label="رقم الجوال"
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
                >
                  <Input
                    addonAfter="966"
                    type="number"
                    onChange={this.handleUserInput}
                    name="mobileNumber"
                    value={this.state.mobileNumber}
                    placeholder="ادخل رقم الجوال"
                  />
                </Form.Item>
              </Col>
              <Col
                md={{ span: 12 }}
                sm={{ span: 24 }}
                xs={{ span: 24 }}
                className="px-2"
              >
                <Form.Item
                  name="birthDate"
                  hasFeedback
                  label="تاريخ الميلاد"
                  rules={[
                    {
                      message: "من فضلك أدخل تاريخ الميلاد",
                      required: this.state.birthDate === null ? true : false,
                    },
                  ]}
                >
                  {" "}
                  <DatePicker
                    editable={false}
                    maxDate={yesterday}
                    // required
                    placeholder="&#xF073;     أختر تاريخ الميلاد"
                    value={this.state.birthDate}
                    onChange={this.onSelectDate}
                    locale="ar"
                    calendar="arabic"
                  />
                </Form.Item>
              </Col>{" "}
              <Col
                md={{ span: 24 }}
                sm={{ span: 24 }}
                xs={{ span: 24 }}
                className="px-2"
              >
                <Form.Item
                  name="email"
                  label="البريد الإلكتروني"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "من فضلك ادخل البريد الإلكتروني",
                    },
                    {
                      pattern: new RegExp(
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                      ),
                      message: "البريد الإلكتروني غير صحيح",
                    },
                  ]}
                >
                  <Input
                    type="email"
                    name="email"
                    onChange={this.handleUserInput}
                    value={this.state.email}
                    placeholder=" ادخل البريد الإلكتروني"
                  />
                </Form.Item>
              </Col>{" "}
              <Col span={24} className="px-2">
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
              <Col span={14}>
                <Form.Item
                  name="IdImage"
                  label="صورة الهوية"
                  rules={[
                    {
                      message: "من فضلك قم بإرفاق صورة الهوية",
                      required: this.state.IdImage === null ? true : false,
                    },
                  ]}
                >
                  <Button block className="ant-uploaded">
                    تحميل <CloudUploadOutlined />
                    <input
                      className="custom-file-input"
                      onChange={this.setFile}
                      type="file"
                      // style={{ display: 'none' }}
                    />
                  </Button>
                  {this.state.imageError !== "" ? (
                    <p
                      className="uploadIdSucc pt-2"
                      style={{ color: "#ff4d4f" }}
                    >
                      {this.state.imageError}
                    </p>
                  ) : null}{" "}
                  {this.state.imageConfirm !== "" ? (
                    <p
                      className="uploadIdSucc pt-2"
                      style={{ color: "#364464" }}
                    >
                      {this.state.imageConfirm}
                    </p>
                  ) : null}
                </Form.Item>
              </Col>{" "}
              <Col span={6} className="mr-lg-3 m-auto">
                {this.state.IdImage !== null ? (
                  <div className="idImage">
                    <Tooltip placement="topLeft" title="مشاهدة المرفق">
                      <a
                        rel="noreferrer"
                        target="_blank"
                        download={false}
                        href={`${window.filesURL + "/" + this.state.IdImage}`}
                      >
                        <FontAwesomeIcon icon={faEye} className="fa-2x" />
                      </a>
                    </Tooltip>
                    <Tooltip placement="topRight" title="مسح المرفق">
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="mx-3 fa-2x"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          this.setState({
                            IdImage: null,
                            imageError: "من فضلك قم بإرفاق صورة الهوية",
                            imageConfirm: "",
                          })
                        }
                      />
                    </Tooltip>
                  </div>
                ) : null}
              </Col>
            </Row>
            <Button
              type="primary"
              htmlType="submit"
              // onClick={this.addOwner}
              className="nextBtn"
            >
              <FontAwesomeIcon icon={faPlusCircle} className="mx-3" />
              إضافة مالك
            </Button>
          </Form>
        </Container>
      </Modal>
    );
  }
}
