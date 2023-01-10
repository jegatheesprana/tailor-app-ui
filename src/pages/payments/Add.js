import React, { useState, useMemo } from "react";

import * as Yup from 'yup';

import Form from "components/Form";
import { useParams, useHistory } from "react-router-dom";

import useEditData from "hooks/useEditData"

const Add = () => {
    const { id } = useParams()

    const [loading, setLoading] = useState(!!id)
    const [values, setValues] = useState({
        customerName: '',
        contactNumber: '',
        NIC: '',
        date: '',
        amount: '',
    })

    const validationSchema = Yup.object().shape({
        customerName: Yup.string()
            .required("Customer name is required"),
        contactNumber: Yup.string()
            .required("Contact number is required")
            .matches(/^[0-9]{9,10}$/, 'Phone number is not valid'),
        NIC: Yup.string()
            .required("NIC is required")
            .matches(/^(([0-9]{9}(v|V))|([0-9]{11}))$/, 'NIC is not valid'),
        date: Yup.date()
            .required("Return date is required"),
        amount: Yup.number()
            .required("Price number is required"),
    })

    const formItems = [
        {
            name: "customerName",
            label: "Customer Name",
            required: true
        },
        {
            name: "contactNumber",
            label: "Contact Number",
            required: true
        },
        {
            name: "NIC",
            label: "NIC",
            required: true
        },
        {
            name: "date",
            label: "Date",
            required: true,
            date: true
        },
        {
            name: "amount",
            label: "Amount",
            required: true
        },
    ]

    useEditData(
        id && '/payments/' + id,
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
            history.push(`/app/payments`)
        }
    }

    return (
        <Form
            formItems={formItems}
            loading={loading}
            validationSchema={validationSchema}
            method={id ? 'PUT' : 'POST'}
            action={id ? '/payments/' + id : '/payments'}
            values={values}
            title={id ? 'Edit Payment' : 'Add Payment'}
            handlers={handlers}
        />
    )
}

export default Add