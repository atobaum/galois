import { useState } from "react";

export default function useForm(initState = {}, onSubmit) {
  const [state, setState] = useState(initState);
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(state);
    setState(initState);
  };
  return { formValues: state, handleChange, handleSubmit };
}
