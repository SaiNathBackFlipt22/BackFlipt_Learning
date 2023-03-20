import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { getDefaultNormalizer } from "@testing-library/react";

const OrderReceivedContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 50px;
`;

const OrderReceivedIcon = styled(FontAwesomeIcon)`
  font-size: 5rem;
  color: green;
  margin-bottom: 20px;
`;

const OrderReceivedHeading = styled.h2`
  font-size: 2rem;
  margin-bottom: 10px;
`;

const OrderReceivedMessage = styled.p`
  font-size: 1.2rem;
  text-align: center;
`;

const OrderReceived = (props) => {
    return (
        <OrderReceivedContainer>
            <OrderReceivedIcon icon={faCheckCircle} />
            <OrderReceivedHeading>Order Received</OrderReceivedHeading>
            <OrderReceivedMessage>
          Your order {props.items.join(' , ')} has been received.<br />
          Come Again after Tomorrow
            </OrderReceivedMessage>
        </OrderReceivedContainer>
    );
};

export default OrderReceived;

