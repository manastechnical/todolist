import { Box, Grid, makeStyles, Paper, TextField, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import { indigo, grey, green } from '@material-ui/core/colors';
import React, { useState } from 'react';
import DoneOutlineRoundedIcon from '@material-ui/icons/DoneOutlineRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';

const useStyles = makeStyles((theme) => ({
    container: {
        maxWidth: "1140px",
        margin: "24px auto",
        padding: theme.spacing(2),
    },
    formContainer: {
        padding: theme.spacing(3)
    },
    heading: {
        textAlign: "center",
        color: indigo[500],
        marginBottom: theme.spacing(4)
    },
    secondColumn: {
        margin: theme.spacing(4, 0, 4, 0),
    },
    listContainer: {
        backgroundColor: "white",
        padding: theme.spacing(2),
        marginBottom: theme.spacing(3),
        minHeight: "300px",
        height: "auto",
        borderRadius:"8px",
    },
    listContainerTitle: {
        color: indigo[500],
        paddingLeft: theme.spacing(2),
    },
    remainingTaskAvatar: {
        backgroundColor: indigo[500],
        color: "color",
    },
    emptyMsg: {
        textAlign: "center",
        color: grey[400],
        marginTop: theme.spacing(3)
    },
    completeTaskAvatar:{
        backgroundColor: green[500],
        color: "color",
    }
}))

export default function FormComponent() {
    const classes = useStyles();
    const [inputData, setInputData] = useState("");
    const [inputError, setInputError] = useState("");
    const [remainingTaskList, setRemainingTaskList] = useState([]);
    const [completedTaskList, setCompletedTaskList] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted");
        if (inputData.length > 4 && inputData !== "") {
            const tasklist = {
                id: Math.random(),
                title: inputData
            }

            const list = [...remainingTaskList];
            list.push(tasklist);

            setRemainingTaskList(list);
            setInputData("");
        }
    }

    const handleOnChange = ({ target }) => {
        target.value.length < 5 ? setInputError("Task must at least have 5 characters") : setInputError("");
        setInputData(target.value);
    }

    const handleCheck = (id) => {
        const initial = [...remainingTaskList];
        const initialCompleteTask = [...completedTaskList];
        const currentTime = getCurrentTime(new Date());
        const index = initial.findIndex((item) => item.id === id);
        remainingTaskList[index].currentTime = currentTime;
        initialCompleteTask.push(remainingTaskList[index]);
        setCompletedTaskList(initialCompleteTask);
        const updated = initial.filter((item) => item.id !== id);
        setRemainingTaskList(updated);
    }

    const handleDelete = (id) => {
        const initial = [...remainingTaskList];
        const updated = initial.filter((item) => item.id !== id);
        setRemainingTaskList(updated);
    }

    const getCurrentTime = (date) => {
        let hrs = date.getHours();
        let mins = date.getMinutes();
        let ampm = hrs >= 12 ? "pm" : "am";
        // formating time 
        hrs = hrs % 12;
        hrs = hrs ? hrs : 12;
        mins = mins < 10 ? "0" + mins : mins;
        let curTime = hrs + ":" + mins +" "+ ampm; 
        return curTime;
    }

    return (
        <Box className={classes.container}>
            <Grid container>
                <Grid item xs={12}>
                    <Paper elevation={3}>
                        <form onSubmit={handleSubmit} className={classes.formContainer}>
                            <Typography variant="h5" color="primary" className={classes.heading}>
                                React TO-DO List App
                            </Typography>
                            <Grid container justifyContent='center'>
                                <Grid item xs={8}>
                                    <TextField id='inputTaskField' label='Please Enter Your Task' variant='outlined' fullWidth={true} size='small' value={inputData} onChange={handleOnChange} error={inputError ? true : false} helperText={inputError}
                                    />
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Grid container className={classes.secondColumn} spacing={2}>
                        <Grid item xs={12} sm={6} lg={6}>
                            <Paper elevation={3}>
                            <List className={classes.listContainer} dense={true}>
                                <Typography className={classes.listContainerTitle} variant="h4">Remaining Tasks</Typography>
                                {remainingTaskList.length > 0 ? remainingTaskList.map((item, i) =>
                                    <ListItem key={i}>
                                        <ListItemAvatar>
                                            <Avatar className={classes.remainingTaskAvatar}>
                                                {item.title[0]}
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={item.title} />
                                        <ListItemSecondaryAction>
                                            <IconButton onClick={() => handleCheck(item.id)}>
                                                <DoneOutlineRoundedIcon style={{ color: '#1fd655' }} />
                                            </IconButton>
                                            <IconButton onClick={() => handleDelete(item.id)}>
                                                <DeleteRoundedIcon style={{ color: 'red' }} />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>) : (<Typography className={classes.emptyMsg}>No Tasks Added Yet!</Typography>)
                                }
                            </List>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} lg={6}>
                                <Paper elevation={3}>
                            <List className={classes.listContainer} dense={true}>
                                <Typography className={classes.listContainerTitle} variant="h4">Completed Tasks</Typography>
                                {completedTaskList.length > 0 ? completedTaskList.map((item, i) =>
                                    <ListItem key={i}>
                                        <ListItemAvatar>
                                            <Avatar className={classes.completeTaskAvatar}>
                                                {item.title[0]}
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={item.title} secondary={item.currentTime}/>
                                    </ListItem>) : (<Typography className={classes.emptyMsg}>No Tasks Completed Yet!</Typography>)
                                }
                            </List>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box >
    );
}
