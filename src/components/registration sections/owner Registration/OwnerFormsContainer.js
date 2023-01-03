import React from "react";

//Packages
import { Radio } from "antd";

//Components
import PrivateSector from "./PrivateSector";
import GovernmentalSector from "./GovernmentalSector";
import PersonForm from "./PersonForm";
import { Container } from "react-bootstrap";

export default function OwnerFormsContainer(props) {
  const [selectedValue, setValue] = React.useState(props.userType);

  const onChange = (e) => {
    setValue(e.target.value);
    props.selectUserType(e.target.value);
  };

  return (
    <div>
      <Container
        style={{ textAlign: "right" }}
        className="ownerRadioBtns px-md-5"
      >
        <Radio.Group onChange={onChange} value={selectedValue}>
          <Radio value={1}>فرد</Radio>
          <Radio value={2}>قطاع حكومي</Radio>
          <Radio value={3}>قطاع خاص</Radio>
        </Radio.Group>
      </Container>
      {selectedValue === 1 ? (
        <PersonForm
          next={props.next}
          personOwner={props.personOwner}
          selectUserType={props.selectUserType}
          getOwnerData={props.getOwnerData}
          name={props.name}
          gender={props.gender}
          IdTypeObject={props.IdTypeObject}
          IdType={props.IdType}
          IdNumber={props.IdNumber}
          IdSide={props.IdSide}
          nationalityObject={props.nationalityObject}
          selectedNationality={props.selectedNationality}
          phoneNumber={props.phoneNumber}
          mobileNumber={props.mobileNumber}
          birthDate={props.birthDate}
          email={props.email}
          address={props.address}
          IdImage={props.IdImage}
          userData={props.userData}
          userType={props.userType}
        />
      ) : selectedValue === 2 ? (
        <GovernmentalSector
          next={props.next}
          personOwner={props.personOwner}
          getOwnerData={props.getOwnerData}
          name={props.name}
          phoneNumber={props.phoneNumber}
          mobileNumber={props.mobileNumber}
          email={props.email}
          address={props.address}
          codeReg={props.codeReg}
          fax={props.fax}
          website={props.website}
          status={props.status}
          subtype={props.subtype}
          userType={props.userType}
        />
      ) : (
        <PrivateSector
          next={props.next}
          name={props.name}
          address={props.address}
          fax={props.fax}
          getOwnerData={props.getOwnerData}
          email={props.email}
          website={props.website}
          phoneNumber={props.phoneNumber}
          mobileNumber={props.mobileNumber}
          type={props.type}
          addedOwners={props.addedOwners}
          status={props.status}
          getAddOwners={props.getAddOwners}
          commercialRecordNumber={props.commercialRecordNumber}
        />
      )}
    </div>
  );
}
