import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledSuccessContainer = styled.div`
  text-align: center;
  padding: 20px;
  background-color: black;
  background-image: url("happy.jpg"); // Update the image path here
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 10;
  
  

  /* Animation */
  animation: fadeInFromTop 1s ease-in-out forwards;

  @keyframes fadeInFromTop {
    0% {
      transform: translateY(-50px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const StyledHeading = styled.h2`
  font-size: 35px;
  color:white; /* Update font color for better visibility */
  margin-bottom: 10px;
  font-weight: bold; 
`;

const StyledParagraph = styled.p`
  font-size: 20px;
  color: white; /* Update font color for better visibility */
  margin-bottom: 20px;
  font-weight: bold;
`;

const StyledButtonContainer = styled.div`
  margin-top: 20px;
`;

const StyledButton = styled.button`
  background: #44c767;
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background: #36a65e;
    filter: brightness(1);
  }
`;

const Success = () => {
  const location = useLocation();

  return (
    <StyledSuccessContainer>
      <StyledHeading>Congratulations!</StyledHeading>
      <StyledParagraph>
        Your order has been successfully placed.
      </StyledParagraph>
      <StyledParagraph>
        It will reach you soon, and we can't wait to see you happy!
      </StyledParagraph>

      <StyledButtonContainer>
        <Link to="/" style={{ textDecoration: "none" }}>
          <StyledButton>Continue Shopping</StyledButton>
        </Link>
      </StyledButtonContainer>
    </StyledSuccessContainer>
  );
};

export default Success;
