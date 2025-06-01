import { useState } from "react";

export default function ApiTest() {
  const [message, setMessage] = useState("");

  const callApi = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/ping", {
        method: "GET",
        credentials: "include", // only needed if you're using cookies/session
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };

  return (
    <div>
      <button onClick={callApi}>Test API Connection</button>
      <p>{message}</p>
    </div>
  );
}
