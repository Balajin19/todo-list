import { Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { Form } from "./components/Form";
import "./App.css";
import { useState } from "react";

function App() {
  const [clicked, setClicked] = useState("all");
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date();
  let mm = date.getMonth();

  let dd = date.getDate();

  let yy = date.getFullYear();
  const time = date.toLocaleTimeString();

  if (dd < 10) {
    dd = "0" + dd;
  }

  let ymd = `${months[mm]} ${dd},${yy}`;
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home
                ymd={ymd}
                time={time}
                clicked={clicked}
                setClicked={setClicked}
              ></Home>
            </>
          }
        />
        <Route
          path="/form"
          element={
            <Form
              ymd={ymd}
              time={time}
              clicked={clicked}
              setClicked={setClicked}
            />
          }
        />
        {/* <Route path="/star" element={<TodoDetail />}></Route> */}
      </Routes>
    </>
  );
}

export default App;
