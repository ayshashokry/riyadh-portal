import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Row, Col } from "antd";
import { toArabic } from "arabic-digits";
import AvatarImg from "../../assets/images/avatar.png";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import Loader from "../../containers/Loader";
import SmallNavbar from "../../containers/SmallNavbar";
import SmallFooter from "../../containers/SmallFooter";
import { editProfile } from "../../redux/actions/authActions";
import axios from "axios";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagePath: this.props.user.image,
      commentText: "",
      selectedFile: null,
      requestAttach: [],
      buttonDisable: false,
      uploadStatus: "",
      loading: false,
    };
  }

  setFile = async (e) => {
    if (e.target.files.length !== 0) {
      this.setState({ loading: true });
      const formData = new FormData();
      if (e.target.files) {
        for (let i = 0; i < e.target.files.length; i++) {
          formData.append(`file[${i}]`, e.target.files[i]);
        }
      }
      this.setState({
        buttonDisable: true,
        uploadStatus: "يرجي الإنتظار حتي يتم تحميل الملفات",
      });
      await axios
        .post(window.ApiUrl + "/uploadMultifiles", formData)
        .then(
          (res) =>
            new Promise((resolve, reject) =>
              axios
                .post(
                  window.ApiUrl + "/edit_profile_image/" + this.props.user.id,
                  {
                    // ...this.props.user,d

                    imagePath: res.data[0].data,
                  },
                  {
                    headers: {
                      "content-type": "application/json",
                      Authorization: `bearer ${localStorage.token}`,
                    },
                  }
                )
                .then((res2) => {
                  resolve(res2);
                  if (res2) {
                    this.setState({ loading: false });
                    this.props.editProfile({
                      ...this.props.user,
                      image: res.data[0].data,
                    });
                    e.target.value = null;
                  }
                })
                .catch((error) => {
                  this.setState({ loading: false });
                })
            )
        )
        .catch((error) => {
          this.setState({ loading: false });
        });
    }
  };

  render() {
    console.log(this.props.user.mobile);
    return (
      <div style={{ height: "105vh" }} className="logP">
        <SmallNavbar />
        <div className="loginPage">
          {" "}
          {this.state.loading ? <Loader /> : null}
          <div className="layer">
            <Container className="loginBox profileBox">
              <h5>الملف الشخصي</h5>
              <div>
                <div
                  style={{
                    textAlign: "center",
                  }}
                >
                  <div className="avatar-upload">
                    <div className="avatar-edit">
                      <input
                        onChange={this.setFile}
                        type="file"
                        id="imageUpload"
                      />
                      <label
                        for="imageUpload"
                        style={{ margin: "auto", textAlign: "center" }}
                      >
                        <FontAwesomeIcon
                          icon={faPen}
                          style={{ margin: "10px" }}
                        />
                      </label>
                    </div>
                    <div className="avatar-preview">
                      <div id="imagePreview">
                        <img
                          alt="profileImg"
                          src={
                            this.props.user.image === null
                              ? AvatarImg
                              : `${
                                  window.filesURL +
                                  this.props.user.image.replace("GISAPI", "")
                                }`
                          }
                          style={{
                            width: "inherit",
                            borderRadius: "inherit",
                            height: "inherit",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <h1>{this.props.user.name}</h1>
              <p>{this.props.user.email}</p>
              {this.props.user.mobile !== null && (
                <p>{toArabic(this.props.user.mobile)}</p>
              )}
              <Row className="formRoutes pb-4">
                <Col span={24} style={{ textAlign: "center" }}>
                  <p>
                    <span className="formQuestion pl-2">
                      هل تريد تعديل البيانات الشخصية؟
                    </span>
                    <Link to="/Profile/EditProfile">
                      <span className="formAnswer">تعديل البيانات الشخصية</span>
                    </Link>
                  </p>
                </Col>
                <Col span={24} style={{ textAlign: "center" }}>
                  <p>
                    <span className="formQuestion pl-2">
                      هل تريد تغيير كلمة المرور؟
                    </span>
                    <Link to="Profile/ChangePassword">
                      <span
                        className="formAnswer"
                        onClick={this.props.openChangePassword}
                      >
                        تغيير كلمة المرور
                      </span>
                    </Link>
                  </p>
                </Col>
              </Row>
            </Container>{" "}
          </div>{" "}
          <SmallFooter />
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  Login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStatetoProps = (state) => ({
  isAuth: state.auth.isAuth,
  auth: state.auth,
  user: state.auth.user,
});
const mapDispatchToProps = {
  editProfile,
};
export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(withRouter(Profile));
