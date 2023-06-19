import React, { useState } from "react";
import styles from "./SessionTable.module.css";
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';


const SessionTable = (sessionObject) => {

 
  

  

  
  const originalArray = sessionObject.sessionObject.sessionStore; // Assuming sessionStore is an array
  const reversedArray = [...originalArray].reverse();


  const deleteSession = (timeStart) => {
    window.electronAPI.store.delete(timeStart);
    ('deleted')

    

      window.location.reload();

    
    
    
  }
  return (
    <div className={`${styles.container} shadow-md sm:rounded-lg`}>
      <table className="rounded table-auto ">
        <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 ">
              Type
            </th>
            <th scope="col" className={`${styles.thColor} px-6 py-3`}>
              Duration
            </th>
            <th scope="col" className="px-6 py-3 ">
              Time Start
            </th>
            <th scope="col" className={`${styles.thColor} px-6 py-3`}>
              Time End
            </th>
            <th scope="col" className={styles.thColor + "px-6 py-3 "}>
              Goal Name
            </th>
            <th scope="col" className={`${styles.thColor} px-6 py-3`}>
              Project Name
            </th>
            <th scope="col" className={styles.thColor + "px-6 py-3 "}>
              Delete
            </th>
            
          </tr>
        </thead>

        <tbody>
        
        
          {sessionObject.sessionObject.sessionStore &&
            reversedArray.map((element, index) => (
              <tr
                className="border-b border-gray-200 dark:border-gray-700"
                key={index}
              >
                <td scope="row" className="px-6 py-4 whitespace-nowrap ">
                  {!element.timerType || element.timerType === "normalTimer" ? <QueryBuilderIcon fontSize="large" /> : <HourglassBottomIcon fontSize="large"/>
                  
                  }
                  {" "}
                </td>
                <td className={`${styles.tdColor} px-6 py-4 `}>
                  {element.timeDuration.h} H : {element.timeDuration.m}M :{" "}
                  {element.timeDuration.s}S
                </td>
                <td className="px-6 py-4 ">{element.timeStart}</td>
                <td className={`${styles.tdColor} px-6 py-4 `}>
                  {element.timeEnd}
                </td>
                <td className="px-6 py-4 ">
                  {!element.timerGoalName ? "none" : element.timerGoal}
               
                </td>
                <td className={`${styles.tdColor} px-6 py-4 `}>
                  {!element.timerProjectName ? "No Name" : element.timerProjectName}
                  </td>
                <td className={`${styles.deleteButton} px-6 py-4 `} onClick={() => {deleteSession(element)}}>Delete</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default SessionTable;
