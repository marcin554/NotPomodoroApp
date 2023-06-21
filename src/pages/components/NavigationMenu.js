import React from 'react'
import styles from './NavigationMenu.module.css'
import { Link, NavLink } from 'react-router-dom'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BarChartIcon from '@mui/icons-material/BarChart';
import FlagIcon from '@mui/icons-material/Flag';
import FolderIcon from '@mui/icons-material/Folder';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import TuneIcon from '@mui/icons-material/Tune';
import {closeApp} from '../../utils/utils';

const NavigationMenu = () => {
  return (
    <>
      <div className={styles.container}>
      <Link to="/">
        <div className={styles.menuChoice}>
          <AccessTimeIcon fontSize='large'></AccessTimeIcon>  Timer
        </div>
        </Link>
        <Link to="/sessions">
        <div className={styles.menuChoice}>
          <BarChartIcon fontSize='large'></BarChartIcon>  Session
        </div>
        </Link>
        <Link to="/goals">
        <div className={styles.menuChoice}>
          <FlagIcon fontSize='large'></FlagIcon>  Goals
        </div>
        </Link>
        <Link to="/projects">
        <div className={styles.menuChoice}>
         <FolderIcon fontSize='large'></FolderIcon>  Projects
        </div>
        </Link>
        <Link to="/settings">
        <div className={styles.menuChoice}>
          <TuneIcon fontSize='large'></TuneIcon>  Options
        </div>
        </Link>
        <Link to="/sessions">
        <div className={styles.menuChoice} onClick={closeApp}>
          <PowerSettingsNewIcon fontSize='large'></PowerSettingsNewIcon> 
        </div>
        </Link>
      </div>
    </>
  );
}

export default NavigationMenu