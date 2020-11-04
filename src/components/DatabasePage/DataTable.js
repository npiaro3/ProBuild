import React, { useEffect, useState } from 'react';
import { listEmployees as ListEmployees, listSkills as ListSkills } from '../../graphql/queries'
import { createEmployee as CreateEmployee, createSkill as CreateSkill, createEmployeeSkills as CreateEmployeeSkills } from '../../graphql/mutations'
import useTable from './useTable';
import { InputAdornment, makeStyles, Paper, TableBody, TableCell, TableRow, Toolbar } from '@material-ui/core';
import Controls from "../controls/Controls";
import { Search } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import Popup from '../Popup';
import NewPlayerForm from './NewPlayerForm'
import { API, graphqlOperation } from 'aws-amplify'
import Amplify from 'aws-amplify'
import config from '../../aws-exports'
Amplify.configure(config)

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '75%'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    }
}))

const headCells = [
    { id: 'firstame', label: 'First Name' },
    { id: 'lastname', label: 'Last Name' },
    { id: 'skillset', label: 'Skill Set', disableSorting: true }
]

export default function DataTable() {
    const classes = useStyles();

    const [employeeForEdit, setEmployeeForEdit] = useState(null)
    const [employees, updateEmployees] = useState([])
    const [skills, updateSkills] = useState([])
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)

    useEffect(() => { getData() }, [])
    async function getData() {
        try {
            const employeeData = await API.graphql(graphqlOperation(ListEmployees))
            const skillData = await API.graphql(graphqlOperation(ListSkills))
            updateEmployees(employeeData.data.listEmployees.items)
            updateSkills(skillData.data.listSkills.items)
        } catch (err) {
            console.log('There was an error fetching all players...', err)
        }
    }

    async function addEmployee(newEmployeeValues, prevSkills, chipData) {
        // create newskills by parsing the chipdata variable correctly
        chipData = chipData.filter(chip => chip.key !== 0)
        chipData.map((chip, index) => {
            if (chip.isBrandNew) {
                (async () => {
                    try {
                        const newSkill = await API.graphql(graphqlOperation(CreateSkill, { input: { name: chip.label } }))
                        console.log(newSkill)
                        chipData[index]["id"] = newSkill.data.createSkill.id
                    } catch (err) {
                        console.log('There was an error adding that skill to database...', err)
                    }
                })();
            }
            return null
        })
        try {
            const newEmployee = await API.graphql(graphqlOperation(CreateEmployee, { input: newEmployeeValues }))
            const newEmployeeId = newEmployee.data.createEmployee.id

            chipData.map(chip => {
                (async () => {
                    try {
                        await API.graphql(graphqlOperation(CreateEmployeeSkills, { input: { employeeSkillsEmployeeId: newEmployeeId, employeeSkillsSkillId: chip.id } }))
                    } catch (err) {
                        console.log('There was an error adding that skill to the player...', err)
                        console.log(chip)
                    }
                })();
                return null
            })
        } catch (err) {
            console.log('There was an error adding that player to database...', err)
        }
        getData() // may not need this line because the component will reload when the popup window is close ( <==== double check this)
    }

    const { TblContainer, TblHead, TblPagination, employeesAfterPagingAndSorting } = useTable(employees, headCells, filterFn);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                let lowerTarget = target.value.toLowerCase()
                if (target.value === "")
                    return items;
                else
                    return (
                        items.filter(x => (
                            x.firstname.toLowerCase().includes(lowerTarget) ||
                            x.lastname.toLowerCase().includes(lowerTarget)
                            // let totalSkillList = typeof items === "undefined" ? "" : items.skills.items.map(skill => skill.skill.name).join(", ")
                            // || totalSkillList.toLowerCase.includes(lowerTarget)
                        ))
                    )
            }
        })
    }
    // implement this !
    const addOrEdit = (newEmployeeValues, prevSkills, chipData, resetForm) => {
        addEmployee(newEmployeeValues, prevSkills, chipData)
        // // just only add employee for now (work on update -else statment later)
        // else
        //     employeeService.updateEmployee(employee)
        resetForm()
        // setEmployeeForEdit(null)
        setOpenPopup(false)
    }

    return (
        <React.Fragment>
            <Paper className={classes.pageContent}>
                <Toolbar>
                    <Controls.Input
                        label="Search Players by Name"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    />
                    <Controls.Button
                        text="Add New"
                        variant="outlined"
                        startIcon={<AddIcon />}
                        className={classes.newButton}
                        onClick={() => setOpenPopup(true)}
                    // onClick={() => { setOpenPopup(true); setEmployeeForEdit(null); }}
                    />
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            employeesAfterPagingAndSorting().map((employee, index) =>
                                (
                                    <TableRow key={index}>
                                        <TableCell>{employee.firstname}</TableCell>
                                        <TableCell>{employee.lastname}</TableCell>
                                        <TableCell>
                                            {
                                                employee.skills.items.map(skill => skill.skill.name).join(", ")
                                            }
                                        </TableCell>
                                    </TableRow>
                                ))
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </Paper>
            <Popup
                title="Create New Player"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <NewPlayerForm
                    addOrEdit={addOrEdit}
                    recordForEdit={employeeForEdit}
                    skills={skills}
                    employees={employees}
                />
            </Popup>
        </React.Fragment>
    )
}