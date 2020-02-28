import React from 'react'

interface IProps {
    onSubmit?:React.FormEventHandler,
    className?: string
}

const Form : React.SFC<IProps>= ({onSubmit, className, children})=>
    <form onSubmit={onSubmit} className={className}>
        {children}
    </form>

export default Form;