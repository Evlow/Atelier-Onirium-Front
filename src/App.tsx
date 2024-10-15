 import { CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { useAtelierContext } from "./App/Context/context";
import { useEffect, useState } from "react";
import agent from "./App/Api/agent";
import { getCookie } from "./App/Api/util";

function App() {
  const {setBasket} = useAtelierContext();
  const [loading, setLoading] =useState(true);

  useEffect(() =>{
  const buyerId = getCookie('buyerId');
if (buyerId) {
  agent.Basket.get()
    .then(basket => setBasket(basket))
    .catch(error => console.error(error)) 
    .finally(() => setLoading(false));
  } else{
    setLoading(false)
  }
}, [setBasket] )


  return (
    <>
    <ToastContainer position="bottom-right" hideProgressBar theme="colored" ></ToastContainer>
      {/* <CssBaseline /> */}
      <Outlet />
    </>
  );
}

export default App;
