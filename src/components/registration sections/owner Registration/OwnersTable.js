import React from "react";
import { Table, Modal } from "react-bootstrap";
import { Button } from "antd";
import EditOwner from "./EditOwner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
export default function OwnersTable(props) {
  return (
    <div className="ownerTable">
      <Table className="mt-2">
        <thead>
          <tr>
            <th>م </th> <th>اسم المالك </th> <th>رقم الهوية </th>{" "}
            <th>جهة الإصدار </th> <th>العمليات </th>
          </tr>
        </thead>
        <tbody>
          {props.addedOwners.length !== 0 &&
            props.addedOwners &&
            props.addedOwners.map((o, index) => (
              <tr
                key={index}
                style={{
                  borderBottom: "1px solid #d4d6de",
                }}
              >
                <td>{index + 1}</td> <td>{o.name}</td> <td>{o.ssn}</td>
                <td>{o.nationalid_issuer_name}</td>
                <td>
                  <FontAwesomeIcon
                    icon={faEdit}
                    style={{ cursor: "pointer" }}
                    onClick={() => props.openEditModal(index)}
                  />
                  <Modal
                    style={{ textAlign: "right" }}
                    show={props.showEditModal === index}
                    onHide={props.closeEditModal}
                    backdrop="static"
                    {...props}
                    className="AddOwnerModal"
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                  >
                    <EditOwner
                      oData={o}
                      biggetAddOwners={props.biggetAddOwners}
                      index={index}
                      addedOwners={props.addedOwners}
                      getAddOwners={props.getAddOwners}
                      onHide={props.closeEditModal}
                      showEditModal={props.showEditModal}
                    />
                  </Modal>
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="mx-4"
                    style={{ cursor: "pointer" }}
                    onClick={() => props.openCancelModal(index)}
                  />
                  <Modal
                    style={{ textAlign: "right" }}
                    show={props.showCancelModal === index}
                    onHide={props.closeCancelModal}
                    backdrop="static"
                    {...props}
                    className="deleteOwnerModal"
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                  >
                    <Modal.Header>
                      <Modal.Title>
                        <h4> هل أنت متأكد من إلغاء هذا المالك؟</h4>
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Button
                        className="cancelbtn"
                        onClick={props.closeCancelModal}
                      >
                        لا
                      </Button>
                      <Button
                        className="addbtn"
                        id={o.ssn}
                        onClick={() => props.cancelOwner(o.ssn)}
                      >
                        نعم
                      </Button>
                    </Modal.Body>
                  </Modal>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}
