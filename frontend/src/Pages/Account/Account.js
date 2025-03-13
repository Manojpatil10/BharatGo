import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Account.module.css";
import Navbar from "../../Components/Navbar/Navbar";
import axios from "axios";

const Account = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("JWT");

  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    if (!token) {
      alert("User not authenticated. Please log in again.");
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:8080/api/account", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { ID: token },
      })
      .then((success) => {
        const { name, DOB, gender } = success.data;
        setFullName(name || "");
        setDob(DOB || "");
        setGender(gender || "");
      })
      .catch((error) => {
        console.error("Error fetching account details:", error);
      });
  }, [token, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!username) {
      alert("User not authenticated. Please log in again.");
      return;
    }

    const userData = {
      ID: token,
      fullName,
      dob,
      gender,
    };

    axios
      .post("http://localhost:8080/api/account", userData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((success) => {
        alert("Account details saved successfully!");
      })
      .catch((error) => {
        console.error("Error saving details:", error);
        alert("An error occurred. Please try again.");
      });
  };

  return (
    <>
      <Navbar />
      <div className={styles.Wrapper}>
        <div className={styles.Title}>
          <span className={styles.TitleUpdate}>My Account</span>
        </div>
        <form className={styles.Form} onSubmit={handleSubmit}>
          <div className={styles.ProfileImage}>
            <img
              src="/Images/stylish-man-flat-vector-profile-picture-ai-generated_606187-309.avif"
              alt="profile"
            />
          </div>

          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <label>Date of Birth</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />

          <label>Gender</label>
          <div className={styles.GenderOptions}>
            <label className="mt-0">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={gender === "Male"}
                onChange={(e) => setGender(e.target.value)}
              />
              Male
            </label>
            <label className="mt-0">
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={gender === "Female"}
                onChange={(e) => setGender(e.target.value)}
              />
              Female
            </label>
            <label className="mt-0">
              <input
                type="radio"
                name="gender"
                value="Other"
                checked={gender === "Other"}
                onChange={(e) => setGender(e.target.value)}
              />
              Other
            </label>
          </div>

          <button className={styles.UpdateButton} type="submit">
            Save Details
          </button>
        </form>
      </div>
    </>
  );
};

export default Account;
