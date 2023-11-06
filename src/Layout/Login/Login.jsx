import { useState } from "react";
import Input from "../../components/Input/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from "../../components/Button/Button";
import { ServerApi } from "../../utils/http";
import ToastMessage from "../../utils/alert";
import { setLocalData } from "../../utils/helper";

const Login = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handleEmailChange = (event) => {
    setFormData({ ...formData, email: event.target.value })
  }

  const handlePasswordChange = (event) => {
    setFormData({ ...formData, password: event.target.value })
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    console.log(formData)
    try {
      const response = await ServerApi.post("auth/login", formData);
      const data = response.data;
      console.log(data)
      ToastMessage("Đăng nhập thành công!").success();
      setLocalData("auth_info", data);
      navigate("/")
    } catch (error) {
      console.log(error)
      if (error.response && error.response.data && error.response.data.message) {
        ToastMessage(error.response.data.message).error()
      } else {
        console.error('Lỗi không rõ ràng:', error);
        ToastMessage("Lỗi hệ thống!").error()
      }
    }

  }

  return (
    <div className="Login_Admin">
      <div className="Login_Admin_Box">
        <h2>ĐĂNG NHẬP</h2>
        <div className="form_Login">
          <form action="" onSubmit={handleSubmitForm}>
            <Input
              type={"text"}
              placeholder="Email"
              className={
                "w-full mt-2 px-3 py-2 border-2 rounded-lg bg-white focus:border-indigo-500 focus:outline-none"
              }
              value={formData.email}
              onChange={handleEmailChange}
            />
            <div className="password-input">
              <Input
                type={passwordVisible ? "text" : "password"}
                placeholder="Mật khẩu"
                className={
                  "w-full mt-2 px-3 pr-10 py-2 border-2 rounded-lg bg-white focus:border-indigo-500 focus:outline-none"
                }
                value={formData.password}
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
                <FormControlLabel control={<Checkbox />} label="Nhớ mật khẩu" />
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
