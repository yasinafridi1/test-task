import React, { useState } from "react";
import Main from "../components/Main";
import Form from "../components/Form";
import Input from "../components/Input";
import { loginUser } from "../https";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await loginUser({
        email: inputValues.email,
        password: inputValues.password,
      });
      localStorage.setItem("user", true);
      navigate("vehicle-info");
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        console.log(error);
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setError("");
    setInputValues((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  }

  return (
    <Main>
      <Form
        headerText={"Sign in"}
        error={error}
        onSubmit={handleSubmit}
        loading={loading}
      >
        <Input
          id="email"
          type="email"
          label="Your email"
          name="email"
          value={inputValues.email}
          onChange={handleInputChange}
          placeholder="example@gmail.com"
        />
        <Input
          id="password"
          type="password"
          label="Your password"
          name="password"
          value={inputValues.password}
          onChange={handleInputChange}
          placeholder="••••••••"
        />
      </Form>
    </Main>
  );
};

export default Login;
