import { useState } from "react";
import Input from "../../components/Input/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./Login.scss";
import { Link } from "react-router-dom";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from "../../components/Button/Button";
const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="Login_Admin">
      <div className="Login_Admin_Box">
        <h2>ĐĂNG NHẬP</h2>
        <div className="form_Login">
          <form action="">
            <Input
              type={"text"}
              placeholder="Tên đăng nhập"
              className={
                "w-full mt-2 px-3 py-2 border-2 rounded-lg bg-white focus:border-indigo-500 focus:outline-none"
              }
            />
            <div className="password-input">
              <Input
                type={passwordVisible ? "text" : "password"}
                placeholder="Mật khẩu"
                className={
                  "w-full mt-2 px-3 pr-10 py-2 border-2 rounded-lg bg-white focus:border-indigo-500 focus:outline-none"
                }
                value={password}
                onChange={handlePasswordChange}
              />
              <button
                type="button"
                className="password-toggle-button"
                onClick={togglePasswordVisibility}
              >
                <FontAwesomeIcon
                  icon={passwordVisible ? faEyeSlash : faEye}
                />
              </button>
            </div>
            <div className="password_tienich">
                <div className="nho_mk">
            <FormControlLabel control={<Checkbox/>} label="Nhớ mật khẩu" />
            </div>
            <div className="quen_mk">
                <Link to="/">Quên mật khẩu?</Link>
            </div>
            </div>
            <div className="submit_Login">
            <Button
             text={"ĐĂNG NHẬP"}
             type="submit"
             Class="submit"
            ></Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
