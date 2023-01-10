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
        customerName: '',
        contactNumber: '',
        NIC: '',
        date: '',
        description: '',
    })

    const validationSchema = Yup.object().shape({
        id: Yup.string()
            .required("Order number is required"),
        customerName: Yup.string()
            .required("Customer name is required"),
        contactNumber: Yup.string()
            .required("Contact number is required")
            .matches(/^[0-9]{9,10}$/, 'Phone number is not valid'),
        NIC: Yup.string()
            .required("NIC is required")
            .matches(/^(([0-9]{9}(v|V))|([0-9]{11}))$/, 'NIC is not valid'),
        date: Yup.date()
            .required("Date is required"),
        description: Yup.string()
            .required("Description is required"),
    })

    const formItems = [
        {
            name: "orderNumber",
            label: "Order Number",
            required: true
        },
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
            name: "coatNumber",
            label: "Coat Number",
            required: true
        },
        {
            name: "price",
            label: "Price",
            required: true
        },
        {
            name: "returnDate",
            label: "Return Date",
            required: true,
            date: true
        },
    ]

    useEditData(
        id && '/workOrders/' + id,
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
            history.push(`/app/workOrders`)
        }
    }

    return (
        <Form
            formItems={formItems}
            loading={loading}
            validationSchema={validationSchema}
            method={id ? 'PUT' : 'POST'}
            action={id ? '/workOrders/' + id : '/workOrders'}
            values={values}
            title={id ? 'Edit Work Order' : 'Add Work Order'}
            handlers={handlers}
        />
    )
}

export default Add