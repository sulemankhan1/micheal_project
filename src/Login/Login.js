import React, { Component, useState } from "react";
import { NavLink, Link, useHistory, useLocation } from "react-router-dom";

import { CheckIcon, UserIcon, LockClosedIcon } from "@heroicons/react/outline";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import { observable, makeObservable } from "mobx";

import { observer, inject } from "mobx-react";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import AppleSignin from "react-apple-signin-auth";
import { useScript, appleAuthHelpers } from "react-apple-signin-auth";
import Swal from "sweetalert2";
import config from "../config";
import axios from "../../node_modules/axios/index";

@inject("store")
@observer
class Login extends Component {
  @observable email = "";
  @observable password = "";
  @observable fname = "";
  @observable lname = "";
  @observable errorMessage = "";
  @observable resData = "";
  @observable otp = "";
  @observable sendOtpRes = "";
  @observable verifyOtpRes = "";

  constructor() {
    super();
    makeObservable(this);
  }

  onChange = (val) => {
    this.currentPromptOption = val;
    console.log(this.currentPromptOption);
  };

  onChangeAny = (val, attr) => {
    this[attr] = val;
    this.errorMessage = "";
  };

  onLogin = async (e) => {
    try {
      if (e.SocialLogin === true) {
        let data = await this.props.store.api
          .post("/auth/signin", {
            email: e.resData.email,
            password: "",
            SocialLogin: true,
          })
          .then(({ data }) => data);
        console.log("loginSocialData", data);
        if (data.token && data.profile) {
          localStorage.setItem("authToken", data.token);
          this.props.store.loginWithDataTokenAndProfile(data);
          // console.log("tokenStatus", data.token);
          Swal.fire("Success", "success", "success", {
            buttons: false,
            timer: 2000,
          });
        }
      } else {
        e.preventDefault();
        let data = await this.props.store.api
          .post("/auth/signin", {
            email: this.email,
            password: this.password,
            SocialLogin: false,
          })
          .then(({ data }) => data);
        if (data.token && data.profile) {
          localStorage.setItem("authToken", data.token);
          // await freePlan();
          this.props.store.loginWithDataTokenAndProfile(data);
          console.log("tokenStatus", data.token);
          Swal.fire("Success", "success", "success", {
            buttons: false,
            timer: 2000,
          });
        }
      }
    } catch (err) {
      console.log(err);
      console.log(err?.response?.data?.message);
      if (err?.response?.data?.message) {
        this.errorMessage = err?.response?.data?.message;
        Swal.fire("error", err?.response?.data?.message, "error", {
          buttons: false,
          timer: 2000,
        });
      }
    }
  };

  onSignup = async (e) => {
    console.log("this is e", e);

    try {
      if (e.SocialLogin === true) {
        let data = await this.props.store.api
          .post("/auth/signup", {
            email: e.resData.email,
            password: "",
            fname: e.resData.given_name,
            lname: e.resData.family_name,
            SocialLogin: true,
            referral: this.props.store.referral,
          })
          .then(({ data }) => data);
        console.log(`onSignupSocial`, data);
        if (data.token && data.profile) {
          // this.props.store.loginWithDataTokenAndProfile(data);
          // axios
          //   .post(`${config.baseURL}user/stripe/subscribe`, {
          //     priceId: config.stripe.free,
          //     trail: true,
          //     token: data.token,
          //   })
          //   .then((res) => {
          //     if (res.data.success === true) {
          //       console.log("checkingRes", res);
          //       data.profile.status = "trialing";
          //     }
          //   });

          Swal.fire("Success", "success", "success", {
            buttons: false,
            timer: 2000,
          });
          setTimeout(() => {
            this.props.store.loginWithDataTokenAndProfile(data);
          }, 1000);
        }
      } else {
        e.preventDefault();
        this.errorMessage = "";
        console.log("signup");
        console.log("This is res signupFunc", this.resData);
        let data = await this.props.store.api
          .post("/auth/signup", {
            email: this.email,
            password: this.password,
            fname: this.fname,
            lname: this.lname,
            SocialLogin: false,
            referral: this.props.store.referral,
          })
          .then(({ data }) => data);
        console.log(`onSignup`, data);
        if (data.token && data.profile) {
          console.log("signUpToken", data.token);

          // axios
          //   .post(`${config.baseURL}user/stripe/subscribe`, {
          //     priceId: config.stripe.free,
          //     trail: true,
          //     token: data.token,
          //   })
          //   .then((res) => {
          //     if (res.data.success === true) {
          //       console.log("checkingRes", res);
          //       data.profile.status = "trialing";
          //     }
          //   });

          Swal.fire("Success", "success", "success", {
            buttons: false,
            timer: 2000,
          });
          setTimeout(() => {
            this.props.store.loginWithDataTokenAndProfile(data);
          }, 2000);
        }
      }
    } catch (err) {
      console.log(err);
      console.log(err?.response?.data?.message);
      if (err?.response?.data?.message) {
        this.errorMessage = err?.response?.data?.message;
        Swal.fire("error", err?.response?.data?.message, "error", {
          buttons: false,
          timer: 2000,
        });
      }
    }
  };

