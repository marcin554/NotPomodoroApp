import React, { useEffect, useState } from 'react'
import styles from './Settings.module.css'
import { getSettings, getGoals, getProjects, _setNewProject, _setNewGoal, createSettings } from '../../utils/utils';
import { Avatar, Box, Button, Collapse, Divider, InputLabel, List, ListItem, ListItemAvatar, ListItemText, Menu, MenuItem, Select, TextField } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BarChartIcon from '@mui/icons-material/BarChart';
import FlagIcon from '@mui/icons-material/Flag';
import FolderIcon from '@mui/icons-material/Folder';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import TuneIcon from '@mui/icons-material/Tune';
import { useDispatch } from 'react-redux';
import { setMessage } from '../../slices/applicationSlice';







const Settings = () => {

    const [isToggled, setToggle] = useState(false);
    const [importSettings, setImportSettings] = useState();
    const [importGoals, setImportGoals] = useState();
    const [importProjects, setImportProjects] = useState();

    const dispatch = useDispatch();


    const toggle = () => setToggle(!isToggled);

    useEffect(() => {
        getSettings().then((tempSettings) => {
            setImportSettings(tempSettings);
          

        })
    }, [])

    useEffect(() => {
        getGoals().then((tempGoals) => {
            setImportGoals(tempGoals);
            
           
        })
    }, [])

    useEffect(() => {
        getProjects().then((tempProjects) => {
            setImportProjects(tempProjects);
    
     
        })
    }, [])




    async function addProject(projectName) {


        let project = {
            projectName: projectName,
            timeSpendTotal: 0,
            timeSpendThisWeek: 0,
        }


        await _setNewProject(project)

    }

    async function addGoal(goalName, timeGoal) {
        let goal = {
            goalName: goalName,
            timeGoal: timeGoal,
            timeSpendTotal: 0,
            timeSpendThisWeek: 0,
        }

   
        await _setNewGoal(goal)
    
    }


    async function changeSettings(project, changeWhat) {

        // createSettings();
        let tempSettings = await getSettings();
        let settings = tempSettings;




        console.log(settings)


        if (changeWhat === 'project') {
            settings.defaultProject.projectName = project;
            settings.defaultProject.workingOn = true;


        }
        else if (changeWhat === 'goal') {
            settings.defaultGoal.goalName = project;
            settings.defaultGoal.workingOn = true;

        }
        else if (changeWhat === 'timer') {
            settings.defaultTimerType = project;
        }
        else if (changeWhat === 'pomodoroTimerDuration') {
            settings.defaultPomodoroTimerDuration = project;
        }







        await window.electronAPI.store.updateSettings(settings);
 


    }

    const style = {
        width: '100%',
        bgcolor: '#f2f2f2;',
        color: 'black',

    };

  
    return (
        <>
        
            {importSettings ?
                <div className={styles.container}>

                

                    <div>
                        <List sx={style} component="nav" aria-label="mailbox folders" className="rounded table-auto ">
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <FolderIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Current Project: " secondary={importSettings.defaultProject ? importSettings.defaultProject.projectName : "None"}></ListItemText>
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <FlagIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Current Goal: " secondary={importSettings.defaultGoal ? importSettings.defaultGoal.goalName : "None"}></ListItemText>
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <AccessTimeIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Default Timer Type: " secondary={importSettings.defaultTimerType}></ListItemText>
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <TuneIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Default Pomodoro Time" secondary={importSettings.defaultPomodoroTimerDuration + " min"} ></ListItemText>

                            </ListItem>
                            <ListItem button={true}>
                                <ListItemText primary="Change Settings" style={{ textAlign: "center" }} onClick={() => { toggle() }}></ListItemText>

                            </ListItem>

                            
  <Collapse in={isToggled} >

                                <Box>
                                
                                    <ListItem secondaryAction={<Button variant="outlined" edge="end" onClick={() => {
                                        addProject(document.getElementById('ProjectName').value)
                                    }}> Create Project</Button>}>
                                        <TextField variant="filled" required label="Project name" id="ProjectName"></TextField>

                                    </ListItem>
                                    <Divider />

                                    <ListItem secondaryAction={
                                        <Button variant="outlined" onClick={() => {
                                            addGoal(document.getElementById('GoalName').value, document.getElementById('TimeGoal').value)
                                        }}> Create Goal </Button>
                                    }>
                                       <TextField variant="filled" required label="Goal name" id="GoalName"></TextField>
                                        <TextField variant="filled" required type="number" label="Time Goal" id="TimeGoal"></TextField>


                                    </ListItem>
                                    <Divider />
                                    {importProjects[0] ?
                                    <ListItem secondaryAction={<Button variant="outlined" onClick={() => {
                                        changeSettings(document.getElementById('projects').innerText, 'project')
                                        dispatch(setMessage('Project changed.'))
                                    }
                                    }
                                    >Change Project</Button>}>
                                 
                                        <TextField select helperText="Pick the project you want to run." defaultValue={importProjects[0].project.projectName} id="projects" label="Select Project" >
                                
                                            {importProjects.map((project) => {
                                                return <MenuItem key={project.project.projectName} value={project.project.projectName}>{project.project.projectName}</MenuItem>
                                            })}
                                        </TextField>

                                    </ListItem>
                                    : null}
                                    <Divider />
                                    {importGoals[0] ?
                                    <ListItem secondaryAction={
                                        <Button variant="outlined" onClick={() => {
                                            changeSettings(document.getElementById('goals').innerText, 'goal')
                                            dispatch(setMessage('Goal changed.'))
                                        }
                                        }
                                        >Change Goal</Button>
                                    }>
                                        
                                        <TextField select helperText="Pick the goal you want to run." id="goals" defaultValue={importGoals[0].goal.goalName} label="Select Goal" >

                                            {importGoals.map((goals) => {
                                                return <MenuItem key={goals.goal.goalName} value={goals.goal.goalName}>{goals.goal.goalName}</MenuItem>
                                            })}
                                        </TextField>
                                     

                                    </ListItem>
                                       : <></>}
                                    <Divider />
                                    <ListItem secondaryAction={
                                        <Button variant="outlined" onClick={() => {
                                            changeSettings(document.getElementById('timers').innerText, 'timer')
                                            dispatch(setMessage('Type changed.'))
                                        }
                                        }
                                        >Change Timer</Button>
                                    }>

                                        <TextField id="timers" select helperText="Select new default timer." defaultValue="normalTimer" label="Select Timer" >


                                            <MenuItem value="pomodoro">pomodoro</MenuItem>
                                            <MenuItem value="normalTimer">normalTimer</MenuItem>
                                        </TextField>





                                    </ListItem>
                                    <Divider />
                                    <ListItem secondaryAction={
                                        <Button variant="outlined" onClick={() => {
                                            changeSettings(document.getElementById('pomodoroTimerDuration').value, 'pomodoroTimerDuration')
                                            dispatch(setMessage('Time changed.'))
                                        }
                                        }
                                        >Change Pomodoro Time</Button>
                                    }>
                                        <TextField id="pomodoroTimerDuration" type="number" helperText="Select new default timer." defaultValue="25" label="Pomodoro Time" >



                                        </TextField>




                                    </ListItem>





                                </Box>
                                </Collapse>
                            
                            
                        </List>
                    </div>


                </div>

                : <div>loading</div>
            }

        </>
    )

}

export default Settings
