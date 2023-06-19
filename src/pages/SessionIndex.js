import React, { useEffect } from "react";
import TimerMain from "./components/TimerMain";

import SessionTable from "./components/SessionTable";
import { useDispatch, useSelector } from "react-redux";
import styles from "./SessionIndex.module.css";
import _Container from "./components/Container";
import {getSessions} from "../utils/utils.js";


import { swapList } from "../slices/sessionStoreSlice.js";

const SessionIndex = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let value = await getSessions();
      
        dispatch(swapList(value));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [dispatch]);

  
  const sessionRecords = useSelector((state) => state.sessionStore);



  return (
    <>
      <_Container
        ComponentPage={<SessionTable sessionObject={sessionRecords} />}
      />
    </>
  );
};

export default SessionIndex;
