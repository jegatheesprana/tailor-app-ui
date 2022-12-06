import React, { useState, useMemo } from "react";

import * as Yup from 'yup';

import Form from "components/Form";
import { useParams, useHistory } from "react-router-dom";

import useEditData from "hooks/useEditData"

const Add = () => {
    const { id } = useParams()

    const [loading, setLoading] = useState(!!id)
    const [values, setValues] = useState({
        id: '',
        name: '',
        contactNumber: '',
        NIC: ''
    })



    const validationSchema = Yup.object().shape({
        id: Yup.string()
            .required("Customer id is required"),
        name: Yup.string()
            .required("Customer name is required"),
        contactNumber: Yup.string()
            .required("Contact number is required")
            .matches(/^[0-9]{9,10}$/, 'Phone number is not valid'),
        NIC: Yup.string()
            .required("NIC is required")
            .matches(/^(([0-9]{9}(v|V))|([0-9]{11}))$/, 'NIC is not valid'),
    })

    const formItems = [
        {
            name: "id",
            label: "Tailor ID",
        },
        {
            name: "name",
            label: "Name",
        },
        {
            name: "contactNumber",
            label: "Contact Number",
        },
        {
            name: "NIC",
            label: "NIC",
        },
    ]

    useEditData(
        id && '/tailors/' + id,
        details => {
            if (id) {
                setValues(details)
                setLoading(false)
            }
        }
    )

    const history = useHistory()
    const handlers = {
        formData: (data) => data,
        afterSubmit: () => {
            history.push(`/app/tailors`)
        }
    }

    return (
        <Form
            formItems={formItems}
            loading={loading}
            validationSchema={validationSchema}
            method={id ? 'PUT' : 'POST'}
            action={id ? '/tailors/' + id : '/tailors'}
            values={values}
            title={id ? 'Edit Tailor' : 'Add Tailor'}
            handlers={handlers}
        />
    )
}

export default Add