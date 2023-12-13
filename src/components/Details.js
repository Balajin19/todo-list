import { TodoDetail } from "./TodoDetail";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaTrashRestore } from "react-icons/fa";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
export const Details = ({
  clicked,
  setClicked,
  starred,
  deleted,
  setStarred,
  setDeleted,
  display,
  setDisplay,
}) => {
  const navigate = useNavigate();
  const [reload, setReload] = useState(false);
  const [array, setArray] = useState(
    clicked === "all"
      ? JSON.parse(localStorage.getItem("todo"))
      : clicked === "star"
      ? starred
      : deleted
  );

  useEffect(() => {
    const starredArray = array?.filter((item) => {
      if (item.starred === true) {
        return item;
      }
    });
    setStarred(starredArray);

    const deletedArray = array?.filter((item) => {
      if (item.delete === true) {
        return item;
      }
    });

    setDeleted(deletedArray);
  }, [clicked, display, reload]);

  useEffect(() => {
    setArray(
      clicked === "all"
        ? JSON.parse(localStorage.getItem("todo"))
        : clicked === "star"
        ? starred
        : deleted
    );
  }, [clicked, display]);

  const view = (item) => {
    if (clicked === "star" && item.starred === false) {
      setDisplay();
    } else if (clicked === "delete" && item.delete === false) {
      setDisplay();
    } else {
      setDisplay(item);
    }
  };

  const starredIcon = (item) => {
    var star = JSON.parse(localStorage.getItem("todo"))?.map((val) => {
      if (val.id === item.id) {
        val.starred = !item.starred;
      }
      return val;
    });
    item.starred = !item.starred;
    localStorage.setItem("todo", JSON.stringify(star));
    setStarred(
      JSON.parse(localStorage.getItem("todo")).filter(
        (data) => data.starred === true
      )
    );
    if (clicked === "star") {
      setDisplay(
        JSON.parse(localStorage.getItem("todo")).filter(
          (data) => data.starred === true
        )
      );
    }
    setArray(star);
  };

  const deleteIcon = (item) => {
    const deletedList = JSON.parse(localStorage.getItem("todo"))?.map((val) => {
      if (val.id === item.id) {
        val.delete = !item.delete;
        val.starred = false;
      }
      return val;
    });
    item.starred = false;
    item.delete = !item.delete;
    setReload(!reload);
    localStorage.setItem("todo", JSON.stringify(deletedList));
    setDeleted(
      JSON.parse(localStorage.getItem("todo")).filter(
        (data) => data.delete === true
      )
    );
    setStarred(
      JSON.parse(localStorage.getItem("todo")).filter(
        (data) => data.starred === true
      )
    );
    if (clicked === "delete") {
      setDisplay(
        JSON.parse(localStorage.getItem("todo")).filter(
          (data) => data.delete === true
        )
      );
    }
    setArray(deletedList);
  };

  const editTodo = (id) => {
    console.log(id, "id");
    const editData = array?.filter((item) => {
      if (item.id === id) {
        localStorage.setItem("index", id - 1);
        navigate("/form");
      }
    });
  };

  const add = () => {
    localStorage.removeItem("index");
    navigate("/form");
  };

  const filterTitle = (e) => {
    if (e.target.value === "") {
      {
        clicked === "all"
          ? setArray(JSON.parse(localStorage.getItem("todo")))
          : clicked === "star"
          ? setArray(starred)
          : setArray(deleted);
      }
    } else {
      const filtered = array?.filter((data) =>
        data.title.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setArray(filtered);
    }
  };
  return (
    <div className="list-container">
      <div className="todo-heading">
        <input
          className="search-bar"
          type="text"
          placeholder="Search by title"
          onChange={(e) => filterTitle(e)}
        ></input>
        <h3>
          {clicked === "all"
            ? "All Notes"
            : clicked === "star"
            ? "Starred"
            : "Deleted"}
        </h3>
        <div className="todo-list">
          {clicked === "all" && array.length === 0 ? (
            <h3>All notes Empty!!!</h3>
          ) : clicked === "star" && array.length === 0 ? (
            <h3>Starred notes Empty!!!</h3>
          ) : clicked === "delete" && array.length === 0 ? (
            <h3>Deleted notes Empty!!!</h3>
          ) : (
            ""
          )}
          <ul>
            {array?.map((values, index) => {
              return (
                <div
                  key={index}
                  className={values.id === display?.id ? "active" : "list"}
                  onClick={(e) => {
                    view(values);
                  }}
                >
                  <div className="list-heading">
                    <li className="li">
                      <h5>{values.title}</h5>

                      {values.delete === true ? (
                        <h5 className="deleted-list">Deleted </h5>
                      ) : (
                        ""
                      )}
                    </li>

                    <div className="todo-list-icons">
                      <button
                        disabled={values.delete === true ? true : false}
                        onClick={(e) => {
                          starredIcon(values);
                        }}
                      >
                        {values.starred === true ? (
                          <AiFillStar className="fillstar-icon" size={24} />
                        ) : (
                          <AiOutlineStar size={24} />
                        )}
                      </button>
                      <button
                        onClick={(e) => {
                          deleteIcon(values);
                        }}
                      >
                        {values.delete === true ? (
                          <FaTrashRestore size={20} />
                        ) : (
                          <FaTrash size={20} />
                        )}
                      </button>
                    </div>
                  </div>
                  {values.context}
                </div>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="todo-detail">
        <TodoDetail
          display={display}
          setDisplay={setDisplay}
          clicked={clicked}
          setClicked={setClicked}
          editTodo={editTodo}
          add={add}
          array={array}
          starredIcon={starredIcon}
          starred={starred}
          deleted={deleted}
          deleteIcon={deleteIcon}
          view={view}
        />
      </div>
    </div>
  );
};
