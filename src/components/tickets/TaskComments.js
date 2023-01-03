import React, { Component } from "react";
import { Modal, Dropdown, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { Row, Col} from "antd";
import AddComment from "./AddComment";
import { deleteTaskComment } from "./tasksApi";
import EditCommentForm from "./EditCommentForm";
import PreLoading from "./PreLoading";
import { getTaskComments } from "./tasksApi";
import moment from "moment-hijri";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faPencilAlt,
  faPlusCircle,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

class TaskComments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddComment: false,
      showDeleteModal: null,
      showConfirm: false,
      showEdit: null,
      taskComments: [],
      commentIndexToEdit: null,
      loading: true,
    };
  }

  changeTaskCommentsState = (payload, op) => {
    let { taskComments } = this.state;
    switch (op) {
      case "add":
        taskComments = [...taskComments, payload];
        break;
      case "edit":
        const index = taskComments.findIndex((c) => c.id === payload.id);
        taskComments.splice(index, 1, payload);
        break;
      case "delete":
        taskComments = taskComments.filter((c) => c.id !== payload);
        break;
      default:
        break;
    }
    this.setState({ taskComments });
  };

  addShowOptionsMenuPropertyToTaskComments = async (comments) => {
    const { userId } = this.props;
    const lastCommentIndex = comments.length - 1;
    if (lastCommentIndex < 0) return;

    const lastUserToComment = comments[lastCommentIndex].employeeId;
    for (let i = lastCommentIndex; i >= 0; i--) {
      const comment = comments[i];
      const isCurrentUserComment = Number(userId) === comment.employeeId;
      const isCommentByLastUserToComment =
        lastUserToComment === comment.employeeId;
      if (!isCommentByLastUserToComment) break;
      comment.showOptionsMenu = isCurrentUserComment;
    }
    this.setState({ comments, commentIndexToEdit: null });
  };

  addSeenByPropertyToTaskComments = async (comments, stats) => {
    comments.forEach((c) => {
      c.seenBy = [];
    });
    stats.forEach((s) => {
      if (s.lastSeenOn) {
        comments.forEach((c) => {
          const isCommentWrittenBeforeOrOnLastSeenDate = moment(
            (c.updatedOn || c.createdOn).replace("ص", "am").replace("م", "pm"),
            "iDD/iMM/iYYYY HH:mm a"
          ).isSameOrBefore(
            moment(
              s.lastSeenOn.replace("ص", "am").replace("م", "pm"),
              "iDD/iMM/iYYYY HH:mm a"
            )
          );
          const isCommentWriterNotCommentViewer = c.employeeId !== s.userId;
          if (
            isCommentWriterNotCommentViewer &&
            isCommentWrittenBeforeOrOnLastSeenDate
          ) {
            c.seenBy = [...c.seenBy, s.name];
          }
        });
      }
    });
  };

  setLoadingState = async (state = true) => {
    this.setState({ loading: state });
  };

  componentDidMount = async () => {
    const { taskId } = this.props;
    await this.setLoadingState(true);
    const comments = await getTaskComments(taskId);
    await this.addShowOptionsMenuPropertyToTaskComments(comments);
    this.setState({ taskComments: comments });
    await this.setLoadingState(false);
  };

  openAddComment = () => {
    this.setState({ showAddComment: true });
  };
  closeAddComment = () => {
    this.setState({ showAddComment: false });
  };

  openDeleteModal = (id) => {
    this.setState({ showDeleteModal: id });
  };
  closeDeleteModal = () => {
    this.setState({ showDeleteModal: null });
  };

  onDelete = async (e) => {
    await deleteTaskComment(this.props.taskId, e.target.id);
    this.changeTaskCommentsState(Number(e.target.id), "delete");
    this.setState({ showDeleteModal: null });
    this.setState({ showConfirm: true });
    setTimeout(() => {
      this.setState({
        showConfirm: false,
      });
    }, 1600);
  };

  openEdit = (id, index) => {
    this.setState({ showEdit: id, commentIndexToEdit: index });
  };
  closeEdit = () => {
    this.setState({ showEdit: null });
  };
  render() {
    return (
      <>
        <Modal
          onHide={this.props.onHide}
          show={true}
          backdrop="static"
          className="TaskDetailsModal"
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              <Row>
                <Col span={12}>
                  <h5>
                    <FontAwesomeIcon icon={faPlusCircle} className="circle" />
                    التعليقات
                  </h5>
                </Col>{" "}
                <Col span={12}>
                  <h4>
                    <FontAwesomeIcon
                      icon={faTimes}
                      className="closeModal"
                      onClick={this.props.onHide}
                    />
                  </h4>
                </Col>
              </Row>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body id="commentsModal">
            {this.state.loading ? (
              <PreLoading />
            ) : (
              <>
                <Row>
                  <Col span={24} className="commentsTaskName">
                    <h5> اسم المهمة</h5> <h6>{this.props.name}</h6>
                  </Col>
                </Row>
                {this.state.taskComments &&
                this.state.taskComments.length !== 0 ? (
                  this.state.taskComments.map((comment, index) =>
                    this.state.showEdit !== null ? (
                      this.state.showEdit === comment.id && (
                        <div className="commentCard" key={index}>
                          <EditCommentForm
                            taskId={comment.taskId}
                            comment={comment}
                            editTaskComment={(comment) =>
                              this.changeTaskCommentsState(comment, "edit")
                            }
                            closeEdit={this.closeEdit}
                          />
                        </div>
                      )
                    ) : (
                      <div className="commentCard" key={index}>
                        {comment.showOptionsMenu ? (
                          <div className="dropdownsignoutlink float-left">
                            <Dropdown>
                              <Dropdown.Toggle id="dropdown-basic">
                                <FontAwesomeIcon
                                  icon={faEllipsisV}
                                  style={{
                                    color: "#0b2548",
                                  }}
                                />
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <div className="dropdownsignoutlink">
                                  <Dropdown.Item>
                                    <Button
                                      className="EditBTNN"
                                      onClick={() =>
                                        this.openEdit(comment.id, index)
                                      }
                                      id={comment.id}
                                    >
                                      تعديل
                                      <FontAwesomeIcon
                                        icon={faPencilAlt}
                                        className="ml-3"
                                        style={{
                                          color: "#0b2548",
                                        }}
                                      />
                                    </Button>
                                  </Dropdown.Item>

                                  <Dropdown.Item>
                                    <Button
                                      className="EditBTNN"
                                      id={comment.id}
                                      onClick={() =>
                                        this.openDeleteModal(comment.id)
                                      }
                                    >
                                      حذف
                                      <FontAwesomeIcon
                                        icon={faTrash}
                                        className="ml-3"
                                        style={{
                                          color: "#0b2548",
                                        }}
                                      />
                                    </Button>
                                  </Dropdown.Item>
                                  <Modal
                                    style={{ textAlign: "right" }}
                                    show={
                                      this.state.showDeleteModal === comment.id
                                    }
                                    onHide={this.closeDeleteModal}
                                    backdrop="static"
                                    className="deleteTaskModal commDel"
                                    {...this.state}
                                    size="lg"
                                    aria-labelledby="contained-modal-title-vcenter"
                                    centered
                                  >
                                    <Modal.Body>
                                      <h4 className="deleteCon">
                                        هل أنت متأكد من حذف هذا التعليق؟
                                      </h4>
                                    </Modal.Body>
                                    <Modal.Footer>
                                      <Button
                                        className="commentsBtn"
                                        onClick={this.closeDeleteModal}
                                      >
                                        إلغاء
                                      </Button>
                                      <Button
                                        className="commentsBtn"
                                        id={comment.id}
                                        onClick={this.onDelete}
                                      >
                                        حذف
                                      </Button>
                                    </Modal.Footer>
                                  </Modal>
                                </div>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        ) : null}

                        <h3>
                          {comment.employeeId === this.props.userId
                            ? comment.employeeName
                            : "فريق الدعم"}
                        </h3>
                        <span>{comment.createdOn}</span>
                        <h6>{comment.comment}</h6>
                        {comment.updatedOn
                          ? `${comment.updatedOn} عُدِلَ بتاريخ`
                          : null}

                        {comment.attachments ? (
                          <Row className="mt-3" style={{ overflow: "hidden" }}>
                            <Col span={24}>
                              {comment.attachments.length === 0 ? null : (
                                <h5>المرفقات</h5>
                              )}
                              {comment.attachments.map((att, index) => (
                                <h5 key={index}>
                                  <a
                                    target="_blank"
                                    rel="noreferrer"
                                    href={`${window.filesURL}/${att.path}`}
                                  >
                                    {att.fileName}
                                  </a>
                                </h5>
                              ))}
                            </Col>
                          </Row>
                        ) : null}
                      </div>
                    )
                  )
                ) : (
                  <p
                    className="text-center"
                    style={{ fontWeight: "bold", fontSize: "20px" }}
                  >
                    لا توجد تعليقات
                  </p>
                )}
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Col sm={24}>
              {this.props.showAddCommentsBtn ? (
                <Button className="commentsBtn " onClick={this.openAddComment}>
                  إضافة تعليق
                </Button>
              ) : null}
              {/* <Button className=" detailsBtn">التعليقات</Button> */}
            </Col>
          </Modal.Footer>
        </Modal>
        <AddComment
          taskId={this.props.taskId}
          name={this.props.name}
          addTaskComment={(comment) =>
            this.changeTaskCommentsState(comment, "add")
          }
          show={this.state.showAddComment}
          onHide={this.closeAddComment}
        />
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  userId: state.auth.user.id,
});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(TaskComments);
