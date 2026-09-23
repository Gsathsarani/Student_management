import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  // Student information
  const [formData, setFormData] = useState({
    name: "",
    emisNo: "",
    registrationNo: "",
    rollNo: "",
    section: "",
    email: "",
    dateOfBirth: "",

    // Parent information
    motherName: "",
    motherContact: "",
    motherProfession: "",

    fatherName: "",
    fatherContact: "",
    fatherProfession: "",

    // Account information
    username: "",
    password: "",
    confirmPassword: "",

    // Student status
    status: "Active"
  });

  const [photo, setPhoto] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  // Handle input changes
  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

  };

  // Handle photo upload
  const handlePhotoChange = (e) => {

    const file = e.target.files[0];

    if (!file) {
      return;
    }

    // Maximum 5 MB
    if (file.size > 5 * 1024 * 1024) {

      setError("Photo size must be less than 5 MB.");

      return;
    }

    setError("");

    const reader = new FileReader();

    reader.onloadend = () => {
      setPhoto(reader.result);
    };

    reader.readAsDataURL(file);
  };

  // Submit registration
  const handleSubmit = (e) => {

    e.preventDefault();

    setError("");
    setSuccess("");

    // Required fields
    if (
      !formData.name ||
      !formData.emisNo ||
      !formData.registrationNo ||
      !formData.rollNo ||
      !formData.section ||
      !formData.email ||
      !formData.dateOfBirth ||
      !formData.username ||
      !formData.password ||
      !formData.confirmPassword
    ) {

      setError("Please fill in all required fields.");

      return;
    }

    // Password validation
    if (formData.password.length < 8) {

      setError(
        "Password must contain at least 8 characters."
      );

      return;
    }

    // Password confirmation
    if (
      formData.password !==
      formData.confirmPassword
    ) {

      setError("Passwords do not match.");

      return;
    }

    // Get existing users
    const existingUsers =
      JSON.parse(
        localStorage.getItem("users")
      ) || [];

    // Check username
    const usernameExists =
      existingUsers.some(
        user =>
          user.username.toLowerCase() ===
          formData.username.toLowerCase()
      );

    if (usernameExists) {

      setError(
        "This username is already registered."
      );

      return;
    }

    // Check registration number
    const registrationExists =
      existingUsers.some(
        user =>
          user.registrationNo ===
          formData.registrationNo
      );

    if (registrationExists) {

      setError(
        "This registration number is already registered."
      );

      return;
    }

    // Create new student
    const newStudent = {

      id: Date.now(),

      name: formData.name,

      emisNo: formData.emisNo,

      registrationNo:
        formData.registrationNo,

      rollNo: formData.rollNo,

      section: formData.section,

      email: formData.email,

      dateOfBirth:
        formData.dateOfBirth,

      photo: photo,

      motherName:
        formData.motherName,

      motherContact:
        formData.motherContact,

      motherProfession:
        formData.motherProfession,

      fatherName:
        formData.fatherName,

      fatherContact:
        formData.fatherContact,

      fatherProfession:
        formData.fatherProfession,

      username:
        formData.username,

      password:
        formData.password,

      status:
        formData.status
    };

    // Add new student to existing users
    existingUsers.push(newStudent);

    // Save to localStorage
    localStorage.setItem(
      "users",
      JSON.stringify(existingUsers)
    );

    setSuccess(
      "Student registered successfully!"
    );

    // Redirect to sign in after 1.5 seconds
    setTimeout(() => {

      navigate("/signin");

    }, 1500);
  };

  return (

    <div className="page-container">

      <div className="register-card">

        {/* Header */}
        <div className="page-header">

          <h1>ADD STUDENT</h1>

          <p>
            Register a new student into the system
          </p>

        </div>


        <form onSubmit={handleSubmit}>

          {/* Error */}
          {error && (

            <div className="error-message">
              {error}
            </div>

          )}


          {/* Success */}
          {success && (

            <div className="success-message">
              {success}
            </div>

          )}


          {/* ======================================
              STUDENT + PARENT DETAILS
          ======================================= */}

          <div className="form-layout">


            {/* LEFT SIDE */}
            <div className="left-column">

              {/* Student Details */}
              <section className="form-section">

                <h2>Student Details</h2>

                <div className="section-line"></div>


                {/* Name + Photo */}
                <div className="student-top">

                  <div className="form-group name-field">

                    <label>
                      Name <span>*</span>
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter student's full name"
                    />

                  </div>


                  {/* Photo */}
                  <div className="photo-upload">

                    <label
                      htmlFor="photo"
                      className="photo-box"
                    >

                      {photo ? (

                        <img
                          src={photo}
                          alt="Student preview"
                        />

                      ) : (

                        <div className="photo-placeholder">

                          <div className="plus-icon">
                            +
                          </div>

                          <span>
                            Upload Profile Photo
                          </span>

                        </div>

                      )}

                    </label>

                    <input
                      id="photo"
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                    />

                    <small>
                      Maximum 5 MB
                    </small>

                  </div>

                </div>


                {/* Registration */}
                <div className="form-row">

                  <div className="form-group">

                    <label>
                      Index No. <span>*</span>
                    </label>

                    <input
                      type="text"
                      name="indexNo"
                      value={formData.indexNo}
                      onChange={handleChange}
                      placeholder="Index number"
                    />

                  </div>


                  <div className="form-group">

                    <label>
                      Select Course <span>*</span>
                    </label>

                    <select
                      name="courseName"
                      value={formData.courseName}
                      onChange={handleChange}
                    >

                      <option value="">
                        Select course
                      </option>

                      <option value="Course A">
                        Course A
                      </option>

                      <option value="Course B">
                        Course B
                      </option>

                      <option value="Course C">
                        Course C
                      </option>

                    </select>

                  </div>

                </div>


                {/* Roll + Section */}
                <div className="form-row">

                  <div className="form-group">

                    <label>
                      Roll No. <span>*</span>
                    </label>

                    <input
                      type="text"
                      name="rollNo"
                      value={formData.rollNo}
                      onChange={handleChange}
                      placeholder="Roll number"
                    />

                  </div>


                  <div className="form-group">

                    <label>
                      Gender <span>*</span>
                    </label>

                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                    >

                      <option value="">
                        Select gender
                      </option>

                      <option value="Male">
                        Male
                      </option>

                      <option value="Female">
                        Female
                      </option>

                      <option value="Option 3">
                        Option 3
                      </option>

                    </select>

                  </div>

                </div>


                {/* Email + DOB */}
                <div className="form-row">

                  <div className="form-group">

                    <label>
                      Email <span>*</span>
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="student@example.com"
                    />

                  </div>


                  <div className="form-group">

                    <label>
                      Date of Birth <span>*</span>
                    </label>

                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                    />

                  </div>

                </div>

              </section>


              </div>


            {/* RIGHT SIDE */}
            <div className="right-column">

              {/* Parent Details */}
              <section className="form-section">

                <h2>Parents Details</h2>

                <div className="section-line"></div>


                {/* Mother */}
                <div className="form-group">

                  <label>
                    Mother's Name
                  </label>

                  <input
                    type="text"
                    name="motherName"
                    value={formData.motherName}
                    onChange={handleChange}
                    placeholder="Enter mother's name"
                  />

                </div>


                <div className="form-row">

                  <div className="form-group">

                    <label>
                      Mother's Contact
                    </label>

                    <input
                      type="tel"
                      name="motherContact"
                      value={formData.motherContact}
                      onChange={handleChange}
                      placeholder="Contact number"
                    />

                  </div>


                  <div className="form-group">

                    <label>
                      Mother's Profession
                    </label>

                    <input
                      type="text"
                      name="motherProfession"
                      value={formData.motherProfession}
                      onChange={handleChange}
                      placeholder="Profession"
                    />

                  </div>

                </div>


                {/* Father */}
                <div className="form-group">

                  <label>
                    Father's Name
                  </label>

                  <input
                    type="text"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleChange}
                    placeholder="Enter father's name"
                  />

                </div>


                <div className="form-row">

                  <div className="form-group">

                    <label>
                      Father's Contact
                    </label>

                    <input
                      type="tel"
                      name="fatherContact"
                      value={formData.fatherContact}
                      onChange={handleChange}
                      placeholder="Contact number"
                    />

                  </div>


                  <div className="form-group">

                    <label>
                      Father's Profession
                    </label>

                    <input
                      type="text"
                      name="fatherProfession"
                      value={formData.fatherProfession}
                      onChange={handleChange}
                      placeholder="Profession"
                    />

                  </div>

                </div>

              </section>

            </div>

          </div>


          {/* ======================================
              ACCOUNT DETAILS
          ======================================= */}

          <section className="account-section">

            <h2>Account Details</h2>

            <div className="section-line"></div>


            <div className="form-row">

              <div className="form-group">

                <label>
                  Username <span>*</span>
                </label>

                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Create a username"
                />

              </div>


              <div className="form-group">

                <label>
                  Password <span>*</span>
                </label>

                <div className="password-input-wrap">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Minimum 8 characters"
                    className="password-input"
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword((prev) => !prev)
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M3 3.5L20.5 21l-1.4 1.4L15.8 20A12.9 12.9 0 0 1 12 21c-4.7 0-8.7-2.7-11-6.6a15.8 15.8 0 0 1 3.1-4.1L3 3.5zm8.4 9.4l2.9 2.9a3 3 0 0 1-2.9-2.9zm-1.3-1.3L6 7.9A10.5 10.5 0 0 0 1 12c2.3 3.9 6.3 6.6 11 6.6 2.1 0 4-.5 5.7-1.5l-3.5-3.5A3 3 0 0 1 10.1 11.6zm8.6-4.7A13 13 0 0 1 23 12c-2.3 3.9-6.3 6.6-11 6.6a10.8 10.8 0 0 1-4.9-1.2l2.4-2.4A3 3 0 0 0 15 12c0-.7-.2-1.4-.5-2l3.5-3.5zm-5.6-3.3A7.7 7.7 0 0 1 12 6c4.7 0 8.7 2.7 11 6.6-.7 1.1-1.6 2.2-2.6 3.1l-1.2-1.2A10.1 10.1 0 0 0 20.4 12c-1.7-2.6-4.1-4.2-7.1-4.9l-2.6-2.6z" fill="currentColor"/>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 5C6.5 5 1.9 8.8 0 12c1.9 3.2 6.5 7 12 7s10.1-3.8 12-7c-1.9-3.2-6.5-7-12-7zm0 11.5A4.5 4.5 0 1 1 12 7a4.5 4.5 0 0 1 0 9.5zm0-2A2.5 2.5 0 1 0 12 9a2.5 2.5 0 0 0 0 5.5z" fill="currentColor"/>
                      </svg>
                    )}
                  </button>
                </div>

              </div>

            </div>


            <div className="form-group">

              <label>
                Confirm Password <span>*</span>
              </label>

              <div className="password-input-wrap">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className="password-input"
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowConfirmPassword((prev) => !prev)
                  }
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                >
                  {showConfirmPassword ? (
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M3 3.5L20.5 21l-1.4 1.4L15.8 20A12.9 12.9 0 0 1 12 21c-4.7 0-8.7-2.7-11-6.6a15.8 15.8 0 0 1 3.1-4.1L3 3.5zm8.4 9.4l2.9 2.9a3 3 0 0 1-2.9-2.9zm-1.3-1.3L6 7.9A10.5 10.5 0 0 0 1 12c2.3 3.9 6.3 6.6 11 6.6 2.1 0 4-.5 5.7-1.5l-3.5-3.5A3 3 0 0 1 10.1 11.6zm8.6-4.7A13 13 0 0 1 23 12c-2.3 3.9-6.3 6.6-11 6.6a10.8 10.8 0 0 1-4.9-1.2l2.4-2.4A3 3 0 0 0 15 12c0-.7-.2-1.4-.5-2l3.5-3.5zm-5.6-3.3A7.7 7.7 0 0 1 12 6c4.7 0 8.7 2.7 11 6.6-.7 1.1-1.6 2.2-2.6 3.1l-1.2-1.2A10.1 10.1 0 0 0 20.4 12c-1.7-2.6-4.1-4.2-7.1-4.9l-2.6-2.6z" fill="currentColor"/>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 5C6.5 5 1.9 8.8 0 12c1.9 3.2 6.5 7 12 7s10.1-3.8 12-7c-1.9-3.2-6.5-7-12-7zm0 11.5A4.5 4.5 0 1 1 12 7a4.5 4.5 0 0 1 0 9.5zm0-2A2.5 2.5 0 1 0 12 9a2.5 2.5 0 0 0 0 5.5z" fill="currentColor"/>
                    </svg>
                  )}
                </button>
              </div>

            </div>

          </section>


          {/* ======================================
              BUTTONS
          ======================================= */}

          <div className="form-actions">

            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate("/signin")}
            >
              Cancel
            </button>


            <button
              type="submit"
              className="submit-button"
            >
              Register Student
            </button>

          </div>


          <p className="login-link">

            Already registered?

            {" "}

            <Link to="/signin">
              Sign In
            </Link>

          </p>

        </form>

      </div>

    </div>
  );
}

export default Register;