import React from "react";
import styles from "./SessionTable.module.css";

const SessionTable = (sessionObject) => {
  return (
    <div className={`${styles.container} shadow-md sm:rounded-lg`}>
      <table className="rounded table-auto border border-4 border-indigo-500/100">
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
              Options
            </th>
          </tr>
        </thead>

        <tbody>
          {console.log(sessionObject)}
          {sessionObject.sessionObject.sessionStore &&
            sessionObject.sessionObject.sessionStore.map((element, index) => (
              <tr
                className="border-b border-gray-200 dark:border-gray-700"
                key={index}
              >
                <td scope="row" className="px-6 py-4 whitespace-nowrap ">
                  Timer{" "}
                </td>
                <td className={`${styles.tdColor} px-6 py-4 `}>
                  {element.timeDuration.h} H : {element.timeDuration.m}M :{" "}
                  {element.timeDuration.s}S
                </td>
                <td className="px-6 py-4 ">{element.timeStart}</td>
                <td className={`${styles.tdColor} px-6 py-4 `}>
                  {element.timeEnd}
                </td>
                <td className="px-6 py-4 ">Delete</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default SessionTable;
