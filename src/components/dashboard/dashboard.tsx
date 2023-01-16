import React, { FC, Fragment, useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Ticket from "./ticket/ticket.tsx";
import styles from "./dashboard.module.scss";
import add from "../../assets/icons/add.png";
import env from "../../env.json";
import { useNavigate } from "react-router-dom";

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = () => {
  let [create, createTicket] = useState(false);
  const [ticketData, setTicketData] = useState({});
  const [allTicket, setAllTicket] = useState([]);
  const [update, setUpdate] = useState(false);
  const [allUser, setAllUser] = useState(["unassigned"]);
  const history = useNavigate();
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("user"))?.token || null;
    if (!token) {
      history("/login");
    }
    const id = JSON.parse(localStorage.getItem("user"))?.user_data?.user._id;
    fetch(env.Basurl + "/get_ticket", {
      method: "POST",
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    })
      .then((d) => d.json())
      .then((d) => {
        console.log(d);
        setAllTicket([...(d.tickets || ["unassigned"])]);
      });
    fetch(env.Basurl + "/get_user_by_department", {
      method: "get",
      headers: {
        token: token,
      },
    })
      .then((d) => d.json())
      .then((d) => {
        const { response } = d;
        const department = JSON.parse(localStorage.getItem("user"))?.user_data
          ?.user?.department;
        console.log(response, "response");
        const users = response.filter((item) => item._id == department);
        const usersData = users[0].data.filter((item) => item.role == "user");
        console.log(users, usersData);
        setAllUser(usersData);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [update]);
  const logout = () => {
    localStorage.clear();
    history("/login");
  };
  const ticketCreateFunction = (e) => {
    e.preventDefault();
    const department = JSON.parse(localStorage.getItem("user"))?.user_data?.user
      ?.department;
    const role = JSON.parse(localStorage.getItem("user"))?.user_data?.user
      ?.role;
    const id = JSON.parse(localStorage.getItem("user"))?.user_data?.user?._id;
    const reportername = JSON.parse(localStorage.getItem("user"))?.user_data
      ?.user?.name;
    console.log(reportername, department, role, id);
    ticketData.department = department;
    ticketData.role = role;
    ticketData.reporter_id = id;
    ticketData.reporter = reportername;
    ticketData.start_date = Date.now();
    ticketData.assignee_id = ticketData.assignee_id
      ? ticketData.assignee_id
      : "";
    ticketData.assignee = ticketData.assignee
      ? ticketData.assignee
      : "unassigned";
    const token = JSON.parse(localStorage.getItem("user"))?.token || null;
    fetch(env.Basurl + "/create_ticket", {
      method: "POST",
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...ticketData }),
    })
      .then((d) => d.json())
      .catch((e) => {
        console.log(e);
      });
    createTicket(false);
  };
  const rerender = () => {
    setUpdate(!update);
  };
  console.log(
    ticketData,
    JSON.parse(localStorage.getItem("user"))?.user_data?.user?.role,
    create
  );
  return (
    <Fragment>
      <div className={styles.head}>TICKETS</div>
      <div className={styles.midSec}>
        <div className={styles.left}>
          {JSON.parse(localStorage.getItem("user"))?.user_data?.user?.role ===
          "user" ? null : (
            <>
              <img
                src={add}
                className={styles.create}
                alt=""
                onClick={() => createTicket((create = true))}
              />
              <span className={styles.createTicketText}>Create Ticket</span>
            </>
          )}
        </div>

        <div className={styles.logout}>
          <button onClick={() => logout()}>Logout </button>
        </div>
      </div>
      <div className={styles.ticketContainer}>
        {allTicket.map((item) => {
          return <Ticket {...{ i: item, u: rerender }}></Ticket>;
        })}
      </div>
      {create == true ? (
        <div className={styles.container}>
          <div className={styles.cardContainer}>
            <div className={styles.cardInnerContainer}>
              <div className={styles.cardTitle}>
                <h2>Ticket</h2>
              </div>
              <form action="">
                <span>Title</span>
                <input
                  type="text"
                  className={styles.title}
                  name="title"
                  onClick={(e) =>
                    setTicketData((s) => ({ ...s, title: e.target.value }))
                  }
                />
                <span>Description</span>
                <input
                  type="text"
                  className={styles.desc}
                  name="description"
                  onClick={(e) =>
                    setTicketData((s) => ({
                      ...s,
                      description: e.target.value,
                    }))
                  }
                />
                <div className={styles.dropdownContainer}>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="success"
                      id="dropdown-basic"
                      className={styles.dropdown}
                    >
                      {ticketData?.priority || "medium"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={(e) => {
                          e.preventDefault();
                          setTicketData((s) => ({ ...s, priority: "low" }));
                        }}
                      >
                        Low
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={(e) => {
                          e.preventDefault();
                          setTicketData((s) => ({ ...s, priority: "medium" }));
                        }}
                      >
                        Medium
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={(e) => {
                          e.preventDefault();
                          setTicketData((s) => ({ ...s, priority: "high" }));
                        }}
                      >
                        High
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="success"
                      id="dropdown-basic"
                      className={styles.dropdown}
                    >
                      {/* {item?.name || "UnAssigned"} */}
                      {ticketData?.assignee || "unassigned"}
                    </Dropdown.Toggle>
                    {allUser.map((item) => {
                      return (
                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={(e) => {
                              e.preventDefault();
                              setTicketData((s) => ({
                                ...s,
                                assignee: item?.name,
                                id: item?.id,
                              }));
                            }}
                          >
                            {item?.name}
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      );
                    })}
                  </Dropdown>
                </div>
                <Dropdown>
                  <Dropdown.Toggle
                    variant="success"
                    id="dropdown-basic"
                    className={styles.dropdownProgress}
                  >
                    {ticketData.progress || "Progress"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={(e) => {
                        e.preventDefault();
                        setTicketData((s) => ({ ...s, progress: "complete" }));
                      }}
                    >
                      Complete
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={(e) => {
                        e.preventDefault();
                        setTicketData((s) => ({
                          ...s,
                          progress: "incomplete",
                        }));
                      }}
                    >
                      Incomplete
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <span>Due Date</span>
                <input
                  type="date"
                  className={styles.endDate}
                  onClick={(e) => {
                    setTicketData((s) => ({ ...s, end_date: e.timeStamp }));
                    console.log(e);
                  }}
                  name="endDate"
                />
                <div className={styles.action}>
                  <button
                    className={styles.create}
                    onClick={(e) => ticketCreateFunction(e)}
                  >
                    Create
                  </button>
                  <button
                    className={styles.cancel}
                    onClick={() => createTicket((create = false))}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

export default Dashboard;
