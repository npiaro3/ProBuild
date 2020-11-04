import React, { useEffect, useState } from 'react';
import { listEmployees as ListEmployees, listSkills as ListSkills } from '../../graphql/queries'
import {
    createEmployee as CreateEmployee,
    createSkill as CreateSkill,
    createEmployeeSkills as CreateEmployeeSkills,
    deleteEmployee as DeleteEmployee
} from '../../graphql/mutations'
import useTable from './useTable';
import { InputAdornment, makeStyles, Paper, TableBody, TableCell, TableRow, Toolbar } from '@material-ui/core';
import Controls from "../controls/Controls";
import { Search } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import Popup from '../Popup';
import NewPlayerForm from './NewPlayerForm'
import Notification from '../Notification'
import ConfirmDialog from '../ConfirmDialog'
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
    { id: 'skillset', label: 'Skill Set', disableSorting: true },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function DataTable() {
    const classes = useStyles();

    const [employeeForEdit, setEmployeeForEdit] = useState(null)
    const [employees, updateEmployees] = useState([])
    const [skills, updateSkills] = useState([])
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

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

    async function addEmployee(employeeInfo, chipData) {
        // create newskills by parsing the chipdata variable correctly
        chipData = chipData.filter(chip => chip.key !== 0)
        chipData.map((chip, index) => {
            if (chip.isBrandNew) {
                (async () => {
                    try {
                        const newSkill = await API.graphql(graphqlOperation(CreateSkill, { input: { name: chip.label } }))
                        chipData[index]["id"] = newSkill.data.createSkill.id
                    } catch (err) {
                        console.log('There was an error adding that skill to database...', err)
                    }
                })();
            }
            return null
        })
        try {
            const newEmployee = await API.graphql(graphqlOperation(CreateEmployee, { input: employeeInfo }))
            const newEmployeeId = newEmployee.data.createEmployee.id

            chipData.map(chip => {
                (async () => {
                    try {
                        await API.graphql(graphqlOperation(CreateEmployeeSkills, { input: { employeeSkillsEmployeeId: newEmployeeId, employeeSkillsSkillId: chip.id } }))
                    } catch (err) {
                        console.log('There was an error adding that skill to the player...', err)
                    }
                })();
                return null
            })
        } catch (err) {
            console.log('There was an error adding that player to database...', err)
        }
        getData()
    }

    async function editEmployee(employeeInfo, chipData) {
        let firstAndLastName = { firstname: "", lastname: "" }
        for (let i = 0; i < employees.length; i++) {
            if (employees[i].id === employeeInfo) {
                firstAndLastName["firstname"] = employees[i].firstname
                firstAndLastName["lastname"] = employees[i].lastname
            }
        }
        deleteEmployee(employeeInfo)
        addEmployee(firstAndLastName, chipData)
    }

    async function deleteEmployee(employeeId) {
        try {
            await API.graphql(graphqlOperation(DeleteEmployee, { input: { id: employeeId } }))
        } catch (err) {
            console.log('There was an error deleting the player...', err)
        }
    }

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
                        ))
                    )
            }
        })
    }

    const mutateEmployee = (employeeInfo, chipData, resetForm, isEdit, isDelete) => {
        if (isDelete) {
            deleteEmployee(employeeInfo)
        } else {
            if (isEdit) {
                editEmployee(employeeInfo, chipData)
                setNotify({
                    isOpen: true,
                    message: 'Player updated successfully!',
                    type: 'success',
                    title: "Success"
                })
            } else {
                addEmployee(employeeInfo, chipData)
                setNotify({
                    isOpen: true,
                    message: 'Player added successfully!',
                    type: 'success',
                    title: "Success"
                })
            }
            setEmployeeForEdit(null)
            resetForm()
            setOpenPopup(false)
        }
    }

    const openInPopup = employee => {
        setEmployeeForEdit(employee)
        setOpenPopup(true)
    }

    const handleDeleteButton = employeeToDelete => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        deleteEmployee(employeeToDelete.id)
        getData()
        setNotify({
            isOpen: true,
            message: 'Player Deleted!',
            type: 'error',
            title: "Delete Success"
        })
    }

    const { TblContainer, TblHead, TblPagination, employeesAfterPagingAndSorting } = useTable(employees, headCells, filterFn);

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
                        onClick={() => { setOpenPopup(true); setEmployeeForEdit(null); }}
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
                                        <TableCell>
                                            <Controls.ActionButton
                                                color="primary"
                                                onClick={() => { openInPopup(employee) }}
                                            >
                                                <EditOutlinedIcon fontSize="small" />
                                            </Controls.ActionButton>
                                            <Controls.ActionButton
                                                color="secondary"
                                                onClick={() => {
                                                    setConfirmDialog({
                                                        isOpen: true,
                                                        title: 'Are you sure to delete this player?',
                                                        subTitle: "You can't undo this operation",
                                                        onConfirm: () => { handleDeleteButton(employee) }
                                                    })
                                                }}>
                                                <CloseIcon fontSize="small" />
                                            </Controls.ActionButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </Paper>
            <Popup
                title="Player Info Form"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <NewPlayerForm
                    mutateEmployee={mutateEmployee}
                    employeeForEdit={employeeForEdit}
                    skills={skills}
                    employees={employees}
                />
            </Popup>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </React.Fragment>
    )
}