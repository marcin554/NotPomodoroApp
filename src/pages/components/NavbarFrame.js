import React from 'react'
import styles from './NavbarFrame.module.css'
import CloseIcon from '@mui/icons-material/Close';
import MinimizeIcon from '@mui/icons-material/Minimize';
import { closeApp } from '../../utils/utils';


const NavbarFrame = () => {
  return (
    <div className={styles.container}>
        
        <div className={styles.flexItem}>
            <button><MinimizeIcon fontSize='large'></MinimizeIcon></button>
        </div>
        <div className={styles.flexItem}>
            <button onClick={() => closeApp()}><CloseIcon fontSize='large'></CloseIcon></button>
        </div>
        
    </div>
  )
}

export default NavbarFrame
