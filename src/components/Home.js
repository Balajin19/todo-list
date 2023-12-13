import { useState } from "react";
import { Details } from "./Details";
export const Home = ({ ymd, time, clicked, setClicked }) => {
  const [starred, setStarred] = useState([]);
  const [deleted, setDeleted] = useState([]);
  const [display, setDisplay] = useState(
    JSON.parse(localStorage.getItem("todo"))
      ? JSON.parse(localStorage.getItem("todo"))[0]
      : ""
  );
  const [array, setArray] = useState(
    clicked === "all"
      ? JSON.parse(localStorage.getItem("todo"))
      : clicked === "star"
      ? starred
      : deleted
  );
  const allCount = JSON.parse(localStorage.getItem("todo"))?.length;
  const starredCount = JSON.parse(localStorage.getItem("todo"))?.filter(
    (data) => data.starred === true
  )?.length;

  const deleteCount = JSON.parse(localStorage.getItem("todo"))?.filter(
    (data) => data.delete === true
  )?.length;

  const list = [
    {
      id: 1,
      title: "Personal Notes",
      context:
        "Some random personal note. This is not so important but still needed.",
      time: time,
      date: ymd,
      starred: false,
      delete: false,
    },
    {
      id: 2,
      title: "Shopping Notes",
      context:
        "This is where I store all my shopping related notes like shop contact details and items to purchase.",
      time: time,
      date: ymd,
      starred: false,
      delete: false,
    },
    {
      id: 3,
      title: "Medical Notes",
      context:
        "This is very important note for all the medications that my family uses. It consists of medicine names, therapists contact details and informatin related to hospitals.",
      time: time,
      date: ymd,
      starred: true,
      delete: false,
    },
    {
      id: 4,
      title: "Friends",
      context:
        "This note consists of all my friends & their family details like birthdays and anniversaries.",
      time: time,
      date: ymd,
      starred: false,
      delete: false,
    },
    {
      id: 5,
      title: "Other",
      context:
        "I use this note to store all other information that are not needed temporarily.",
      time: time,
      date: ymd,
      starred: false,
      delete: true,
    },
  ];

  if (localStorage.getItem("todo") === null) {
    localStorage.setItem("todo", JSON.stringify(list));
    setArray(JSON.parse(localStorage.getItem("todo")));
    setDisplay(JSON.parse(localStorage.getItem("todo"))[0]);
  }
  const starredList = () => {
    setClicked("star");
    setDisplay(starred[0]);
    const star = JSON.parse(localStorage.getItem("todo")).filter((data) => {
      if (data.starred === true) {
        return data;
      }
    });
    setStarred(star);
  };

  const deletedList = () => {
    setClicked("delete");
    setDisplay(deleted[0]);
    const deletedList = JSON.parse(localStorage.getItem("todo")).filter(
      (data) => {
        if (data.delete === true) {
          return data;
        }
      }
    );
    setDeleted(deletedList);
  };

  const allList = () => {
    setClicked("all");
    setDisplay(array[0]);
  };

  return (
    <>
      <div className="container">
        <div className="sidebar">
          <h2>Notes</h2>
          <h4
            onClick={allList}
            className={clicked === "all" ? "sidebar-all" : "sidebar-heading"}
          >
            All ({allCount})
          </h4>
          <h4
            onClick={starredList}
            className={clicked === "star" ? "sidebar-star" : "sidebar-heading"}
          >
            Starred ({starredCount})
          </h4>
          <h4
            onClick={deletedList}
            className={
              clicked === "delete" ? "sidebar-delete" : "sidebar-heading"
            }
          >
            Deleted ({deleteCount})
          </h4>
        </div>
        <div className="todoDetails">
          <Details
            clicked={clicked}
            ymd={ymd}
            time={time}
            setClicked={setClicked}
            starred={starred}
            setStarred={setStarred}
            setDeleted={setDeleted}
            deleted={deleted}
            display={display}
            setDisplay={setDisplay}
            // starredCount1={starredCount1}
          />
        </div>
        {/* </div> */}
        {/* <div className="col-lg-5 col-md-12 bg-success">
            {/* <TodoDetail
              display={display}
              // editTodo={ editTodo }
              starredCount={starredCount}
              deletedCount={deleteCount}
            /> */}
        {/* </div> */}
        {/* //   </div> */}
      </div>
    </>
  );
};
