import { FaTrash, FaTrashRestore } from "react-icons/fa";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
export const TodoDetail = ({ display, editTodo, add, starredIcon, deleteIcon }) => {
  return (
    <>
      <div className="todo-detail">
        <header className="header">
          <button onClick={add}>Add todo</button>
          <h4
            style={{
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            Welcome
            <span
              style={{
                color: "rgb(99, 223, 245)",
                fontSize: 16,
              }}
            >
              "BALAJI"
            </span>
          </h4>
        </header>
        {display && (
          <>
            <section className="section-card">
              <div className="section-card-title">
                <div className="todo-title">
                  <h3>{display?.title}</h3>
                  <p>
                    {display?.date},{display?.time}
                  </p>
                </div>
                <div className="icons">
                  <button
                    disabled={display?.delete === true ? true : false}
                    onClick={(e) => editTodo(display?.id)}
                  >
                    <MdEdit size={23} />
                  </button>
                  <button
                    disabled={display?.delete === true ? true : false}
                    onClick={(e) => {
                      starredIcon(display);
                    }}
                  >
                    {display?.starred === true ? (
                      <AiFillStar size={22} />
                    ) : (
                      <AiOutlineStar size={22} />
                    )}
                  </button>
                  <button
                    onClick={(e) => {
                      deleteIcon(display);
                    }}
                  >
                    {display?.delete === true ? (
                      <FaTrashRestore size={20} />
                    ) : (
                      <FaTrash size={20} />
                    )}
                  </button>
                </div>
              </div>
              <p>{display?.context}</p>
            </section>
          </>
        )}
      </div>
      {/* </div> */}
    </>
  );
};
