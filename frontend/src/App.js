import logo_i from './assets/blockI_logo.png';
import logo_nsf from './assets/nsf_logo.png';

import './App.css';
import { Switch, Route, Link } from "react-router-dom";
import {
  AppBar,
  Button,
  Toolbar,
  IconButton,
  Typography,
  Tabs,
  Tab,
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import React from 'react';
import Home from "./components/Home";
import Background from "./components/Background";
import ITEEMStructure from './components/ITEEMStructure';
import ITEEMSimulation from './components/ITEEMSimulation';
import AboutUs from './components/AboutUs';
import { createTheme, ThemeProvider} from '@material-ui/core/styles';


const customTheme = createTheme({
  typography: {
    fontFamily: [
      'Encode Sans SC',
    ].join(','),
  },
});




const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
  demo2: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  padding: {
    fontSize: 23
  }
}));

const StyledTabs = withStyles({
  flexGrow: 1,
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > span': {
      maxWidth: 40,
      width: '100%',
      backgroundColor: 'grey',
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    color: '#fff',
    font: 'Encode Sans SC',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(16),
    '&:focus': {
      opacity: 1,
    },
  },
}))((props) => <Tab disableRipple {...props} />);

function App() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue);
  };

  return (
    <div className="App">
      <div className={classes.root}>
        <AppBar position="static" style={{background: '#13294b'}}>
          <Toolbar>
            {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" to='/' component={Link}>
              
            </IconButton> */}
            <div className={classes.demo2}>
              <IconButton edge="start" className={classes.menuButton} onClick={(event, newValue) => { setValue(0) }} color="inherit" aria-label="menu" to='/' component={Link}>
                <img src={logo_i} alt='Logo' height='60'/>
              </IconButton>
              <IconButton edge="start" className={classes.menuButton} onClick={(event, newValue) => { setValue(0) }} color="inherit" aria-label="menu" to='/' component={Link}>
                <img src={logo_nsf} alt='Logo' height='60'/>
              </IconButton>
              <ThemeProvider theme={customTheme}>
                <div style={{flexGrow: 1, marginRight: 140}}>
                  <Typography className={classes.padding}>Nsf Infews Project</Typography>
                </div>
                <StyledTabs value={value} onChange={handleChange} aria-label="styled tabs navbar">
                  <StyledTab label="Home" to='/home' component={Link}/>
                  <StyledTab label="Background" to='/background' component={Link}/>
                  <StyledTab label="ITEEM Structure" to='/iteemstructure' component={Link}/>
                  <StyledTab label="ITEEM Simulation" to='/iteemsimulation' component={Link}/>
                  <StyledTab label="About Us" to='/aboutus' component={Link}/>
                </StyledTabs>
              </ThemeProvider>
            </div>
            {/* <Button color="inherit" onClick={(event, newValue) => { setValue("login") }} component={Link} to="/user">Login</Button> */}
          </Toolbar>
        </AppBar>
      </div>
      <div>
        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route path="/background" component={Background} />
          <Route path="/iteemstructure" component={ITEEMStructure} />
          <Route path="/iteemsimulation" component={ITEEMSimulation} />
          <Route path="/aboutus" component={AboutUs} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