  onSendOtp = async () => {
    try {
      this.errorMessage = "";
      let data = await this.props.store.api
        .post("/forgetPassword_V1", {
          email: this.email,
        })
        .then((data) => {
          this.sendOtpRes = data.data.success;
          console.log(`onSendOtp`, data);
          Swal.fire("Success", data.data.msg, "success", {
            buttons: false,
            timer: 2000,
          });
        });
    } catch (err) {
      console.log(err);
      console.log("OtpError", err);
      if (err) {
        this.errorMessage = err?.response?.data?.message;
        Swal.fire("error", err, "error", {
          buttons: false,
          timer: 2000,
        });
      }
    }
  };

  onOtpVerify = async () => {
    try {
      this.errorMessage = "";
      let data = await this.props.store.api
        .post(`/forgetPassword_V2/${this.email}`, {
          otp: this.otp,
        })
        .then((data) => {
          console.log(`verifyOtp`, data);
          this.verifyOtpRes = data.data.success;
          Swal.fire("Success", data.data.msg, "success", {
            buttons: false,
            timer: 2000,
          });
        });
    } catch (err) {
      console.log(err);

      if (err) {
        this.errorMessage = err?.response?.data?.message;
        Swal.fire("error", err, "error", {
          buttons: false,
          timer: 2000,
        });
      }
    }
  };
  onResetPassword = async (navigate) => {
    try {
      this.errorMessage = "";
      let data = await this.props.store.api
        .post(`/forgetPassword_V3/resetPassword`, {
          otp: this.otp,
          email: this.email,
          password: this.password,
        })
        .then(({ data }) => data);
      console.log(`onResetPass`, data);

      if (data?.success) {
        Swal.fire("Success", data.msg, "success", {
          buttons: false,
          timer: 2000,
        });
        setTimeout(() => {
          navigate.push("/login");
        }, 1000);
      }
    } catch (err) {
      console.log(err);
      console.log(err?.response?.data?.message);
      if (err) {
        this.errorMessage = err?.response?.data?.message;
        Swal.fire("error", err, "error", {
          buttons: false,
          timer: 2000,
        });
      }
    }
  };

  // Currently Selected Input Option

