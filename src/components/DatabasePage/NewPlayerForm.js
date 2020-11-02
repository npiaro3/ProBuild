import React, { useState, useEffect } from 'react'
import { Grid, Typography, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../useForm';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';

const initialFValues = {
    id: 0,
    firstname: '',
    lastname: '',
    skillId: '',
}

export default function NewPlayerForm(props) {

    const { addEmployee, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('firstname' in fieldValues)
            temp.firstname = fieldValues.firstname ? "" : "This field is required."
        if ('lastname' in fieldValues)
            temp.lastname = fieldValues.lastname ? "" : "This field is required."
        // change this bottom conditional to only throw an error when the interface of selected skills is empty
        // the way it's set up now will always throw an error if no skill is selected in thedropdown menu
        // but it might still throw an error even if skills have already been selected
        if ('skillId' in fieldValues)
            temp.skillId = fieldValues.skillId.length !== 0 ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

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
            addEmployee(values, resetForm);
        }
    }

    const handleAddButtonSubmit = e => {
        e.preventDefault()
        // if there is nothing select then alert user to select something
        // if something is selected add it to interface and make visible to user

        // maybe use this logic?
        // if ('skillId' in fieldValues)
        //     temp.skillId = fieldValues.skillId.length != 0 ? "" : "This field is required."
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
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
                            name="skillId"
                            label="Select a Skill to Add"
                            value={values.skillId}
                            onChange={handleInputChange} // probably delete this onChange because the button added below will suffice 
                            //options={} populate the current skill list here (use graphql operation)
                            error={errors.skillId}
                        />
                        <Controls.ActionButton
                            color="primary"
                        // onClick={() => { setOpenPopup(false) }} onclick should add skill to interface list
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
                            value={values.newSkill}
                            onChange={handleInputChange}
                            error={errors.newSkill}
                        />

                        <Controls.ActionButton
                            color="primary"
                        // onClick={() => { setOpenPopup(false) }} onclick should add skill to interface list
                        >
                            <AddBoxOutlinedIcon />
                        </Controls.ActionButton>
                        {/* Add a Button here (just a simple blue +) that onClick gets the value
                     from the input with name=newSkill and add it to the UI mentioned in handleAddButtonSubmit above*/}
                    </Grid>
                    <Grid container xs={12} justify="flex-start" alignItems="flex-start" style={{ height: '28vh' }}>

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