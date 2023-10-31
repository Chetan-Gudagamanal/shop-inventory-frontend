import styles from "./LoginPage.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Card from "@mui/material/Container";
import { backend_url } from "../../constants";

export default function LoginPage({ setStatus, setLoggedInUserId }) {
  const navigate = useNavigate();
  const [loadingStatus, setLoadingStatus] = useState(false);
  const validationSchema = Yup.object().shape({
    userEmail: Yup.string().required().email(),
    password: Yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = (data) => {
    setLoadingStatus(true);
    data["userEmailOrPhone"] = data["userEmail"];
    // console.log(data);
    const loginUser = async () => {
      const url = `${backend_url}/login`;
      const rawData = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (rawData.status == 200) {
        let jsonData = await rawData.json().then((res) => {
          // setStatus("Login Successful")
          // console.log(res);
          localStorage.setItem("x-auth-token", res.token);
          setLoggedInUserId(res.userData._id);
          setLoadingStatus(false);
          navigate("/homepage");
        });
      } else {
        let jsonData = await rawData.json();
        // console.log(jsonData)
        setLoadingStatus(false);
        alert("Invalid Credentials");
      }
    };
    loginUser();
    // navigate("/login")
    setLoadingStatus(false);
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        paddingTop: "1em",
      }}
    >
      <div>
        {/* <p>Click on create Account to register as new user</p> */}

        <h2 style={{ margin: "0" }}>LOGIN</h2>
        <div>
          <Card>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.Form}>
              <br />
              <input
                {...register("userEmail")}
                placeholder="Enter your email id"
                className={styles.input}
              />
              {errors.userEmail && (
                <span className={styles.errorText}>
                  {" "}
                  {errors.userEmail.message}{" "}
                </span>
              )}
              <br />
              <input
                {...register("password")}
                type="password"
                placeholder="Enter your password"
                className={styles.input}
              />
              {errors.password && (
                <span className={styles.errorText}>
                  {" "}
                  {errors.password.message}{" "}
                </span>
              )}
              <br />

              {!loadingStatus ? (
                <input type="submit" value="LOGIN" className={styles.input} />
              ) : (
                <CircularProgress disableShrink />
              )}
              <br />

              <div className="text-center">
                <button
                  className={styles.secondaryFormbutton}
                  onClick={() => {
                    navigate("/register");
                  }}
                >
                  Create an Account!
                </button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </Container>
  );
}
