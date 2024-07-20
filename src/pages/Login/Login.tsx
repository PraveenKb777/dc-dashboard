/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import mockup from "../../assets/Mockup.png";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import auth from "../../util/auth";
import { validate } from "../../util/validation";
import "./index.css";
const Login: FC = () => {
  const [showPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [load, setLoad] = useState(false);
  const navigation = useNavigate();

  useEffect(() => {
    validate(navigation, "/", { replace: true });
  }, [navigation]);
  const loginPress = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!load) {
      try {
        const res = await auth.post("/admin/login", { email, password });
        const { token } = await res.data;
        localStorage.setItem("token", token);
        navigation("/", { replace: true });
        setLoad(true);
      } catch (error) {
        console.log(error);
      } finally {
        setLoad(false);
      }
    }
  };

  return (
    <div className="login_main-cont">
      <div className="login_img-cont">
        <img src={mockup} alt="Mock up image" className="login_img-main" />
      </div>
      <form className="login_form-main" onSubmit={loginPress}>
        <h1>Login</h1>
        <div style={{ height: "20px" }} />
        <p style={{ maxWidth: "80%" }}>
          Welcome to the diabetes companion application dashboard login page.
        </p>
        <div style={{ height: "20px" }} />
        <Input
          label="E-mail"
          type="text"
          placeholder="Enter your email address"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <div style={{ height: "20px" }} />
        <Input
          label="Password"
          type={showPass ? "text" : "password"}
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <div style={{ height: "20px" }} />
        <Button type="submit">{load ? "Loading" : "Login"}</Button>
      </form>
    </div>
  );
};

export default Login;
