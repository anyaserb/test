import "./Get.scss";
import Card from "./Card";
import preloader from "../assets/Preloader.svg";

const Get = (props) => {
  return (
    <section id="get-section" className="get-section">
      <h2>Working with GET request</h2>
      {props.isLoading && (
        <img className="spinner" src={preloader} alt="Loading..." />
      )}
      {!props.isLoading && (
        <div className="get-content">
          <div className="users-container">
            {props.dataGet.users &&
              props.dataGet.users
                .sort(
                  (a, b) => b.registration_timestamp - a.registration_timestamp
                )
                .map((user) => <Card Card key={user.id} user={user} />)}
          </div>
          {props.counter <= props.dataGet.total_users && (
            <button onClick={props.showMoreButton}>Show more</button>
          )}
        </div>
      )}
    </section>
  );
};

export default Get;
