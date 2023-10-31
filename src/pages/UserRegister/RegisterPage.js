import styles from "./RegisterPage.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Card from "@mui/material/Container";
import { backend_url } from "../../constants";

export default function RegisterPage({ setStatus }) {
  const navigate = useNavigate();
  const [loadingStatus, setLoadingStatus] = useState(false);
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const validationSchema = Yup.object().shape({
    userName: Yup.string().required(),
    phone: Yup.string()
      .required()
      .matches(phoneRegExp, "Phone number is not valid")
      .min(10, "too short")
      .max(10, "too long"),
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
    console.log(data);
    const loginUser = async () => {
      const url = `${backend_url}/register`;
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
          console.log(res);
          //model('pls login to continue')
          navigate("/");
        });
      } else {
        let jsonData = await rawData.json();
        console.log(jsonData);
        setLoadingStatus(false);
        alert("Some Error Accourred, Please Try Again Later");
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
        alignItems: "center",
        paddingTop: "1em",
      }}
    >
      <div>
        {/* <p>Click on create Account to register as new user</p> */}
        <h2 style={{ margin: "0" }}>REGISTER</h2>
        <div>
          <Card>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.Form}>
              <br />
              <input
                {...register("userName")}
                placeholder="Enter your Name"
                className={styles.input}
              />
              {errors.userName && (
                <span className={styles.errorText}>
                  {" "}
                  {errors.userName.message}{" "}
                </span>
              )}
              <br />
              <input
                {...register("phone")}
                placeholder="Enter your Mobile Number"
                className={styles.input}
              />
              {errors.phone && (
                <span className={styles.errorText}>
                  {" "}
                  {errors.phone.message}{" "}
                </span>
              )}
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
                <input
                  type="submit"
                  value="REGISTER"
                  className={styles.input}
                />
              ) : (
                <CircularProgress disableShrink />
              )}
              <br />

              <div className="text-center">
                <button
                  className={styles.secondaryFormbutton}
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Already have an Account! LOGIN
                </button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </Container>
  );
}
