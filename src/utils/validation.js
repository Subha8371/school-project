export const validateStudentForm = (formData, existingEmails, getEdit = null) => {
  const newErrors = {};

  // Trim all fields in formData to remove starting and ending spaces
  const trimmedData = {
    id: formData.id,
    name: formData.name.trim(),
    age: formData.age,
    phone: formData.phone.trim(),
    standard: formData.standard.trim(),
    sec: formData.sec.trim(),
    email: formData.email.trim(),
  };

  // Validate ID: Must be a positive integer
  if (!trimmedData.id || trimmedData.id <= 0) {
    newErrors.id = "ID must be a positive number";
  }

  // Validate Name: Should only contain letters and not be empty
  const namePattern = /^[A-Za-z\s]+$/; // Only letters and spaces allowed
  if (!trimmedData.name) {
    newErrors.name = "Name is required";
  } else if (!namePattern.test(trimmedData.name)) {
    newErrors.name = "Name must contain only letters";
  }

  // Validate Age: Must be between 5 and 100
  if (!trimmedData.age || trimmedData.age < 5 || trimmedData.age > 100) {
    newErrors.age = "Age must be between 5 and 100";
  }

  // Validate Phone: Must be a valid phone number (e.g., 10-digit number)
  const phonePattern = /^[0-9]{10}$/;
  if (!trimmedData.phone || !phonePattern.test(trimmedData.phone)) {
    newErrors.phone = "Phone number must be a valid 10-digit number";
  }

  // Validate Standard: Should not be empty
  if (!trimmedData.standard) {
    newErrors.standard = "Standard is required";
  }

  // Validate Section: Should not be empty
  if (!trimmedData.sec) {
    newErrors.sec = "Section is required";
  }

  // Validate Email: Should be a valid email format
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!trimmedData.email || !emailPattern.test(trimmedData.email)) {
    newErrors.email = "Invalid email format";
  }

  // Check for duplicate email if:
  // - It's a new entry (getEdit is null) OR
  // - It's an edit, but the email has been changed from the original
  if (
    (!getEdit && existingEmails.includes(trimmedData.email)) ||
    (getEdit && getEdit.email !== trimmedData.email && existingEmails.includes(trimmedData.email))
  ) {
    newErrors.email = "This email is already in use";
  }

  return newErrors;
};
