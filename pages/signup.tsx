import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUpPage: React.FC = () => {
  const router = useRouter();
  const cookies = new Cookies();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });

  const handleSignUp = async () => {
    try {
      const response = await Axios.post(
        "http://localhost:3006/auth/signup",
        user
      );

      const { token, userId, firstName, lastName, username, hashedPassword } =
        response.data;

      cookies.set("token", token);
      cookies.set("userId", userId);
      cookies.set("username", username);
      cookies.set("firstName", firstName);
      cookies.set("lastName", lastName);
      cookies.set("hashedPassword", hashedPassword);

      console.log("User registered successfully:", response.data);
      toast.success("User registered successfully");
      router.push("/login");
    } catch (error: any) {
      console.error("Failed to register user:", error);
      toast.error("Failed to register user");

      if (
        error.response &&
        error.response.status === 409 &&
        error.response.data.message === "User with this email already exists"
      ) {
        toast.error("Email already exists");
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <div>
      <Layout>
        {/* <div className="flex justify-center mt-2 h-full">
          <div style={{ minWidth: "30%" }}>
            <div className="flex min-h-full shadow-2xl flex-1 flex-col justify-center px-6 py-6 lg:px-8 bg-white ">
              <div className=" sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="space-y-2">
                  <label> Sign Up</label>
                  <input
                    placeholder="First Name"
                    onChange={(event) => {
                      setUser({ ...user, firstName: event.target.value });
                    }}
                  />
                  <input
                    placeholder="Last Name"
                    onChange={(event) => {
                      setUser({ ...user, lastName: event.target.value });
                    }}
                  />
                  <input
                    placeholder="Username"
                    onChange={(event) => {
                      setUser({ ...user, username: event.target.value });
                    }}
                  />
                  <input
                    placeholder="Password"
                    type="password"
                    onChange={(event) => {
                      setUser({ ...user, password: event.target.value });
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleSignUp}
                    className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-8"
                  >
                    Sign up
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        <div className="flex justify-center mt-2 h-full">
          <div style={{ minWidth: "30%" }}>
            <div className="flex min-h-full shadow-2xl flex-1 flex-col justify-center px-6 py-6 lg:px-8 bg-white ">
              <div className=" sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-2" action="#" method="POST">
                  <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      First Name
                    </label>
                    <div className="mt-2">
                      <input
                        placeholder="First Name"
                        onChange={(event) => {
                          setUser({ ...user, firstName: event.target.value });
                        }}
                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Last Name
                    </label>
                    <div className="mt-2">
                      <input
                        placeholder="Last Name"
                        onChange={(event) => {
                          setUser({ ...user, lastName: event.target.value });
                        }}
                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      User Name
                    </label>
                    <div className="mt-2">
                      <input
                        placeholder="Username"
                        onChange={(event) => {
                          setUser({ ...user, username: event.target.value });
                        }}
                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Password
                      </label>
                      <div className="text-sm">
                        <a
                          href="#"
                          className="font-semibold text-indigo-600 hover:text-indigo-500"
                        >
                          Forgot password?
                        </a>
                      </div>
                    </div>
                    <div className="mt-2">
                      <input
                        placeholder="Password"
                        type="password"
                        onChange={(event) => {
                          setUser({ ...user, password: event.target.value });
                        }}
                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={handleSignUp}
                      className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-8"
                    >
                      Sign in
                    </button>
                  </div>
                </form>

                {/* <p className="mt-10 text-center text-sm text-gray-500">
                    Already registered?
                    <span
                      className="font-semibold leading-6 text-indigo-600 
hover:text-indigo-500 cursor-pointer"
                      onClick={() => {
                        router.push("/signup");
                      }}
                    >
                      Login Here
                    </span>
                  </p> */}
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </Layout>
    </div>
  );
};

export default SignUpPage;
