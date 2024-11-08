"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { getAdminDetails } from "@/lib/features/api/apiSlice";
import {
  getStudentDetails,
  createStudentDetails,
  deleteDetails,
} from "@/lib/features/api/studentSlice";
import { useEffect, useState } from "react";
import styles from "./admin-dashboard.module.css";
import { useRouter } from "next/navigation";
import { validateStudentForm } from "@/utils/validation"; // Import validation function
import { getEditDetails } from "@/lib/features/api/studentSlice";
import { updateDetails } from "@/lib/features/api/studentSlice";
import Layout from "../../layout"
export const Page = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [getEdit, setGetEdit] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  // State for form inputs and validation errors
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    age: "",
    phone: "",
    standard: "",
    sec: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    id: "",
    name: "",
    age: "",
    phone: "",
    standard: "",
    sec: "",
    email: "",
  });

  useEffect(() => {
    dispatch(getAdminDetails());
    dispatch(getStudentDetails());
  }, [dispatch]);

  useEffect(() => {
    console.log(getEdit, "SSSSSSSSSSSSSS");
    if (getEdit) {
      setFormData({
        id: getEdit.id,
        name: getEdit.name,
        age: getEdit.age,
        email: getEdit.email,
        phone: getEdit.phone,
        standard: getEdit.standard,
        sec: getEdit.sec,
      });
    }
  }, [getEdit]);

  // Fetching student details from Redux state
  const details = useAppSelector((state) => state.stuDetails.items);
  const existingEmails = details.map((student) => student.email); // Extract existing emails from the details

  const toggleModal = () => {
    setFormData({
      id: "",
      name: "",
      age: "",
      phone: "",
      standard: "",
      sec: "",
      email: "",
    });
    setGetEdit(null);
    setIsModalOpen(!isModalOpen);
  };
  // Update formData state on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleStudentData = (e) => {
    e.preventDefault();

    // Validate form data using the imported validation function, passing existingEmails
    const validationErrors = validateStudentForm(
      formData,
      existingEmails,
      getEdit
    );

    // Set the validation errors in the state
    setErrors(validationErrors);

    // Check if there are no errors before submitting
    if (Object.keys(validationErrors).length === 0) {
      const formattedData = {
        ...formData,
        id: parseInt(formData.id, 10),
        age: parseInt(formData.age, 10),
        phone: parseInt(formData.phone, 10), // Ensure phone is a number
      };

      if (getEdit) {
        console.log("CCCCCCCCCCC", formData);
        // Dispatch action to upddate student details to Redux store
        dispatch(updateDetails(formData)).then(() => {
          // Dispatch getStudentDetails after successfully adding the new student
          dispatch(getStudentDetails());
        });
      }
      // Dispatch action to add student details to Redux store
      dispatch(createStudentDetails(formattedData)).then(() => {
        // Dispatch getStudentDetails after successfully adding the new student
        dispatch(getStudentDetails());
      });

      toggleModal(); // Close modal after submission
      router.push("/admin/admin-dashboard");
    }
  };

  const handleEdit = (id) => {
    dispatch(getEditDetails(id))
      .then((response) => {
        setGetEdit(response.payload);
        setIsModalOpen(true);
      })
      .catch((error) => console.log("Error fetching student details:", error));
  };

  const handleDelete = (id) => {
    dispatch(deleteDetails(id)).then(() => {
      dispatch(getStudentDetails());
    });
  };

  return (
 <div className={styles.adminDashboard}>
      <button onClick={toggleModal} className={styles.openModalButton}>
        Add Student Details
      </button>

      {/* Student Details Table */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Class</th>
            <th>Section</th>

            <th>Edit</th>

            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {details.map((detail) => (
            <tr key={detail.id}>
              <td>{detail.id}</td>
              <td>{detail.name}</td>
              <td>{detail.age}</td>
              <td>{detail.email}</td>
              <td>{detail.phone}</td>
              <td>{detail.standard}</td>
              <td>{detail.sec}</td>
              <td>
                <button
                  className={styles["edit-btn"]}
                  onClick={() => handleEdit(detail.id)}
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  className={styles["delete-btn"]}
                  onClick={() => handleDelete(detail.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Enter Student Details</h2>
            <form onSubmit={handleStudentData} className={styles.modalForm}>
              <label>
                ID:
                <input
                  type="number"
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                  required
                />
              </label>
              {errors.id && (
                <div className={styles.error}>
                  <span className={styles.errorIcon}>⚠️</span>
                  {errors.id}
                </div>
              )}
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </label>
              {errors.name && (
                <div className={styles.error}>
                  <span className={styles.errorIcon}>⚠️</span>
                  {errors.name}
                </div>
              )}
              <label>
                Age:
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                />
              </label>
              {errors.age && (
                <div className={styles.error}>
                  <span className={styles.errorIcon}>⚠️</span>
                  {errors.age}
                </div>
              )}
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </label>
              {errors.email && (
                <div className={styles.error}>
                  <span className={styles.errorIcon}>⚠️</span>
                  {errors.email}
                </div>
              )}
              <label>
                Phone Number:
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </label>
              {errors.phone && (
                <div className={styles.error}>
                  <span className={styles.errorIcon}>⚠️</span>
                  {errors.phone}
                </div>
              )}
              <label>
                Standar:
                <select
                  name="standard"
                  value={formData.standard}
                  onChange={handleChange}
                  required
                  className={styles.selectDropdown}
                >
                  <option value="">Select Class</option>
                  {[...Array(8)].map((_, i) => (
                    <option key={i} value={5 + i}>
                      {5 + i}
                    </option>
                  ))}
                </select>
              </label>
              {errors.standard && (
                <div className={styles.error}>
                  <span className={styles.errorIcon}>⚠️</span>
                  {errors.standard}
                </div>
              )}

              <label>
                Section:
                <select
                  name="sec"
                  value={formData.sec}
                  onChange={handleChange}
                  required
                  className={styles.selectDropdown}
                >
                  <option value="">Select Section</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                </select>
              </label>
              {errors.sec && (
                <div className={styles.error}>
                  <span className={styles.errorIcon}>⚠️</span>
                  {errors.sec}
                </div>
              )}

              <div className={styles.modalActions}>
                <button type="submit" className={styles.submitButton}>
                  {getEdit ? "Update" : "Submit"}
                </button>
                <button
                  type="button"
                  onClick={toggleModal}
                  className={styles.closeButton}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
   
  );
};

export default Page;
