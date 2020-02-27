import React from 'react'

interface IProps {
    onSubmit:React.FormEventHandler,
    className?: string
}

const Form : React.SFC<IProps>= ({onSubmit, className})=>
<Form onSubmit={onSubmit} className={className}/>

export default Form;