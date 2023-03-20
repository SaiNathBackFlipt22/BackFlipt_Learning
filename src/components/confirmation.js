import React from "react";
import styled from "styled-components";

const ItemAddedContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 50px;
`;

const ItemAddedIcon = styled.i`
  font-size: 5rem;
  color: green;
  margin-bottom: 20px;
`;

const ItemAddedHeading = styled.h2`
  font-size: 2rem;
  margin-bottom: 10px;
`;

const ItemAddedMessage = styled.p`
  font-size: 1.2rem;
  text-align: center;
`;

const ConfirmationPage = (props) => {
    return (
        <div>
            <ItemAddedContainer>
                <ItemAddedIcon className="fas fa-check-circle" />
                <ItemAddedHeading>Item {props.type}</ItemAddedHeading>
                <ItemAddedMessage> {props.iName} has been {props.type} to your Menu.</ItemAddedMessage>
            </ItemAddedContainer>

        </div>
    );
};

export default ConfirmationPage;
