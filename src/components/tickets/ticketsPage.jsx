import React, { Component } from "react";
//Packages Importing
import { Button } from "react-bootstrap";
//components Importing
import TicketCreator from "./ticketCreator";
import AddTaskModal from "./AddTaskModal";
import Media from "react-media";
import { notification, Row, Col,Tabs } from "antd";
import TicketsList from "./ticketsList";
import SmallNavbar from "../../containers/SmallNavbar";
import SmallFooter from "../../containers/SmallFooter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faHome,faArrowRight,faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import runningIcon from '../../assets/images/inbox.svg'
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
const TabPane = Tabs.TabPane;
class TicketsPage extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      searchString: "",currentTab:'1',
      addTaskModalShow: false,
      selectedCategoryId: "",
      displayedTasks: this.props.Tasks,
      sideOpened: true,
    };
    this.content = React.createRef();
  }
  openSideMenu = (e) => {
    this.setState({ sideOpened: true });
  };
  closeSideMenu = (e) => {
    this.setState({ sideOpened: false });
  };
  openAddTaskModal = (e) => {
    this.setState({
      addTaskModalShow: true,
    });
  };

  closeAddTaskModal = () => {
    setTimeout(() => {
      this.setState({
        addTaskModalShow: false,
      });
    }, 100);
  };

  confirmationAddTicket = () => {
    const args = {
      description: "تم إرسال التذكرة بنجاح",
      duration: 5,
      placement: "bottomLeft",

    };
    notification.open(args);
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    if (this.props.location.pathname === '/tickets/add') {
      this.setState({
        addTaskModalShow: true,
      });
    }
  }
  render() {
    return (
      <div className="addTicketPage">
        <SmallNavbar />
        <div className="headerButtons">
          <div style={{ textAlign: "left" }}>
            {this.props.isAuth ? <Button
              onClick={this.openAddTaskModal}
              id="sub"
              className="addTicketBtn"
            >
              تذكرة جديدة
            </Button> : <Link to="/Login"><Button
              onClick={this.openAddTaskModal}
              id="sub"
              className="addTicketBtn"
            >
              تذكرة جديدة
            </Button></Link>}
            {/* <Button>متابعة المعاملات</Button> */}
          </div>  
          <p>
            تطبيق الدعم الفني
            <span>
          <FontAwesomeIcon className=" ml-2 " icon={faHome} />
              </span></p>
        </div>
        <AddTaskModal
          show={this.state.addTaskModalShow}
          onHide={this.closeAddTaskModal}
          title={"إضافة تذكرة جديدة"}
        >
          <TicketCreator
            confirmationAddTicket={this.confirmationAddTicket}
            onHide={this.closeAddTaskModal}
          />
        </AddTaskModal>     <Media query="(max-width: 1020px)">
          {(matches) =>
            matches ?
              <div className='media_resolution'>
          
             
          <div className='ticketsSideMenuMobile'
                  style={{
                    // display: "grid",
                    alignItems: "center",
                    gridTemplateColumns: "auto auto ",
                    justifyContent: "right",
                  }}
                >
                  
                  <span
                    style={{
                      whiteSpace: this.state.sideOpened
                        ? "break-spaces"
                        : "unset",
                    }}
                    className={
                      this.state.sideOpened ? "sideLabelOpen" : "sideLabelClose"
                    }
                  >
                   
                   التذاكر الجارية
                  </span><img alt='tickets'
                    src={runningIcon}
                    style={{ width: "20px" }}
                    className={
                      this.state.sideOpened
                        ? "mx-2 img-fluid"
                        : "sideImgClose mx-2 img-fluid"
                    }
                  />
                </div>
         <div className='ticketsTableMobile'>              <TicketsList /> 
</div>
          </div>:  <Row className='media_resolution'>
            <Col
              xl={{ span: this.state.sideOpened ? 4 : 1 }}
            md={{ span: this.state.sideOpened ? 6 : 1 }}
            sm={{ span: this.state.sideOpened ? 8 : 1 }}
            xs={{ span: this.state.sideOpened ? 8 : 1 }}
              // style={{ width: this.state.sideOpened ? "100%" : "20px" }}
              className={
                this.state.sideOpened
                  ? "sideMenuShown sideMenuu "
                  : "sideMenuHidden sideMenuu"
              }
            >
              {!this.state.sideOpened ? (
             
             <span  className="openSideMenuArrow "onClick={this.openSideMenu} > <FontAwesomeIcon  
                icon={faArrowLeft} /></span>

              ) : null}
             
              <Tabs defaultActiveKey='1'
                    className={this.state.sideOpened ? "" : "pt-5 "}
                    style={{ textAlign: "right" }}
                    activeKey={this.state.currentTab}
                     onChange={(e)=>this.setState({currentTab:e})}
                    // type="card"
                    tabPosition="right"
                  >
                     <TabPane
            tab={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    // display: "grid",
                    alignItems: "center",
                    gridTemplateColumns: "auto auto ",
                    justifyContent: "right",
                  }}
                >
                  <img alt='ticket'
                    src={runningIcon}
                    style={{ width: "20px" }}
                    className={
                      this.state.sideOpened
                        ? "mx-2 img-fluid"
                        : "sideImgClose mx-2 img-fluid"
                    }
                  />
                  <span
                    style={{
                      whiteSpace: this.state.sideOpened
                        ? "break-spaces"
                        : "unset",
                    }}
                    className={
                      this.state.sideOpened ? "sideLabelOpen" : "sideLabelClose"
                    }
                  >
                    {" "}
                   التذاكر الجارية
                  </span>
                </div>
              </div>
            }
            key='1'
              ></TabPane>

                  </Tabs>
            </Col>
            <Col
              className="px-4"
              xl={{ span: this.state.sideOpened ? 20 : 23 }}
              md={{ span: this.state.sideOpened ? 18 : 23 }}              sm={{ span: this.state.sideOpened ? 16 : 23 }}
              xs={{ span: this.state.sideOpened ? 16 : 23 }}

            >
              {!this.state.sideOpened ? null : (
              
               <span onClick={this.closeSideMenu}  className="closeSideMenuArrow"> <FontAwesomeIcon 
               icon={faArrowRight} /></span>
              )}
              {this.state.currentTab === 1 ? <TicketsList /> : null}
            </Col>
          </Row> }</Media>
        
        <SmallFooter />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});
export default connect(mapStateToProps)(withRouter(TicketsPage));
