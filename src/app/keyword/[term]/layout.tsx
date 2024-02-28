import React from 'react';

export default function TermLayout({
    children,
    modal,
}: {
    children: React.ReactNode;
    modal: React.ReactNode;
}): React.ReactNode {
    return (
        <>
            {children}
            {modal}
        </>
    );
}
