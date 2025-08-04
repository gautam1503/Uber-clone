import React, { useState } from "react";
import { Link } from "react-router-dom";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      fullName:{
      firstName: firstName,
      lastName: lastName
      },
      email: email,
      password: password,
    };
    setUserData(formData);
    console.log("Form submitted with:", formData);
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        ></img>
        <form onSubmit={handleSubmit}>
          <h3 className="text-base font-medium mb-2">What's your name</h3>
          <div className="flex gap-4 mb-6">
            <input
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base"
              type="text"
              placeholder="FirstName"
            />
            <input
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base"
              type="text"
              placeholder="LastName"
            />
          </div>

          <h3 className="text-base font-medium mb-2">What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="Email"
          />
          <h3 className="text-base font-medium mb-2">Enter Password</h3>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            placeholder="Password"
          />

          <button
            className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base"
            type="submit"
          >
            SignUp
          </button>
        </form>
        <p className="text-center">
          Already have an account?
          <Link to="/login" className="text-blue-600">
            Sign In
          </Link>
        </p>
      </div>
      <div>
        <p className="text-[6px] leading-tight">
          By proceeding, you agree to Uber’s Terms of Service and acknowledge
          that you have read the Privacy Policy. You may receive SMS messages
          from Uber for verification and operational purposes. Message and data
          rates may apply.
        </p>
        {/* <Link to='/captain-signup'
      className='bg-[#10b461] flex justify-center items-center text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base'
      >
        Sign Up As Captain
      </Link> */}
      </div>
    </div>
  );
};

export default UserSignup;
