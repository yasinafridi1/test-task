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
      localStorage.setItem("user", JSON.stringify(response.data.email));
      navigate("/");
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
      {/* <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
            Sign in to your account
          </h1>
          <form className="space-y-4 md:space-y-6">
            <div className="w-full text-center text-red-400">
              <p>{error}</p>
            </div>
            <div>
              <label
                for="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                placeholder="name@company.com"
                required
              />
            </div>
            <div>
              <label
                for="password"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700"
            >
              Sign in
            </button>
          </form>
        </div>
      </div> */}
    </Main>
  );
};

export default Login;
