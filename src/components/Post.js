import success from "../assets/success-image.svg";
import preloader from "../assets/Preloader.svg";

import { useEffect, useState, useRef } from "react";

import "./Post.scss";

const Post = (props) => {
  const [token, setToken] = useState("");
  const [positions, setPositions] = useState([]);
  const [selectedPositionId, setSelectedPositionId] = useState(null);
  const [formIsValid, setFormIsValid] = useState(false);

  const [sentForm, setSentForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [nameState, setNameState] = useState({
    value: "",
    isValid: false,
    error: ""
  });

  const [emailState, setEmailState] = useState({
    value: "",
    isValid: false,
    error: ""
  });

  const [phoneState, setPhoneState] = useState({
    value: "",
    isValid: false,
    error: ""
  });

  const [photoState, setPhotoState] = useState({
    value: "",
    isValid: false,
    error: ""
  });

  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const phoneInputRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://frontend-test-assignment-api.abz.agency/api/v1/positions`
        );
        const data = await response.json();
        setPositions(data.positions);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        setIsLoading(false);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();

    const fetchToken = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://frontend-test-assignment-api.abz.agency/api/v1/token"
        );
        const data = await response.json();
        setToken(data.token);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        setIsLoading(false);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
    fetchToken();
  }, []);

  useEffect(() => {
    if (
      nameState.isValid &&
      emailState.isValid &&
      phoneState.isValid &&
      photoState.isValid &&
      selectedPositionId
    ) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [nameState, emailState, phoneState, photoState, selectedPositionId]);

  const submitForm = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPhone = phoneInputRef.current.value;

    if (formIsValid) {
      let formData = new FormData();
      let fileField = document.querySelector('input[type="file"]');

      formData.append("name", enteredName);
      formData.append("position_id", selectedPositionId);
      formData.append("email", enteredEmail);
      formData.append("phone", enteredPhone);
      formData.append("photo", fileField.files[0]);

      const postData = async () => {
        try {
          setIsLoading(true);
          const response = await fetch(
            "https://frontend-test-assignment-api.abz.agency/api/v1/users",
            {
              method: "POST",
              body: formData,
              headers: { Token: token }
            }
          );

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();
          props.onPostData(data);
          setSentForm(true);
          setIsLoading(false);
        } catch (error) {
          console.error(error.message);
        }
      };
      postData();
    }
  };

  const changeNameHandler = () => {
    const enteredName = nameInputRef.current.value.trim();
    const isValid = enteredName.length >= 2 && enteredName.length <= 60;

    setNameState({
      value: enteredName,
      isValid: isValid,
      error: isValid
        ? ""
        : enteredName.trim().length === 0
        ? "The name field is required."
        : enteredName.trim().length > 60
        ? "The name should not exceed 60 characters."
        : "The name must be at least 2 characters."
    });
  };

  const changeEmailHandler = () => {
    const validator = require("validator");
    const enteredEmail = emailInputRef.current.value.trim();
    const isValid = validator.isEmail(enteredEmail);

    setEmailState({
      value: enteredEmail,
      isValid: isValid,
      error: isValid
        ? ""
        : enteredEmail.trim().length === 0
        ? "The email field is required."
        : "The email must be a valid email address."
    });
  };

  const changePhoneHandler = () => {
    const validator = require("validator");
    const enteredPhone = phoneInputRef.current.value;
    const isValid = validator.isMobilePhone(enteredPhone, "uk-UA");

    setPhoneState({
      value: enteredPhone,
      isValid: isValid,
      error: isValid
        ? ""
        : enteredPhone.trim().length === 0
        ? "The phone field is required."
        : "The phone number must be a valid ukrainian phone number."
    });
  };

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    const maxSizeInBytes = 5 * 1024 * 1024;
    const allowedTypes = ["image/jpeg", "image/jpg"];

    const reader = new FileReader();
    reader.onload = function (e) {
      const img = new Image();
      img.onload = function () {
        const width = img.width;
        const height = img.height;

        const isValid =
          width >= 70 &&
          height >= 70 &&
          file.size < maxSizeInBytes &&
          allowedTypes.includes(file.type);

        setPhotoState({
          value: file,
          isValid: isValid,
          error: isValid
            ? ""
            : width <= 70 || height <= 70
            ? "Minimum size of photo 70x70px."
            : file.size > maxSizeInBytes
            ? "The photo may not be greater than 5 Mbytes."
            : "The photo format must be jpeg/jpg type."
        });
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const changePositionHandler = (event) => {
    const positionId = event.target.getAttribute("id");
    setSelectedPositionId(positionId);
  };

  return (
    <section id="post-section" className="post-section">
      {!sentForm && (
        <form className="post-form" onSubmit={submitForm}>
          <h2>Working with POST request</h2>
          {isLoading && (
            <img className="spinner" src={preloader} alt="Loading..." />
          )}
          {!isLoading && (
            <div className="post-container">
              <div className="post-inputs">
                <div className="input-container">
                  <input
                    type="text"
                    ref={nameInputRef}
                    required="required"
                    onChange={changeNameHandler}
                    className={
                      !nameState.isValid && nameState.error
                        ? "error-input"
                        : undefined
                    }
                  />
                  <span
                    className={
                      !nameState.isValid && nameState.error
                        ? "error-span"
                        : undefined
                    }
                  >
                    Your name
                  </span>
                  {nameState.error && (
                    <div className="error-message">{nameState.error}</div>
                  )}
                </div>
                <div className="input-container">
                  <input
                    type="text"
                    ref={emailInputRef}
                    required="required"
                    onChange={changeEmailHandler}
                    className={
                      !emailState.isValid && emailState.error
                        ? "error-input"
                        : undefined
                    }
                  />
                  <span
                    className={
                      !emailState.isValid && emailState.error
                        ? "error-span"
                        : undefined
                    }
                  >
                    Email
                  </span>
                  {emailState.error && (
                    <div className="error-message">{emailState.error}</div>
                  )}
                </div>
                <div className="input-container">
                  <input
                    type="text"
                    ref={phoneInputRef}
                    required="required"
                    onChange={changePhoneHandler}
                    className={
                      !phoneState.isValid && phoneState.error
                        ? "error-input"
                        : undefined
                    }
                  />
                  <span
                    className={
                      !phoneState.isValid && phoneState.error
                        ? "error-span"
                        : undefined
                    }
                  >
                    Phone
                  </span>
                  <div
                    className={
                      !phoneState.isValid && phoneState.error
                        ? "error-message"
                        : "helper"
                    }
                  >
                    {phoneState.error
                      ? phoneState.error
                      : "+38 (XXX) XXX - XX - XX"}
                  </div>
                </div>
              </div>
              <div className="post-position">
                <legend>Select your position</legend>
                {positions.map((item, index) => (
                  <div key={index}>
                    <input
                      placeholder={item.name}
                      type="radio"
                      name="position"
                      id={item.id}
                      value={item.name}
                      onChange={changePositionHandler}
                    />
                    <label htmlFor={item.id}>{item.name}</label>
                  </div>
                ))}
              </div>
              <div className="post-photo">
                <label
                  htmlFor="fileInput"
                  className={
                    !photoState.isValid && photoState.error
                      ? "error-label"
                      : undefined
                  }
                >
                  Upload
                </label>
                <input
                  type="file"
                  id="fileInput"
                  accept="image/*"
                  onChange={changePhotoHandler}
                />
                {photoState.value ? (
                  <div
                    className={
                      !photoState.isValid && photoState.error
                        ? "error-input"
                        : undefined
                    }
                  >{`${photoState.value.name}`}</div>
                ) : (
                  <div
                    className={
                      !photoState.isValid && photoState.error
                        ? "error-message"
                        : undefined
                    }
                  >
                    Upload your photo
                  </div>
                )}
              </div>
              <div
                className={
                  !photoState.isValid && photoState.error
                    ? "error-message"
                    : undefined
                }
              >
                {photoState.error}
              </div>
              <button disabled={!formIsValid}>Sign up</button>
            </div>
          )}
        </form>
      )}
      {sentForm && !isLoading && (
        <div className="post-registered">
          <h2>User successfully registered</h2>
          <img src={success} alt="Loading..." />
        </div>
      )}
    </section>
  );
};

export default Post;
