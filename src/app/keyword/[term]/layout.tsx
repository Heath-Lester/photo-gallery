import React from 'react';

export default function TermLayout(props: { children: React.ReactNode; modal: React.ReactNode }): React.ReactNode {
    return (
        <>
            {props.children}
            {props.modal}
        </>
    );
}
