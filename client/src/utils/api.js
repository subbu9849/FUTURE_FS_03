const API_URL = import.meta.env.VITE_API_URL;

export const submitContact = async (formData) => {
  const response = await fetch(`${API_URL}/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  return response.json();
};

export const submitBooking = async (bookingData) => {
  const response = await fetch(`${API_URL}/booking`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookingData),
  });

  return response.json();
};