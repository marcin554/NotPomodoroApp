import React, { useEffect } from "react";
import TimerMain from "./components/TimerMain";

import SessionTable from "./components/SessionTable";
import { useDispatch, useSelector } from "react-redux";
import styles from "./SessionIndex.module.css";
import Container from "./components/Container";

import { swapList } from "../slices/sessionStoreSlice.js";

const SessionIndex = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const value = await window.electronAPI.store.get('sessions');
        dispatch(swapList(value.sessions));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [dispatch]);


  const sessionRecords = useSelector((state) => state.sessionStore);
  // console.log('abc');


  return (
    <>
      <Container
        ComponentPage={<SessionTable sessionObject={sessionRecords} />}
      />
    </>
  );
};

export default SessionIndex;
