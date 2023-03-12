import { useState } from "react";
import { Button } from "@material-ui/core";
import styled from "styled-components";

import { mobile } from "../Responsive";

const Container = styled.div`
  height: 60vh;
  background-color: lightgreen;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
`;

const Description = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
  ${mobile({ textAlign: "center" })}
`;

const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
  ${mobile({ width: "80%" })}
`;

const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 20px;
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 18px;
  margin-top: 5px;
`;

const Enquiry = () => {
  const [doubt, setDoubt] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleDoubtChange = (event) => {
    setDoubt(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate email
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail) {
      setEmailError("Invalid email");
      return;
    }

    // Clear input values
    setDoubt("");
    setEmail("");
    setEmailError("");

    // Submit data to backend
    // ...
    console.log("Doubt:", doubt);
    console.log("Email:", email);
  };

  return (
    <Container>
      <Title>Enquiry</Title>
      <Description>
        Get your doubts clear about which fertilizer is best for your crops.
      </Description>

      <InputContainer>
        <Input
          placeholder="Enter your doubt"
          value={doubt}
          onChange={handleDoubtChange}
        />
      </InputContainer>
      <br />
      <InputContainer>
        <Input
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
        />
      </InputContainer>
      {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
      <br />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Container>
  );
};

export default Enquiry;
