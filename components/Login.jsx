import React, { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "@/components/Layout";
import { useRouter } from "next/navigation";


const Login= () => {
  const router = useRouter();
  
  const cookies = new Cookies();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await Axios.post("http://localhost:3003/auth/login", {
        username,
        password,
      });
      console.log(response);
      const { token,user} = response.data;      
      
      cookies.set("token", token);
      cookies.set("userId", user._id);
      cookies.set("username", user.username);
      // cookies.set("firstName", firstName);
      // cookies.set("lastName", lastName);
      router.push("racingcar");

      console.log("User authenticated successfully:", response.data);
      toast.success("User login successful");
      
    } catch (error) {
      console.error("Failed to authenticate user:", error);

      if (error.response && error.response.status === 401) {
        toast.error("Invalid username or password");
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <div>
      <Layout>
        <div className="flex justify-center mt-2">
          <div style={{ minWidth: "30%" }}>
            <div className="flex min-h-full shadow-2xl flex-1 flex-col justify-center px-6 py-6 lg:px-8 bg-white">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-2" action="#" method="POST">
                  <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Username
                    </label>
                    <div className="mt-2">
                      <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        autoComplete="username"
                        required
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
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={handleLogin}
                      className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-8"
                    >
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </Layout>
    </div>
  );
};

export default Login;
