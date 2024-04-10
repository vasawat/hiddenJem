import "./App.css";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

function App() {
  const [name, setName] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const getData = async () => {
    const response = await fetch("https://hiddenjem-backend.onrender.com/getName");
    const data = await response.json();
    setName(data);
  };
  // eslint-disable-next-line
  const editData = async (dataname) => {
    const response = await fetch(`https://hiddenjem-backend.onrender.com/editName`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: dataname }),
    });
    const data = await response.json();
    if(data.name){
      setName(data.name)
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h3>name : {name}</h3>
          <form
            onSubmit={handleSubmit((data) => {
              editData(data.name);
            })}
          >
            {errors.name && (
              <p style={{ color: "red" }}>This field is required</p>
            )}
            <label>EditName</label>
            <input {...register("name", { required: true })} />
            <input type="submit" />
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
