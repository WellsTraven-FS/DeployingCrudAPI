import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../App.css";

function Dashboard() {
    const [students, setStudents] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [values, setValues] = useState({
        name: "",
        class: "",
    });

    const API_BASE =
        process.env.NODE_ENV === "development"
            ? "http://localhost:8000/api/v1"
            : process.env.REACT_APP_BASE_URL;
    let ignore = false;
    useEffect(() => {
        if (!ignore) {
            getStudents();
        }
        return () => {
            ignore = true;
        };
    }, []);
    const getStudents = async () => {
        try {
            await fetch(`${API_BASE}/students`)
                .then((res) => res.json())
                .then((data) => {
                    console.log({ data });
                    setStudents(data);
                });
        } catch (error) {
            setError(error.message || "Unexpected Error");
        } finally {
            setLoading(false);
        }
    };
    const createStudent = async () => {
        try {
            await fetch(`${API_BASE}/students`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })
                .then((res) => res.json())
                .then(() => getStudents());
        } catch (error) {
            setError(error.message || "Unexpected Error");
        } finally {
            setLoading(false);
        }
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        createStudent();
    };

    const handleInputChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            [event.target.name]: event.target.value,
        }));
    };
    return (
        <div className="App">
            <header className="App-header">
                <h1>Student</h1>
                <Link to="/">Home</Link>
                <ul>
                    {students &&
                        students.map((student) => (
                            <li key={student._id}>
                                <Link to={`/students/${student._id}`}>
                                    {student.name}
                                </Link>
                            </li>
                        ))}
                </ul>
                <form onSubmit={(event) => handleSubmit(event)}>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={values.name}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Class:
                        <input
                            type="text"
                            name="class"
                            value={values.class}
                            onChange={handleInputChange}
                        />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </header>
        </div>
    );
}

export default Dashboard;
