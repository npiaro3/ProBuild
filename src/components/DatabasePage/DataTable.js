import React, { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify'
import { listEmployees as ListEmployees } from '../../graphql/queries'
import Amplify from 'aws-amplify'
import config from '../../aws-exports'
import useTable from './useTable';
import { InputAdornment, makeStyles, Paper, TableBody, TableCell, TableRow, Toolbar } from '@material-ui/core';
import Controls from "../controls/Controls";
import { Search } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import Popup from '../Popup';
import NewPlayerForm from './NewPlayerForm'

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
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)

    useEffect(() => { getData() }, [])
    async function getData() {
        try {
            const employeeData = await API.graphql(graphqlOperation(ListEmployees))
            updateEmployees(employeeData.data.listEmployees.items)
        } catch (err) {
            console.log('There was an error fetching all players...', err)
        }
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
                    return items.filter(x => (x.firstname.toLowerCase().includes(lowerTarget) || x.lastname.toLowerCase().includes(lowerTarget)))
            }
        })
    }
    // implement this !
    // const addEmployee = (employee, resetForm) => {
    //     if (employee.id == 0)
    //         employeeService.insertEmployee(employee) // just only add employee for now (work on update -else statment later)
    //     else
    //         employeeService.updateEmployee(employee)
    //     resetForm()
    //     setEmployeeForEdit(null)
    //     setOpenPopup(false)
    //     updateEmployees(employeeService.getAllEmployees())
    // }

    return (
        <React.Fragment>
            <Paper className={classes.pageContent}>
                <Toolbar>
                    <Controls.Input
                        label="Search Players"
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
                <NewPlayerForm />
            </Popup>
        </React.Fragment>
    )
}