import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [students, setStudents] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const [inputs, setInputs] = useState({
    fname: "",
    lname: "",
  });

  const { fname, lname } = inputs;

  const setStateInputs = (f, l) => {
    setInputs({
      fname: f,
      lname: l,
    });
  };

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const fetchStudents = async () => {
    try {
      const studentFetch = await fetch("http://localhost:5000/students");
      const data = await studentFetch.json();

      if (studentFetch.status === 200) {
        setStudents(data);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [refresh]);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <div className="App page-container">
              <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                  <a className="navbar-brand" href="#">
                    Assessment Programming
                  </a>
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                  >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          aria-current="page"
                          href="#"
                        >
                          Home
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">
                          Link
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div>

            <section className="my-5 container">
              <h1>CRUD Operations</h1>
              <h3 className="mt-3">Students</h3>

              <section className="my-4 p-0 container">
                <a className="btn btn-success" href="/add0student"></a>
              </section>

              <div className="table-responsive mb-5">
                <table className="mt-3 table">
                  <thead>
                    <tr>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students &&
                      students.map((student, index) => (
                        <tr key={index}>
                          <td>{student.student_fname}</td>
                          <td>{student.student_lname}</td>
                          <td>{student.student_email}</td>
                          <td></td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </section>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
