import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Form = ({ ymd, time, clicked, setClicked }) => {
  const [title, setTitle] = useState(
    localStorage.getItem("index") !== null
      ? JSON.parse(localStorage.getItem("todo"))[localStorage.getItem("index")]
          .title
      : ""
  );
  const [context, setContext] = useState(
    localStorage.getItem("index") !== null
      ? JSON.parse(localStorage.getItem("todo"))[localStorage.getItem("index")]
          .context
      : ""
  );
  const [array, setArray] = useState(
    localStorage.getItem("todo") !== null
      ? JSON.parse(localStorage.getItem("todo"))
      : []
  );

  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();

    if (localStorage.getItem("index") === null) {
      const details = [
        ...array,
        {
          id: array.length + 1,
          title,
          context,
          date: ymd,
          time,
          starred: false,
          delete: false,
        },
      ];
      setArray(details);
      localStorage.setItem("todo", JSON.stringify(details));
      navigate("/");
    } else {
      const list = [...array];
      const deletedArr = list.splice(localStorage.getItem("index"), 1, {
        id: JSON.parse(localStorage.getItem("todo"))[
          localStorage.getItem("index")
        ]?.id,
        title,
        context,
        date: ymd,
        time: time,
        starred: JSON.parse(localStorage.getItem("todo"))[
          localStorage.getItem("index")
        ]?.starred,
        delete: JSON.parse(localStorage.getItem("todo"))[
          localStorage.getItem("index")
        ]?.delete,
      });
      setArray(list);
      localStorage.setItem("todo", JSON.stringify(list));
      navigate("/");
      setClicked("all");
    }
  };

  const goback = () => {
    navigate("/");
  };

  return (
    <div className="form">
      <div className="form-container">
        <div className="form-heading">
          <div>
            <h4>
              {localStorage.getItem("index") === null
                ? "Add Note"
                : "Edit Note"}
            </h4>
          </div>
        </div>
        <form onSubmit={submitForm}>
          <table>
            <tbody>
              <tr className="table-heading">
                <th>
                  <label htmlFor="title">
                    Title<span style={{ color: "red" }}>*</span>
                  </label>
                </th>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                    id="title"
                    required
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  ></input>
                </td>
              </tr>

              <tr className="table-heading">
                <th>
                  <label htmlFor="des">
                    Context<span style={{ color: "red" }}>*</span>
                  </label>
                </th>
              </tr>
              <tr>
                <td>
                  <textarea
                    type="text"
                    id="des"
                    className="context-field"
                    required
                    rows={7}
                    cols={65}
                    value={context}
                    onChange={(e) => {
                      setContext(e.target.value);
                    }}
                  ></textarea>
                </td>
              </tr>
            </tbody>
          </table>
          <button onClick={goback}>Cancel</button>
          <button type="submit" className="submit-btn">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};
