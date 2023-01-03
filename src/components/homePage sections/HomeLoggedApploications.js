import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import { Row, Col, Button } from "antd";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
let applications = [];
let id = "id";
let filteredApps = [];
let DeActApps = [];
class HomeLoggedApploications extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillUnmount() {
    filteredApps = [];
    applications = [];
    DeActApps = [];
  }

  render() {
    if (this.props.user.groups !== null) {
      this.props.user.groups.map((x) =>
        x.groups_permissions !== null
          ? x.groups_permissions.filter((y) =>
              applications.push(y.applications)
            )
          : null
      );
    }
    filteredApps = [
      ...new Map(applications.map((item) => [item[id], item])).values(),
    ];
    if (
      this.props.user.engcompany_id !== null &&
      this.props.user.engineering_companies.applications !== null
    ) {
      DeActApps = this.props.user.engineering_companies.applications;
      filteredApps = DeActApps.map((y) =>
        filteredApps.filter((x) => x.id !== y.id)
      )[0];
    }

    return (
      <Container className="my-5 py-5 myAppsSection">
        <Row justify="center">
          {filteredApps !== undefined && filteredApps.length !== 0 ? (
            filteredApps.map((app, index) =>
              app.href !== "empty" ? (
                <Col
                  key={index}
                  sm={{ span: 24 }}
                  xs={{ span: 24 }}
                  md={{ span: 8 }}
                  className="p-3"
                >
                  <div className="homeApp py-4">
                    <img
                      alt="appIcon"
                      className="img-fluid pl-3"
                      style={{ width: "70px", height: "70px" }}
                      src={`${
                        window.hostURL +
                        window.homepage +
                        "/" +
                        app.icon
                      }`}
                    />
                    <h6 className="pb-3 pt-4">{app.translate_ar_caption}</h6>
                    <p style={{ height: "20px" }}>
                      {" "}
                      {this.props.user.app_sub_count !== null &&
                        this.props.user.app_sub_count.length > 0 &&
                        this.props.user.app_sub_count.map((k, index) =>
                          k.key === app.id ? (
                            <>
                              <span className="opTitle pl-5" key={index}>
                                المعاملات
                              </span>
                              <span className="opCount"> {k.count}</span>
                            </>
                          ) : null
                        )}{" "}
                    </p>
                    <div style={{ margin: "auto", textAlign: "center" }}>
                      <a
                        href={
                          app.href !== null
                            ? app.href.slice(
                                app.href.length - 3,
                                app.href.length
                              ) === "tk="
                              ? `${
                                  window.hostURL + app.href + localStorage.token
                                }`
                              : `${window.hostURL + app.href}`
                            : null
                        }
                        rel="noreferrer"
                      >
                        <Button
                          style={{
                            height: "40px",
                            backgroundColor:"rgb(8, 167, 108)",
                          }}
                        >
                          الدخول إلي التطبيق
                          <FontAwesomeIcon
                            icon={faArrowLeft}
                            className="mr-2"
                          />
                        </Button>
                      </a>
                    </div>
                  </div>
                </Col>
              ) : null
            )
          ) : (
            <h4 className="noAppsH4">لا توجد تطبيقات </h4>
          )}
        </Row>
      </Container>
    );
  }
}

const mapStatetoProps = (state) => ({
  isAuth: state.auth.isAuth,
  user: state.auth.user,
});

export default connect(mapStatetoProps)(withRouter(HomeLoggedApploications));
