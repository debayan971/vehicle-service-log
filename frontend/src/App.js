import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [record, setRecord] = useState({
    vehicleNo: "",
    serviceType: "",
    date: "",
    cost: ""
  });

  const [records, setRecords] = useState([]);
  const [editId, setEditId] = useState(null);

  // GET all records
  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/serviceRecords"
      );

      const data = await response.json();
      setRecords(data);
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  };

  // Handle input
  const handleChange = (e) => {
    setRecord({
      ...record,
      [e.target.name]: e.target.value
    });
  };

  // CREATE + UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !record.vehicleNo ||
      !record.serviceType ||
      !record.date ||
      !record.cost
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      if (editId) {
        // UPDATE
        const response = await fetch(
          `http://localhost:5000/serviceRecords/${editId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(record)
          }
        );

        const updatedRecord = await response.json();

        setRecords(
          records.map((item) =>
            item._id === editId ? updatedRecord : item
          )
        );

        setEditId(null);
      } else {
        // CREATE
        const response = await fetch(
          "http://localhost:5000/serviceRecords",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(record)
          }
        );

        const newRecord = await response.json();

        setRecords([...records, newRecord]);
      }

      clearForm();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Edit
  const handleEdit = (item) => {
    setRecord({
      vehicleNo: item.vehicleNo,
      serviceType: item.serviceType,
      date: item.date.slice(0, 10),
      cost: item.cost
    });

    setEditId(item._id);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // Delete
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this service record?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await fetch(
        `http://localhost:5000/serviceRecords/${id}`,
        {
          method: "DELETE"
        }
      );

      setRecords(
        records.filter((item) => item._id !== id)
      );
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  // Clear form
  const clearForm = () => {
    setRecord({
      vehicleNo: "",
      serviceType: "",
      date: "",
      cost: ""
    });

    setEditId(null);
  };

  return (
    <div className="app">

      {/* HEADER */}
      <header className="header">
        <div>
          <h1>🚗 Vehicle Service Log</h1>
          <p>Manage your vehicle service records easily</p>
        </div>

        <div className="record-count">
          <span>{records.length}</span>
          <small>Total Records</small>
        </div>
      </header>


      {/* MAIN */}
      <main className="main-container">

        {/* FORM CARD */}
        <section className="form-card">

          <div className="section-title">
            <div>
              <h2>
                {editId
                  ? "✏️ Update Service Record"
                  : "➕ Add Service Record"}
              </h2>

              <p>
                {editId
                  ? "Update the selected service information"
                  : "Enter vehicle service details below"}
              </p>
            </div>
          </div>


          <form onSubmit={handleSubmit}>

            <div className="form-grid">

              {/* Vehicle Number */}
              <div className="input-group">
                <label>Vehicle Number</label>

                <input
                  type="text"
                  name="vehicleNo"
                  placeholder="Example: WB12AB1234"
                  value={record.vehicleNo}
                  onChange={handleChange}
                />
              </div>


              {/* Service Type */}
              <div className="input-group">
                <label>Service Type</label>

                <input
                  type="text"
                  name="serviceType"
                  placeholder="Example: Oil Change"
                  value={record.serviceType}
                  onChange={handleChange}
                />
              </div>


              {/* Date */}
              <div className="input-group">
                <label>Service Date</label>

                <input
                  type="date"
                  name="date"
                  value={record.date}
                  onChange={handleChange}
                />
              </div>


              {/* Cost */}
              <div className="input-group">
                <label>Service Cost</label>

                <input
                  type="number"
                  name="cost"
                  placeholder="Example: 1500"
                  value={record.cost}
                  onChange={handleChange}
                />
              </div>

            </div>


            <div className="form-buttons">

              <button
                type="submit"
                className="primary-btn"
              >
                {editId
                  ? "Update Record"
                  : "Add Record"}
              </button>

              {editId && (
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={clearForm}
                >
                  Cancel
                </button>
              )}

            </div>

          </form>
        </section>


        {/* RECORDS */}
        <section className="records-card">

          <div className="section-title">
            <div>
              <h2>📋 All Service Records</h2>
              <p>View and manage all vehicle service history</p>
            </div>

            <span className="badge">
              {records.length} Records
            </span>
          </div>


          {records.length === 0 ? (

            <div className="empty-state">
              <div className="empty-icon">🚘</div>

              <h3>No Service Records</h3>

              <p>
                Add your first vehicle service record
                using the form above.
              </p>
            </div>

          ) : (

            <div className="table-wrapper">

              <table>

                <thead>
                  <tr>
                    <th>#</th>
                    <th>Vehicle Number</th>
                    <th>Service Type</th>
                    <th>Date</th>
                    <th>Cost</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>

                  {records.map((item, index) => (

                    <tr key={item._id}>

                      <td>{index + 1}</td>

                      <td>
                        <strong>
                          {item.vehicleNo}
                        </strong>
                      </td>

                      <td>
                        <span className="service-badge">
                          {item.serviceType}
                        </span>
                      </td>

                      <td>
                        {new Date(
                          item.date
                        ).toLocaleDateString("en-IN")}
                      </td>

                      <td className="cost">
                        ₹{item.cost}
                      </td>

                      <td>

                        <div className="action-buttons">

                          <button
                            className="edit-btn"
                            onClick={() =>
                              handleEdit(item)
                            }
                          >
                            Edit
                          </button>

                          <button
                            className="delete-btn"
                            onClick={() =>
                              handleDelete(item._id)
                            }
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </section>

      </main>


      {/* FOOTER */}
      <footer>
        <p>
          Vehicle Service Log • MERN Stack Project
        </p>
      </footer>

    </div>
  );
}

export default App;