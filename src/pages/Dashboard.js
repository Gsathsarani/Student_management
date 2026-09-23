import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  const currentUser =
    JSON.parse(
      localStorage.getItem("currentUser")
    );

  const handleLogout = () => {

    localStorage.removeItem(
      "currentUser"
    );

    navigate("/signin");
  };

  return (

    <div className="dashboard-page">

      <header className="dashboard-header">

        <div>
          <h1>
            Student Dashboard
          </h1>

          <p>
            Welcome back, {currentUser?.name}
          </p>
        </div>


        <button
          className="logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>

      </header>


      <main className="dashboard-content">

        <div className="profile-card">

          <div className="profile-photo">

            {currentUser?.photo ? (

              <img
                src={currentUser.photo}
                alt="Student"
              />

            ) : (

              <span>
                {currentUser?.name
                  ?.charAt(0)
                  ?.toUpperCase()}
              </span>

            )}

          </div>


          <div>

            <h2>
              {currentUser?.name}
            </h2>

            <p>
              Student ID:{" "}
              {currentUser?.registrationNo}
            </p>

          </div>

        </div>


        <div className="dashboard-card">

          <h2>
            Student Information
          </h2>

          <div className="info-grid">

            <div>
              <span>
                EMIS No.
              </span>

              <strong>
                {currentUser?.emisNo}
              </strong>
            </div>


            <div>
              <span>
                Registration No.
              </span>

              <strong>
                {currentUser?.registrationNo}
              </strong>
            </div>


            <div>
              <span>
                Roll No.
              </span>

              <strong>
                {currentUser?.rollNo}
              </strong>
            </div>


            <div>
              <span>
                Section
              </span>

              <strong>
                {currentUser?.section}
              </strong>
            </div>


            <div>
              <span>
                Email
              </span>

              <strong>
                {currentUser?.email}
              </strong>
            </div>


            <div>
              <span>
                Date of Birth
              </span>

              <strong>
                {currentUser?.dateOfBirth}
              </strong>
            </div>


            <div>
              <span>
                Status
              </span>

              <strong
                className="active-status"
              >
                {currentUser?.status}
              </strong>
            </div>

          </div>

        </div>


        <div className="dashboard-card">

          <h2>
            Parent / Guardian Information
          </h2>

          <div className="info-grid">

            <div>
              <span>
                Mother's Name
              </span>

              <strong>
                {currentUser?.motherName || "-"}
              </strong>
            </div>


            <div>
              <span>
                Mother's Contact
              </span>

              <strong>
                {currentUser?.motherContact || "-"}
              </strong>
            </div>


            <div>
              <span>
                Father's Name
              </span>

              <strong>
                {currentUser?.fatherName || "-"}
              </strong>
            </div>


            <div>
              <span>
                Father's Contact
              </span>

              <strong>
                {currentUser?.fatherContact || "-"}
              </strong>
            </div>


            <div>
              <span>
                Guardian's Name
              </span>

              <strong>
                {currentUser?.guardianName || "-"}
              </strong>
            </div>


            <div>
              <span>
                Guardian's Contact
              </span>

              <strong>
                {currentUser?.guardianContact || "-"}
              </strong>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Dashboard;