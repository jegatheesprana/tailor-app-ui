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
        description: '',
        unitPrice: '',
    })

    const validationSchema = Yup.object().shape({
        id: Yup.string()
            .required("CId is required"),
        name: Yup.string()
            .required("Name is required"),
        description: Yup.string()
            .required("Description is required"),
        unitPrice: Yup.number()
            .required("Unit price is required"),
    })

    const formItems = [
        {
            name: "id",
            label: "Id",
            required: true
        },
        {
            name: "name",
            label: "Name",
            required: true
        },
        {
            name: "description",
            label: "Description",
            required: true
        },
        {
            name: "unitPrice",
            label: "Unit Price",
            required: true
        },
    ]

    useEditData(
        id && '/products/' + id,
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
            history.push(`/app/products`)
        }
    }

    return (
        <Form
            formItems={formItems}
            loading={loading}
            validationSchema={validationSchema}
            method={id ? 'PUT' : 'POST'}
            action={id ? '/products/' + id : '/products'}
            values={values}
            title={id ? 'Edit Product' : 'Add Product'}
            handlers={handlers}
        />
    )
}

export default Add