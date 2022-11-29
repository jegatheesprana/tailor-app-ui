import React, { useState, useMemo } from "react";

import * as Yup from 'yup';

import Form from "components/Form";
import { useParams, useHistory } from "react-router-dom";

import useEditData from "hooks/useEditData"

const Add = () => {
    const { id } = useParams()
    const { buildingId } = useParams()

    const [loading, setLoading] = useState(!!id)
    const [values, setValues] = useState({
        name: '',
        value: '',
        details: '',
        status: true,
        buildingId: buildingId
    })



    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required("Apartment code is required"),
        value: Yup.string()
            .required("Name is required"),
        // status: Yup.boolean()
        //     .required("Status is required")

    })

    const formItems = [
        {
            name: "name",
            label: "Name",
            required: true
        },
        {
            name: "value",
            label: "Value",
            required: true
        },
        {
            name: "details",
            label: "Details",
        },
        {
            name: "status",
            label: "Status",
            required: true,
            check: true
        },
    ]

    useEditData(
        id && '/measurements/' + id,
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
            history.push(`/app/measurements`)
        }
    }

    return (
        <Form
            formItems={formItems}
            loading={loading}
            validationSchema={validationSchema}
            method={id ? 'PUT' : 'POST'}
            action={id ? '/measurements/' + id : '/measurements'}
            values={values}
            title={id ? 'Edit Measurement' : 'Add Measurement'}
            handlers={handlers}
        />
    )
}

export default Add