import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";
import BreachesTable from "../BreachesTable";
import Breach from "../../../models/breach";
import useFetch from "../../../utils/useFetch";

const BreachesForm = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [breaches, setBreaches] = useState<Breach[] | null>([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!isValidEmail(email) || !isEmptyEmail(email)) {
      setErrorMessage("Please enter a valid email address");
      return;
    }
    // Make network request to server endpoint and handle response
    try {
      const response = await axios.get("http://localhost:5000/breaches", {
        params: {
          email,
        },
      });
    } catch (error) {
      console.log(error);
      setErrorMessage("Error retrieving breaches");
    }
  };

  const { data } = useFetch<Breach[]>({ email });
  useEffect(() => {
    setBreaches(data);
  }, [data]);
  const isValidEmail = (email: string): boolean => {
    // Email validation logic here
    return true;
  };

  const isEmptyEmail = (email: string): boolean => {
    return email.length === 0;
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={handleInputChange}
        placeholder="Enter your email address"
      />
      <button type="submit">Submit</button>
      {errorMessage && <p>{errorMessage}</p>}
      {breaches && <BreachesTable breaches={breaches} />}
    </form>
  );
};

export default BreachesForm;