  render() {
    return (
      <>
        <Helmet>
          <title>{`Login - GO XR AI`}</title>
        </Helmet>
        <div className="container mx-auto lg:px-4 py-4 min-h-screen flex flex-col md:items-center md:justify-center">
          <div className="text-center mb-6">
            {/* <Logo /> */}
            <div className="text-3xl md:text-5xl relative font-medium text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-gray-600 mb-4 pt-12">
              Think Space<span className="font-normal "> AI </span>
              {/* <div className="absolute top-0 ml-3 left-full bg-gradient-to-r from-gray-500 to-gray-500 text-white text-sm px-2 py-0.5 hidden md:inline-block rounded-md font-normal ">gpt3</div> */}
            </div>
          </div>
          <div
            className={`min-w-full md:min-w-0 bg-white rounded-xl shadow-xl transform transition-all  transition shadow-md hover:shadow-2xl focus:shadow-2xl w-1/2`}
          >
            <div className="align-bottom flex  transform transition-all sm:align-middle transition flex divide-x divide-gray-300 ">
              <NavLink
                to="/login"
                className={`flex-1 justify-center transition py-4 px-4 pr-8 rounded-t-md flex text-${
                  this.props.location.pathname === "/login"
                    ? "gray-800"
                    : "gray-600"
                } font-medium  bg-${
                  this.props.location.pathname === "/login"
                    ? "white"
                    : "gray-300"
                } hover:bg-${
                  this.props.location.pathname === "/login"
                    ? "white"
                    : "gray-100"
                } cursor-pointer`}
              >
                <div
                  className={`transition mr-4  flex-shrink-0 inline-flex items-center justify-center text-sm h-6 w-6 rounded-full bg-${
                    this.props.location.pathname === "/login"
                      ? "purple-300"
                      : "gray-200"
                  } text-${
                    this.props.location.pathname === "/login"
                      ? "purple"
                      : "gray"
                  }`}
                >
                  <CheckIcon
                    className={`transition h-4 w-4 text-${
                      this.props.location.pathname === "/login"
                        ? "purple-600"
                        : "gray-400"
                    }`}
                    aria-hidden="true"
                  />
                </div>
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className={`flex-1 justify-center transition py-4 px-4 pr-8 rounded-t-md flex text-${
                  this.props.location.pathname === "/signup"
                    ? "gray-800"
                    : "gray-600"
                } font-medium  bg-${
                  this.props.location.pathname === "/signup"
                    ? "white"
                    : "gray-300"
                } hover:bg-${
                  this.props.location.pathname === "/signup"
                    ? "white"
                    : "gray-100"
                } cursor-pointer`}
              >
                <div
                  className={`transition mr-4  flex-shrink-0 inline-flex items-center justify-center text-sm h-6 w-6 rounded-full bg-${
                    this.props.location.pathname === "/signup"
                      ? "purple-300"
                      : "gray-200"
                  } text-${
                    this.props.location.pathname === "/signup"
                      ? "purple"
                      : "gray"
                  }`}
                >
                  <CheckIcon
                    className={`transition h-4 w-4 text-${
                      this.props.location.pathname === "/signup"
                        ? "purple-600"
                        : "gray-400"
                    }`}
                    aria-hidden="true"
                  />
                </div>
                Signup
              </NavLink>
            </div>
            <div className="px-4 py-4 md:px-12 md:py-12">
              {/* Sorru */}
              <Switch>
                <Route path="/login">
                  <Logon
                    landingPageUrl={this.props.store.landingPageUrl}
                    email={this.email}
                    password={this.password}
                    signUp={this.signUpWithGoogle}
                    onChange={this.onChangeAny}
                    onLogin={this.onLogin}
                    resData={this.resData}
                  />
                </Route>
                <Route path="/signup">
                  <Signup
                    email={this.email}
                    password={this.password}
                    fname={this.fname}
                    lname={this.lname}
                    onChange={this.onChangeAny}
                    onSignup={this.onSignup}
                    resData={this.resData}
                  />
                </Route>
                <Route path="/forgetpassword">
                  <RestPassword
                    email={this.email}
                    onChange={this.onChangeAny}
                    otp={this.otp}
                    onSendOtp={this.onSendOtp}
                    onOtpVerify={this.onOtpVerify}
                    onResetPassword={this.onResetPassword}
                    sendOtpRes={this.sendOtpRes}
                    verifyOtpRes={this.verifyOtpRes}
                  />
                </Route>
                <Route>
                  <Redirect to="/landing" />
                </Route>
              </Switch>
              {this.errorMessage ? (
                <div className="text-red-600 bg-red-50 rounded-md p-1 text-center mt-4">
                  {this.errorMessage}
                </div>
              ) : null}
            </div>
            <Link
              to="/landing"
              className="block text-center bg-gray-100 text-gray-500 text-sm p-3 rounded-b-lg hover:bg-gray-200 cursor-pointer"
            >
              Back to landing page
            </Link>
          </div>
        </div>
      </>
    );
  }
}

