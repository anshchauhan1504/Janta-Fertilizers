import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { login } from "../Redux/apiCalls";
import { mobile } from "../Responsive";
import axios from "axios";
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0.2)
    ),
    url("https://images.pexels.com/photos/265216/pexels-photo-265216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");
  const navigate = useNavigate();

  const handlelogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      seterror("Please fill all the required fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });
      setemail("");
      setpassword("");
      if (response.ok) {
        navigate("/"); //Home page
        console.log("hello")
      } else if (response.status === 400) {
        seterror("Incorrect email or password.");
      } else {
        throw new Error("Server responded with status " + response.status);
      }
    } catch (error) {
      console.log(error);
      seterror("Something went wrong. Please try again later.");
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input
            placeholder="Email"
            value={email}
            type="email"
            onChange={(e) => setemail(e.target.value)}
          />
          <Input
            placeholder="Password"
            value={password}
            type="password"
            onChange={(e) => setpassword(e.target.value)}
          />
          <Button onClick={handlelogin}>LOGIN</Button>
          {error && <Error>{error}</Error>}
          {/* disabled={isFetching} */}
          {/* {error && <Error>Something went wrong...</Error>} */}
          <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
          <Link onClick={() => navigate(`/register/`)}>
            CREATE A NEW ACCOUNT
          </Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
