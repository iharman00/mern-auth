import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const Root = () => {
  return (
    <>
      <ToastContainer />
      <Header />
      <main className="w-full px-5 md:px-0">
        <Outlet />
      </main>
    </>
  );
};

export default Root;
