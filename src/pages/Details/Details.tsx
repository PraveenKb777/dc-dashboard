import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { validate } from "../../util/validation";
import "./index.css";

const OPTION_ITEMS = [
  {
    id: "afgjhskn",
    label: "My Log",
    location: "/",
  },
  {
    id: "afgj798kn",
    label: "Feedback",
    location: "/feedback",
  },
];

const Details = () => {
  const [selectedOption, setSelectedOption] = useState(0);
  const navigation = useNavigate();
  useEffect(() => {
    validate(navigation);
  }, [navigation]);
  const { pathname } = useLocation();
  return (
    <div className="details_main-cont">
      <div className="details_left-bar-main-cont">
        <div className="details_left-bar-brnd-cont">
          <img className="details_left-bar-brnd-logo" src={logo} alt="logo" />
          <p>Diabetes Companion Application dashboard</p>
        </div>
        <div className="details_left-bar-seperator" />
        <div className="details_left-bar-options-cont">
          {OPTION_ITEMS.map((e, i) => (
            <Link style={{ textDecoration: "none" }} to={e.location}>
              <div
                key={e.id}
                onClick={() => setSelectedOption(i)}
                className="details_left-bar-options"
                style={
                  pathname === e.location
                    ? { backgroundColor: "#0075FF" }
                    : undefined
                }
              >
                <h6
                  style={
                    pathname === e.location
                      ? { color: "#fff" }
                      : { color: "black" }
                  }
                >
                  {e.label}
                </h6>
              </div>
            </Link>
          ))}
        </div>
        <div
          onClick={() => {
            localStorage.removeItem("token"),
              navigation("/login", { replace: true });
          }}
          className="details_left-bar-bottom-cont"
        >
          <h3
            className="details_left_logout"
            style={{ color: "rgba(229, 17, 17, 0.80)" }}
          >
            Logout
          </h3>
        </div>
      </div>
      <div className="details_right-main-cont">
        <div className="details_right-top-cont">
          <h1>{OPTION_ITEMS[selectedOption].label}</h1>
        </div>
        <div className="details_right-bottom-cont">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Details;
