import React, { useState, useEffect } from 'react'
import { Grid, Typography, Chip } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../useForm';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    chipGrid: {
        display: 'flex',
        justifyContent: 'left',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0
    },
    chip: {
        margin: theme.spacing(0.5),
    },
    spacer: {
        marginBottom: theme.spacing(3)
    }
}));

const initialFValues = {
    firstname: '',
    lastname: '',
}

export default function NewPlayerForm(props) {
    const classes = useStyles();

    const { addOrEdit, recordForEdit, skills, employees } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('firstname' in fieldValues) {
            temp.firstname = fieldValues.firstname ? "" : "This field is required."
        }
        if ('lastname' in fieldValues) {
            temp.lastname = fieldValues.lastname ? "" : "This field is required."
        }
        setErrors({
            ...temp
        })

        if (fieldValues === values) {
            return Object.values(temp).every(x => x === "")
        }
    }

    const [currentSelectValue, setCurrentSelectValue] = useState("");
    const [currentInputValue, setInputValue] = useState("");
    const [key, setKey] = useState(0);
    const [chipData, setChipData] = useState([
        { key: 0, label: '', id: '', isBrandNew: false }
    ]);

    function incrementKey() {
        setKey(key + 1)
    }

    const handleDelete = (chipToDelete) => () => {
        setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    };

    const handleSelectChange = e => {
        setCurrentSelectValue(e.target.value)
    }

    const handleNewInputChange = e => {
        setInputValue(e.target.value)
    }

    function handleSelectButtonSubmit() {
        if (currentSelectValue !== "") {
            let chipNames = []
            chipNames.push(chipData.map(item => item.label.toLowerCase()))
            let isValueInChipArray = !chipNames.every(item => !item.includes(currentSelectValue.toLowerCase()))
            if (!isValueInChipArray) {
                incrementKey()
                let newId = ""
                for (let i = 0; i < skills.length; i++) {
                    if (skills[i].name.toLowerCase() === currentSelectValue.toLowerCase()) {
                        newId = skills[i].id
                        break
                    }
                }
                const newChip = { key: key + 1, label: currentSelectValue, id: newId, isBrandNew: false } // fix id?
                setChipData([...chipData, newChip]);
                setCurrentSelectValue("")
            }
        }
    }

    function handleAddButtonSubmit() {
        if (currentInputValue !== "") {
            let chipNames = []
            chipNames.push(chipData.map(item => item.label.toLowerCase()))
            let isValueInChipArray = !chipNames.every(item => !item.includes(currentInputValue.toLowerCase()))
            if (!isValueInChipArray) {
                incrementKey()
                let newId = ""
                let isNew = true
                for (let i = 0; i < skills.length; i++) {
                    if (skills[i].name.toLowerCase() === currentInputValue.toLowerCase()) {
                        newId = skills[i].id
                        isNew = false
                        break
                    }
                }
                const newChip = { key: key + 1, label: currentInputValue, id: newId, isBrandNew: isNew } //fix id?
                setChipData([...chipData, newChip]);
                setInputValue("")
            }
        }
    }


    useEffect(() => {
        if (recordForEdit != null)
            setValues({ ...recordForEdit })
    }, [recordForEdit])

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            let verifyList = []
            verifyList.push(employees.map(employee => employee.firstname.toLowerCase() + employee.lastname.toLowerCase()))
            let newName = values.firstname.toLowerCase() + values.lastname.toLowerCase()
            let isDuplicate = !verifyList.every(item => (item !== newName))
            if (isDuplicate) {
                alert("A player with this exact first and last name already exists!")
            } else {
                addOrEdit(values, skills, chipData, resetForm);
                setCurrentSelectValue("")
                setInputValue("")
                setKey(0)
                setChipData([{ key: 0, label: '', id: '', isBrandNew: false }])
            }
        }
    }

    return (
        <Form onSubmit={handleSubmit}>

            <Grid container>
                <Grid item xs={6}>
                    <Typography variant='h5' className={classes.spacer}>
                        Insert Player Info
                    </Typography>
                    <Controls.Input
                        name="firstname"
                        label="First Name"
                        value={values.firstname}
                        onChange={handleInputChange}
                        error={errors.firstname}
                    />
                    <Controls.Input
                        name="lastname"
                        label="Last Name"
                        value={values.lastname}
                        onChange={handleInputChange}
                        error={errors.lastname}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Typography variant='h5'>
                        Add Skills
                    </Typography>
                    <Typography variant='body1'>
                        Select from drop down list OR Write a new skill and add.
                    </Typography>
                    <Grid container xs={12} justify="flex-start" alignItems="center">
                        <Controls.Select
                            name="playerskill"
                            label="Select a Skill to Add"
                            value={currentSelectValue}
                            onChange={handleSelectChange}
                            options={skills}
                        />
                        <Controls.ActionButton
                            color="primary"
                            onClick={handleSelectButtonSubmit}
                        >
                            <AddBoxOutlinedIcon />
                        </Controls.ActionButton>
                        {/* Add a Button here (just a simple blue +) that onClick gets the value
                        from the Select with name=skillId and add it to the UI mentioned in handleAddButtonSubmit above*/}
                    </Grid>
                    <Grid container xs={12} justify="flex-start" alignItems="center">
                        <Controls.Input
                            name="newSkill"
                            label="Write New Skill Here"
                            value={currentInputValue}
                            onChange={handleNewInputChange}
                        />
                        <Controls.ActionButton
                            color="primary"
                            onClick={handleAddButtonSubmit}
                        >
                            <AddBoxOutlinedIcon />
                        </Controls.ActionButton>
                        {/* Add a Button here (just a simple blue +) that onClick gets the value
                     from the input with name=newSkill and add it to the UI mentioned in handleAddButtonSubmit above*/}
                    </Grid>
                    <Grid container xs={12} style={{ height: '4vh' }} />
                    <Typography variant='h5'>
                        Skills to Add:
                    </Typography>
                    <Grid container component="ul" xs={12} className={classes.chipGrid}>
                        {chipData.map((data) => {
                            if (data.key !== 0) {
                                return (
                                    <li key={data.key}>
                                        <Chip
                                            label={data.label}
                                            color="primary"
                                            onDelete={handleDelete(data)}
                                            className={classes.chip}
                                        />
                                    </li>
                                );
                            }
                            return null
                        })}
                    </Grid>
                    <div>
                        <Controls.Button
                            type="submit"
                            text="Create" />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}