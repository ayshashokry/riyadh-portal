import React, { Component } from "react";
import { Form, Col, Select, Input, Row, Radio, Button, Tooltip } from "antd";
import { CloudUploadOutlined } from "@material-ui/icons";
import moment from "moment-hijri";
import Loader from "../../../containers/Loader";
import axios from "axios";
import DatePicker from "react-multi-date-picker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";

export default class PersonForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      gender: this.props.gender,
      IdTypeObject: this.props.IdTypeObject,
      IdType: this.props.IdTypeObject.name,
      IdNumber: this.props.IdNumber,
      IdSide: this.props.IdSide,
      nationalityObject: this.props.nationalityObject,
      selectedNationality: this.props.nationalityObject.local_name,
      phoneNumber: this.props.phoneNumber,
      mobileNumber: this.props.mobileNumber,
      birthDate: this.props.birthDate,
      email: this.props.email,
      address: this.props.address,
      IdImage: this.props.IdImage,
      loading: false,
      IdTypes: [],
      nationalities: [],
      idError: "",
      errorMsg: "",
      imageError: "",
      imageConfirm: "",
      saudiIdError: false,
    };
    this.formRef = React.createRef();
  }
  componentDidMount() {
    let natio = [];
    this.props.getOwnerData(this.state);
    if (this.props.IdImage !== undefined) {
      this.setState({ IdImage: this.props.IdImage });
    }
    axios.get(`${window.ApiUrl}/api/NatinalIdTypes`).then((res) => {
      this.setState({
        IdTypes: res.data.results,
        loading: false,
      });
    });
    if (Object.keys(this.state.IdTypeObject).length > 0) {
      axios
        .get(
          `${window.ApiUrl}/api/Nationalities/?filter_key=nationalty_type_id&operand=%3D&q=${this.state.IdTypeObject.id}`
        )
        .then((res) => {
          if (this.state.IdTypeObject.id === 1988) {
            natio = res.data.results.sort(function (a, b) {
              return parseInt(b.id) - parseInt(a.id);
            });
          }
          if (this.state.IdTypeObject.id === 1990) {
            natio = res.data.results.sort(function (a, b) {
              return parseInt(a.sort_id) - parseInt(b.sort_id);
            });
          }
          this.setState({ loading: false, nationalities: natio });
        });
    }
  }

  handleUserInput = (e) => {
    if (e.target.value.length > 12 && e.target.name === "phoneNumber") {
      e.target.value = e.target.value.slice(0, 12);
      this.setState({ phoneNumber: e.target.value.slice(0, 12) });
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
        this.setState({ saudiIdError: false, IdNumber: e.target.value });
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
    console.log(e.id);
    let natio = [];
    axios
      .get(
        `${window.ApiUrl}/api/Nationalities/?filter_key=nationalty_type_id&operand=%3D&q=${e.id}`
      )
      .then((res) => {
        if (e.id === 1988) {
          natio = res.data.results.sort(function (a, b) {
            return parseInt(a.id) - parseInt(b.id);
          });
        }
        if (e.id === 1990) {
          natio = res.data.results.sort(function (a, b) {
            return parseInt(a.sort_id) - parseInt(b.sort_id);
          });
        }
        this.setState({
          loading: false,
          nationalities: natio,
        });
        if (e.id === 1890) {
          this.formRef.current.setFieldsValue({
            selectedNationality: "سعودي",
            nationalityObject: res.data.results[0],
          });
        }
      });
    this.formRef.current.setFieldsValue({
      IdNumber: "",
      selectedNationality: null,
    });
    if (e !== undefined) {
      this.setState({
        IdType: value,
        idError: "",
        loading: true,
        IdTypeObject: this.state.IdTypes.filter((type) => type.id === e.id)[0],
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
          (res) =>
            this.setState({
              loading: false,
              IdImage: res.data[0].data,
              imageConfirm: "تم تحميل صورة الهوية بنجاح",
              imageError: "",
            }),
          (e.target.value = null)
        )
        .catch((error) => {
          this.setState({ loading: false, IdImage: null });
          if (error.response.status === 500) {
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
      console.log(e.id);
      console.log(value);
      this.setState({
        selectedNationality: value,
        nationalityObject: this.state.nationalities.filter(
          (type) => type.id === e.id
        )[0],
      });
    }
  };

  nextStep = (e) => {
    if (
      this.state.name !== "" &&
      this.state.IdType !== null &&
      this.state.IdNumber !== "" &&
      this.state.IdSide !== "" &&
      this.state.selectedNationality !== null &&
      this.state.IdImage !== null &&
      this.state.mobileNumber !== "" &&
      this.state.birthDate !== null &&
      this.state.email !== "" &&
      this.state.address !== ""
    ) {
      this.props.next();
      this.props.getOwnerData(this.state);
      this.setState({
        imageError: "",
      });
    }

    if (this.state.IdImage === null) {
      this.setState({
        imageError: "من فضلك قم بإرفاق صورة الهوية",
      });
    }
  };

  render() {
    let today = new Date();
    let yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    return (
      <Form
        onFinish={this.nextStep}
        ref={this.formRef}
        className="mt-4 px-md-5 regForms"
        layout="vertical"
        name="validate_other"
        initialValues={{
          name: this.props.name,
          gender: this.props.gender,
          IdTypeObject: this.props.IdTypeObject,
          IdType: this.props.IdTypeObject.name,
          IdNumber: this.props.IdNumber,
          IdSide: this.props.IdSide,
          nationalityObject: this.props.nationalityObject,
          selectedNationality: this.props.nationalityObject.local_name,
          phoneNumber: this.props.phoneNumber,
          mobileNumber: this.props.mobileNumber,
          birthDate: this.props.birthDate,
          email: this.props.email,
          address: this.props.address,
        }}
      >
        {" "}
        {this.state.loading ? <Loader /> : null}{" "}
        <Row>
          <Col
            md={{ span: 12 }}
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
            md={{ span: 8 }}
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
            md={{ span: 8 }}
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
            ) : null}{" "}
            {/* {this.state.saudiIdError !== "" ? (
              <p className="errMsg">{this.state.saudiIdError}</p>
            ) : null} */}
          </Col>
          <Col
            md={{ span: 8 }}
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
            md={{ span: 8 }}
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
                name="selectedNationality"
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
                              this.state.IdType === null ? null : inq.local_name
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
                              this.state.IdType === null ? null : inq.local_name
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
            md={{ span: 8 }}
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
            md={{ span: 8 }}
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
          </Col>{" "}
          <Col
            md={{ span: 8 }}
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
                defaultValue={this.props.email}
                type="email"
                name="email"
                onChange={this.handleUserInput}
                value={this.state.email}
                placeholder=" ادخل البريد الإلكتروني"
              />
            </Form.Item>
          </Col>{" "}
          <Col
            md={{ span: 8 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
            className="px-2"
          >
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
          </Col>{" "}
          <Col
            md={{ span: 8 }}
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
                  required: true,
                },
              ]}
            >
              <DatePicker
                editable={false}
                placeholder="&#xF073;     أختر تاريخ الميلاد  "
                value={this.state.birthDate}
                maxDate={yesterday}
                onChange={(value) =>
                  this.setState({
                    birthDate: moment(new Date(value)).format("iDD/iMM/iYYYY"),
                  })
                }
                locale="ar"
                calendar="arabic"
              />
            </Form.Item>
          </Col>
          <Col span={16}>
            <Form.Item name="IdImage" label="صورة الهوية">
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
                <p className="uploadIdSucc pt-2" style={{ color: "#ff4d4f" }}>
                  {this.state.imageError}
                </p>
              ) : null}{" "}
              {this.state.imageConfirm !== "" ? (
                <p className="uploadIdSucc pt-2" style={{ color: "#364464" }}>
                  {this.state.imageConfirm}
                </p>
              ) : null}
            </Form.Item>
          </Col>{" "}
          <Col
            xs={{ span: 6 }}
            sm={{ span: 6 }}
            lg={{ span: 3 }}
            md={{ span: 6 }}
            className="mx-lg-5 m-auto"
          >
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
    );
  }
}
