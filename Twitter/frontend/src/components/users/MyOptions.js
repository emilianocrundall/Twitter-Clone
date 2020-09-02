import React from 'react'
import { components } from '@atlaskit/select'
import { Link } from 'react-router-dom'

export default function MyOptions({children, ...props}) {
    const { Option } = components
    const {value} = props.data
    return (
        <Link to={`/users/${value}/`}>
            <Option {...props}>
                {children}
            </Option>
        </Link>
    )
}
