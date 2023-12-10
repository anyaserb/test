import "./App.scss";
import Nav from "./components/Nav";
import Banner from "./components/Banner";
import Get from "./components/Get";
import Post from "./components/Post";
import { useEffect, useState } from "react";

function App() {
  const [dataGet, setDataGet] = useState({});
  const [counter, setCounter] = useState(6);
  const [maxId, setMaxId] = useState(6);
  const [postExecuted, setPostExecuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const showMoreButton = async () => {
    if (dataGet.total_users > counter) {
      setCounter((prev) => prev + 6);
    }
  };

  const handlePostData = () => {
    setPostExecuted((prev) => !prev);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=${counter}`
        );
        const data = await response.json();
        setDataGet(data);

        if (data.users.length > 0) {
          setMaxId(
            data.users.reduce((max, user) => (user.id > max ? user.id : max), 0)
          );
        }

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        setIsLoading(false);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, [counter, postExecuted]);

  return (
    <>
      <Nav />
      <Banner />
      <Get
        dataGet={dataGet}
        counter={counter}
        showMoreButton={showMoreButton}
        isLoading={isLoading}
      />
      <Post maxId={maxId} onPostData={handlePostData} counter={counter} />
    </>
  );
}

export default App;
