import Layout from "../../components/Layout";
import Sidebar from "../../components/SideNav";
import { FAB } from "../../components/Button";
import PlusIcon from "../../public/icons/plus.svg";
import ChevronDown from "../../public/icons/chevron_down.svg";
import { Popup, useOnClickOutside } from "../../components/Popup";
import Loading from "../../components/Loading";

import styles from "../../styles/pages/manager/home.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

import { useContext, useState, useRef, useEffect } from "react";
import UserContext from "../../components/userContext";
import Select from "react-select";
import axios from "../../config/axios";

const Manager = () => {
  const { user, loading: userLoading } = useContext(UserContext);
  const [popupOpen, setPopupOpen] = useState(false);
  const [pswdPopup, setPswdPopup] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [oompas, setOoompas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [locationNew, setLocationNew] = useState("");
  const [options, setOptions] = useState([
    { value: 'Reception', label: 'Reception' },
    { value: 'Elevator', label: 'Great Glass Elevator' },
    { value: 'Nut Room', label: 'Nut Room' },
    { value: 'Inventing Room', label: 'Inventing Room' },
    { value: 'Testing Room', label: 'Testing Room' },
    { value: 'Chocolate Room', label: 'Chocolate Room' },
    { value: 'Chocolate River', label: 'Chocolate River' },
    { value: 'Storage', label: 'Storage' },
    { value: 'Supply', label: 'Supply' },
  ]);
  const popupRef = useRef();
  const pswdPopupRef = useRef();

  useOnClickOutside(popupRef, () => setPopupOpen(false));
  useOnClickOutside(pswdPopupRef, () => setPswdPopup(false))

  useEffect(async () => {
    if (!userLoading) {
      setLoading(true);
      const res = await axios.get("/oompaloompas");
      console.log(res.data);
      setOoompas(res.data.oompas);
      setLoading(false);
    }
  }, [userLoading, reload]);

  async function onAddLoompa(name, email, password) {
    setAddLoading(true);
    const res = await axios.post("/oompaloompas", {
      name,
      email: email.replaceAll(" ", ""),
      password,
    });
    setAddLoading(false);
    setPopupOpen(false);
    setReload(!reload);
  }

  const NewOompaPopup = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    return (
      <div className={styles["popup"]}>
        <button
          className={styles["close-button"]}
          onClick={() => setPopupOpen(false)}
        >
          <PlusIcon className={styles["close-button__icon"]} />
        </button>
        <h1 className={styles.main__heading} style={{ marginTop: "20px" }}>
          <span>Add Oompa Loompa</span>
        </h1>
        <form
          className={styles["popup__form"]}
          onSubmit={(e) => {
            e.preventDefault();
            onAddLoompa(name, email, password);
          }}
        >
          <input
            className={styles["popup__input"]}
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required={true}
          />
          <div className={styles["popup__form__id-input"]}>
            <input
              className={styles["popup__input"]}
              placeholder="ID"
              required={true}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p>@wonka.fac</p>
          </div>
          <input
            className={styles["popup__input"]}
            placeholder="Password"
            type="password"
            required={true}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className={styles["popup__form__submit-group"]}>
            <button
              className="button-primary"
              type="submit"
              style={{ width: "120px" }}
            >
              {addLoading ? "Adding.." : "Add"}
            </button>
          </div>
        </form>
      </div>
    );
  };

  const ChangePassPopup = ({ id }) => {
    return <div></div>;
  };

  const OompaCard = ({ oompa }) => {
    const { name, email, isManager, _id, location } = oompa;
    const [open, setOpen] = useState(false);
    const [manager, setManager] = useState(isManager);
    const [deleteLoading, setDeleteLoading] = useState(false);
    console.log(location)
    async function updateManagerState() {
      setManager(!manager);
      await axios.put(`/oompaloompas/manager/${_id}`);
    }

    return (
      <div
        className={cx(styles["oompa-card"], {
          [styles["oompa-card--closed"]]: !open,
          [styles["oompa-card--open"]]: open,
        })}
      >
        <div className={styles["oompa-card__closed-container"]}>
          <h2 className={styles["oompa-card__name"]}>{name}</h2>
          <p className={styles["oompa-card__email"]}>{email}</p>
          <div style={{ flexGrow: 1 }}></div>
          <button className="transparent-button" onClick={(e) => {setOpen(!open), console.log(open)}}>
            <ChevronDown
              className={cx(styles["oompa-card__open-button"], {
                [styles["oompa-card__open-button--closed"]]: !open,
                [styles["oompa-card__open-button--open"]]: open,
              })}
            />
          </button>
        </div>
        <div
          className={cx(styles["oompa-card__open-container"], {
            [styles["oompa-card__open-container--visible"]]: open,
          })}
        >
          <div className={styles["oompa-card__stat-container"]}>
            <p>Manager</p>
            <div style={{ flexGrow: 1 }}></div>
            <input
              type="checkbox"
              // checked={checked}
              // onChange={e => onchange(e)}
              checked={manager}
              onChange={updateManagerState}
              className={cx(styles["form__toggle"])}
              // {...otherProps}
            />
          </div>
          <div className={styles["oompa-card__stat-container"]}>
            <p>Assigned To</p>
            <div style={{ flexGrow: 1 }}></div>
    
              <Select options={options} defaultValue={location} placeholder={location} onChange={(e) => {setLocationNew(e.value)
              axios.post("/api/locations/updateuser", {
                oompaId: _id,
                location: e.value
              }).then(value => {
                console.log(value.data)
                setReload(!reload)
              })
              }}/>
          </div>
          <div className={styles["oompa-card__action-btn-container"]}>
            <button className="button-primary" onClick={() => setPswdPopup(true)} style={{ marginLeft: "12px" }}>
              Change Password
            </button>
            <button className="button-primary" style={{ marginLeft: "12px" }}>
              View Tasks
            </button>
            <button
              className="button-red"
              style={{ marginLeft: "12px" }}
              onClick={async () => {
                setDeleteLoading(true);
                await axios.delete(`/oompaloompas/${_id}`);
                setReload(!reload);
                setDeleteLoading(false);
              }}
            >
              {deleteLoading ? "Removing.." : "Remove"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <Sidebar />
      <FAB onClick={() => setPopupOpen(true)}>
        <PlusIcon />
      </FAB>
      <div className={styles.main}>
        <h1 className={styles.main__heading}>
          Welcome, <span>{user.name}</span>
        </h1>
        <h4 className={styles["main__sub-heading"]}>Manage Oompa Loompas</h4>
        {loading ? (
          <div
            style={{
              display: "flex",
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Loading />
          </div>
        ) : (
          <div className={styles["main__card-container"]}>
            {oompas.map((oompa) => {
              if (user._id != oompa._id) {
                return <OompaCard oompa={oompa} />;
              } else {
                return <></>;
              }
            })}
          </div>
        )}
      </div>
      <Popup ref={popupRef} popupState={popupOpen}>
        <NewOompaPopup />
      </Popup>
      <Popup popupState={pswdPopup} ref={pswdPopupRef}>
          <ChangePassPopup  />
        </Popup>
    </Layout>
  );
};

export default Manager;
