import React, { useEffect, useState } from "react";
import {  Button, Pagination, message } from "antd";
import TaskComments from "./TaskComments";
import { Table } from "react-bootstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

const TicketsList = (props) => {
  const [tickets, setTickets] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [showComments, setShowComments] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalTaskId, setModalTaskId] = useState(0);
  const [showAddCommentsBtn, setShowAddCommentsBtn] = useState(true);
  // const [copied, setCopied] = useState(false);
  const token = localStorage.token;

  const setTicketsStates = (pageIndex, itemsPerPage) => {
    let request = new Request(
      window.ApiUrl +
        `/ticket?pageIndex=${pageIndex}&itemsPerPage=${itemsPerPage}`,
      {
        headers: {
          authorization: `bearer ${token}`,
        },
      }
    );
    fetch(request)
      .then(async (res) => {
        if (res.ok) {
          const response = await res.json();
          setTickets(response.tickets);
          setTotalPages(response.totalPages);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setTicketsStates(pageIndex, itemsPerPage);
  });

  const onPaginationChange = (page, pageSize) => {
    setTicketsStates(page, pageSize);
    setPageIndex(page);
  };

  const openCommentsModal = (ticket) => {
    setModalTitle(ticket.title);
    setModalTaskId(ticket.taskId);
    setShowComments(true);
    setShowAddCommentsBtn(!ticket.isClosed);
  };
  const closeCommentsModal = () => {
    setShowComments(false);
  };

  const openAddComment = () => {
    //this.setState({ showAddComment: true });
    setShowComments(false);
  };
  const closeAddComment = () => {
    //this.setState({ showAddComment: false });
    setShowComments(true);
  };

  return (
    <>
      {tickets.length > 0 ? (
        <div className='searchBack'>
          <Table className="mt-2 engTable ownerTable runTicketTable ">
            <thead>
              <tr>
                <th>اسم التذكرة </th> <th>حالة التذكرة </th>
                <th>تفاصيل التذكرة </th> <th>التعليقات </th>
                <th>نسخ</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((t) => (
                <tr
                  key={`ticket-${t.id}`}
                  style={{
                    borderBottom: "1px solid #d4d6de",
                  }}
                >
                  {" "}
                  <td>{t.title}</td>{" "}
                  <td>{t.isClosed ? "تم الإغلاق" : "قيد المعالجة"}</td>{" "}
                  <td>{t.description}</td>
                  <td>
                    <Button onClick={() => openCommentsModal(t)}>
                      التعليقات
                    </Button>
                  </td>
                  <td>
                    {" "}
                    <CopyToClipboard
                      text={`اسم المستخدم:  ${props.user.name},
                    اسم التذكرة: ${t.title},
                      رقم التذكرة: ${t.taskId},
                      حالة التذكرة: ${
                        t.isClosed ? "تم الإغلاق" : "قيد المعالجة"
                      },
                      تفاصيل التذكرة: ${t.description}`}
                      onCopy={() =>
                        message.success(
                          <p className="msgCopy">تم نسخ التذكرة بنجاح</p>
                        )
                      }
                    >
                      <FontAwesomeIcon
                        icon={faCopy}
                        style={{ fontSize: "20px", color: "#176d73" }}
                      />
                    </CopyToClipboard>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination
            defaultCurrent={pageIndex}
            total={itemsPerPage * totalPages}
            pageSize={itemsPerPage}
            onChange={onPaginationChange}
          />
        </div>
      ) : (
        <p className="noTickets mt-4">ليس لديك تذاكر</p>
      )}
      {/* {t.attachments ? (
                      <Row className="mt-3" style={{ overflow: "hidden" }}>
                        <Col span={24}>
                          {t.attachments.length === 0 ? null : (
                            <h5>المرفقات</h5>
                          )}
                          {t.attachments.map((att, index) => (
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
                    ) : null} */}

      {showComments ? (
        <TaskComments
          name={modalTitle}
          taskId={modalTaskId}
          onHide={closeCommentsModal}
          //show={showComments}
          // showAddComment={this.state.showAddComment}
          closeAddComment={closeAddComment}
          openAddComment={openAddComment}
          showAddCommentsBtn={showAddCommentsBtn}
        />
      ) : null}
    </>
  );
};
const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  user: state.auth.user,
});

export default connect(mapStateToProps)(withRouter(TicketsList));
