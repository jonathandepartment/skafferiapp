import React from "react";

const Register = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <h2>Register</h2>
      <form>
        <div>
          <label>Email</label>
          <input type="text" />
        </div>
        <div>
          <label>Password</label>
          <input type="password" />
        </div>
        <div>
          <label>Confirm Password</label>
          <input type="password" />
        </div>
        <div>
          <button type="submit">Confirm</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
