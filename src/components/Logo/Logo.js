import React from 'react';

import thinkopenLogo from '../../assets/images/Logo_thinkopen.png';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={thinkopenLogo} alt="MyLogo" />
    </div>
);

export default logo;