const Logon = observer(
  ({
    active,
    email,
    password,
    resData,
    onChange,
    onLogin,
    landingPageUrl,
    signUp,
  }) => {
    const responseMessage = (response) => {
      resData = jwt_decode(response.credential);
      console.log(resData);
      const resObj = { resData, SocialLogin: true };
      onLogin(resObj);
    };
    const errorMessage = (error) => {
      console.log(error);
    };

    const responseApple = (response) => {
      console.log("AppleRes", response);
      try {
        return appleAuthHelpers.signIn({
          authOptions: {
            clientId: "com.examplemichaeltest1",
            redirectURI: "https://ai-helper-site1.onrender.com",
            usePopup: true,
          },
          onSuccess: (response) =>
            console.log("responseApple - response", response),
          onError: (error) => console.log("responseApple - error", error),
        });
      } catch (error) {
        console.log("responseApple - catch error", error);
        //handle error.
      }
    };

    return (
      <>
        <form onSubmit={onLogin}>
          <div
            className={`mx-auto flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-${
              email && password ? "purple" : "gray"
            }-300  ${email && password ? "bg-purple-300" : "bg-gray-300"} `}
          >
            <LockClosedIcon
              className={`h-8 w-8 ${
                active ? "text-purple-700" : "text-gray-500"
              } text-${email && password ? "purple-700" : "gray-500"}`}
              aria-hidden="true"
            />
          </div>
          <div className="mt-3 text-center ">
            <div className="text-3xl font-medium text-gray-900">Log in</div>
            <p className="text-lg text-gray-500">Login to your account</p>
            <div className="flex flex-col flex-1">
              <label className="text-gray-400 text-sm block mt-4 inline-block text-left">
                Email Address
              </label>
              <input
                value={email}
                onChange={(e) => onChange(e.target.value, "email")}
                focus="true"
                type="email"
                className="rounded-md text-lg px-4 py-2  border border-gray-300"
                placeholder="john@smith.com"
              />
            </div>
            <div className="flex flex-col flex-1">
              <label className="text-gray-400 text-sm block mt-4 inline-block text-left">
                Password
              </label>
              <input
                value={password}
                onChange={(e) => onChange(e.target.value, "password")}
                type="password"
                className="rounded-md text-lg px-4 py-2  border border-gray-300 inline-block"
                placeholder="*******"
              />
            </div>
            <div className="flex flex-col">
              <button
                type="submit"
                className="btn bg-gradient-to-r from-purple-900 to-purple-700 text-white font-medium rounded-lg text-lg px-4 py-2 bg-gray-200 text-white mt-4 border border-gray-300 inline-block"
              >
                Log in
              </button>

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "20px",
                }}
              >
                <GoogleLogin
                  onSuccess={responseMessage}
                  onError={errorMessage}
                />
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "20px",
                }}
              >
                <AppleSignin
                  authOptions={{
                    clientId: "com.examplemichaeltest1",
                    scope: "name email",
                    redirectURI: "https://ai-helper-site1.onrender.com",
                    usePopup: true,
                  }}
                  uiType="light"
                  className="apple-auth-btn"
                  buttonExtraChildren="Continue with Apple"
                  /* onClick={() => console.log('Apple onClick')} */ // default = undefined

                  /** Called upon signin success in case authOptions.usePopup = true -- which means auth is handled client side */
                  onSuccess={() => responseApple} // default = undefined
                  /** Called upon signin error */
                  onError={(error) =>
                    console.log("AppleSignInBtn onError error", error)
                  } // default = undefined
                  /** Skips loading the apple script if true */
                  skipScript={false} // default = undefined
                  /** Checkout README.md for further customization props. */
                  /** Spread rest props if needed */
                />
              </div>
            </div>
          </div>
        </form>
        <div className="mt-3 text-center">
          <Link to="/forgetpassword">
            <button type="btn" className="mt-4 text-gray-400 text-sm">
              Forgot your password?
            </button>
          </Link>
        </div>
      </>
    );
  }
);

const Signup = observer(
  ({ active, email, password, fname, lname, onChange, onSignup }) => {
    let resData = "";
    const responseMessage = (response) => {
      resData = jwt_decode(response.credential);
      console.log("this is res outerFUnc", resData);
      const resObj = { resData, SocialLogin: true };
      onSignup(resObj);
    };
    const errorMessage = (error) => {
      console.log(error);
    };

    return (
      <>
        <form onSubmit={onSignup}>
          <div
            className={`mx-auto flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-${
              email && password ? "purple" : "gray"
            }-300  ${email && password ? "bg-purple-300" : "bg-gray-300"} `}
          >
            <UserIcon
              className={`h-8 w-8 ${
                active ? "text-purple-700" : "text-gray-500"
              } text-${email && password ? "purple-700" : "gray-500"}`}
              aria-hidden="true"
            />
          </div>
          <div className="mt-3 text-center ">
            <div className="text-3xl font-medium text-gray-900">Sign Up</div>
            <p className="text-lg text-gray-500">Create your account</p>
            <div className="md:flex">
              <div className="flex flex-col min-w-0 md:pr-2 flex-1">
                <label className="text-gray-400 text-sm block mt-4 inline-block text-left">
                  First Name
                </label>
                <input
                  value={fname}
                  onChange={(e) => onChange(e.target.value, "fname")}
                  type="text"
                  className="rounded-md text-lg px-4 py-2  border border-gray-300 inline-block w-auto"
                  placeholder="John"
                />
              </div>
              <div className="flex flex-col min-w-0 md:pl-2 flex-1">
                <label className="text-gray-400 text-sm block mt-4 inline-block text-left">
                  Last Name
                </label>
                <input
                  value={lname}
                  onChange={(e) => onChange(e.target.value, "lname")}
                  type="text"
                  className="rounded-md text-lg px-4 py-2  border border-gray-300 inline-block w-auto"
                  placeholder="Smith"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-gray-400 text-sm block mt-4 inline-block text-left">
                Email Address
              </label>
              <input
                value={email}
                onChange={(e) => onChange(e.target.value, "email")}
                focus="true"
                type="email"
                className="rounded-md text-lg px-4 py-2  border border-gray-300"
                placeholder="john@smith.com"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-400 text-sm block mt-4 inline-block text-left">
                Password
              </label>
              <input
                value={password}
                onChange={(e) => onChange(e.target.value, "password")}
                type="password"
                className="rounded-md text-lg px-4 py-2  border border-gray-300 inline-block"
                placeholder="*******"
              />
            </div>

            <div className="flex flex-col">
              <button
                type="submit"
                className="btn bg-gradient-to-r from-purple-900 to-purple-700 text-white font-medium rounded-lg text-lg px-4 py-2 bg-gray-200 text-white mt-4 border border-gray-300 inline-block"
              >
                Sign Up
              </button>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
            </div>
          </div>
        </form>
      </>
    );
  }
);

const RestPassword = observer(
  ({
    email,
    onChange,
    otp,
    password,
    onSendOtp,
    onOtpVerify,
    onResetPassword,
    sendOtpRes,
    verifyOtpRes,
  }) => {
    const [showfield, setShowField] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    let navigate = useHistory();
    console.log("This is opt Res", verifyOtpRes);
    return (
      <>
        <div className="mt-3 text-center ">
          <div className="text-3xl font-medium text-gray-900">
            Reset Password
          </div>
          <p className="text-lg text-gray-500">
            OTP will be sent to your email
          </p>
          {verifyOtpRes ? (
            <div>
              <div className="flex flex-col flex-1">
                <label className="text-gray-400 text-sm block mt-4 inline-block text-left">
                  Enter New Password
                </label>
                <input
                  value={password}
                  onChange={(e) => onChange(e.target.value, "password")}
                  focus="true"
                  type="password"
                  className="rounded-md text-lg px-4 py-2  border border-gray-300 "
                  placeholder="*******"
                />
              </div>
            </div>
          ) : (
            <div>
              <div className="flex flex-col flex-1">
                <label className="text-gray-400 text-sm block mt-4 inline-block text-left">
                  Email Address
                </label>
                <input
                  value={email}
                  onChange={(e) => onChange(e.target.value, "email")}
                  focus="true"
                  type="email"
                  className="rounded-md text-lg px-4 py-2  border border-gray-300"
                  placeholder="john@smith.com"
                />
              </div>
              {sendOtpRes ? (
                <div className="flex flex-col flex-1">
                  <label className="text-gray-400 text-sm block mt-4 inline-block text-left">
                    Enter OTP
                  </label>
                  <input
                    value={otp}
                    onChange={(e) => onChange(e.target.value, "otp")}
                    focus="true"
                    type="text"
                    className="rounded-md text-lg px-4 py-2  border border-gray-300"
                    placeholder="Verify OTP"
                  />
                </div>
              ) : (
                ""
              )}
            </div>
          )}

          <div className="flex flex-col">
            {verifyOtpRes ? (
              <div className="flex flex-col">
                <button
                  type="btn"
                  className="btn bg-gradient-to-r from-purple-900 to-purple-700 text-white font-medium rounded-lg text-lg px-4 py-2 bg-gray-200 text-white mt-4 border border-gray-300 inline-block"
                  onClick={() => onResetPassword(navigate)}
                >
                  Reset Password
                </button>
              </div>
            ) : (
              <div className="flex flex-col">
                {sendOtpRes ? (
                  <button
                    type="btn"
                    className="btn bg-gradient-to-r from-purple-900 to-purple-700 text-white font-medium rounded-lg text-lg px-4 py-2 bg-gray-200 text-white mt-4 border border-gray-300 inline-block"
                    onClick={() => {
                      setShowPassword(true);
                      onOtpVerify();
                    }}
                  >
                    Verify OTP
                  </button>
                ) : (
                  <button
                    type="btn"
                    className="btn bg-gradient-to-r from-purple-900 to-purple-700 text-white font-medium rounded-lg text-lg px-4 py-2 bg-gray-200 text-white mt-4 border border-gray-300 inline-block"
                    onClick={() => {
                      setShowField(true);
                      onSendOtp();
                    }}
                  >
                    Send OTP
                  </button>
                )}
              </div>
            )}

            {/* <a
              href={`https://www.openaitemplate.ai/contact`}
              className="mt-4 text-gray-400 text-sm"
            >
              Forgot your password?
            </a> */}
          </div>
        </div>
      </>
    );
  }
);

const Logo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    className="w-20 h-20 inline-block"
    viewBox="0 0 1512 1532"
  >
    <path
      fill="#000"
      d="M1412.22 627.024a381.628 381.628 0 0017.47-160.247 381.625 381.625 0 00-50.27-153.158 385.877 385.877 0 00-177.63-160.359 385.89 385.89 0 00-238.016-24.803A381.525 381.525 0 00833.74 33.209 381.565 381.565 0 00675.978.154a385.936 385.936 0 00-368.15 267.204A381.68 381.68 0 0052.672 452.459 385.97 385.97 0 002.636 686.458a385.954 385.954 0 0097.504 218.517 381.566 381.566 0 0032.793 313.405 385.943 385.943 0 00415.649 185.16 381.574 381.574 0 00287.797 128.31 385.89 385.89 0 00227.731-73.63 385.855 385.855 0 00140.54-193.73 381.572 381.572 0 00147.58-64.98c44-31.92 80.68-72.88 107.58-120.12a386.032 386.032 0 0049.92-233.94 385.967 385.967 0 00-97.51-218.426zM836.501 1431.71a286.188 286.188 0 01-183.744-66.43c2.325-1.26 6.403-3.5 9.061-5.13l304.978-176.16a49.595 49.595 0 0025.062-43.39V710.636l128.912 74.434c.67.337 1.25.834 1.69 1.451.44.616.72 1.333.81 2.079v356.07a287.37 287.37 0 01-84.08 202.77 287.387 287.387 0 01-202.689 84.27zm-616.724-263.39a286.085 286.085 0 01-34.242-192.354c2.264 1.36 6.22 3.776 9.059 5.407l304.977 176.157a49.582 49.582 0 0025.051 6.79c8.8 0 17.447-2.34 25.048-6.79l372.346-214.989v148.869c.042.76-.103 1.52-.425 2.21a4.548 4.548 0 01-1.417 1.74l-308.302 178.01a287.314 287.314 0 01-217.77 28.55 287.33 287.33 0 01-174.325-133.6zm-80.231-665.797a285.999 285.999 0 01149.41-125.856c0 2.627-.151 7.279-.151 10.507v352.327a49.55 49.55 0 0025.033 43.363l372.345 214.967-128.904 74.429c-.636.42-1.368.67-2.126.74a4.702 4.702 0 01-2.225-.34l-308.33-178.161a287.348 287.348 0 01-105.052-391.976zm1059.094 246.46L826.292 533.988l128.909-74.402a4.596 4.596 0 014.346-.391l308.333 178.004a287.1 287.1 0 01142.45 273.103 287.09 287.09 0 01-57.78 149.628 287.044 287.044 0 01-129.03 95.28V792.345a49.468 49.468 0 00-6.57-25.051 49.515 49.515 0 00-18.31-18.311zm128.3-193.103c-2.26-1.39-6.22-3.775-9.05-5.403L1012.9 374.312a49.683 49.683 0 00-50.09 0L590.463 589.31V440.443a4.613 4.613 0 011.842-3.955l308.302-177.857a287.08 287.08 0 01155.713-38.117 287.052 287.052 0 01151.87 51.322 287.09 287.09 0 01100.67 124.758 286.994 286.994 0 0118.08 159.286zM520.38 821.214l-128.939-74.433a4.572 4.572 0 01-2.505-3.535V387.174a287.084 287.084 0 0144.883-153.942 287.095 287.095 0 01120.453-105.853 287.069 287.069 0 01305.419 39.366c-2.324 1.268-6.372 3.503-9.06 5.134L545.653 348.042a49.548 49.548 0 00-25.063 43.36l-.21 429.812zm70.022-150.98l165.838-95.782 165.834 95.72v191.502L756.24 957.398l-165.838-95.724v-191.44z"
    ></path>
  </svg>
);

export default withRouter(Login);
