import React from 'react';

export default function KeywordLayout({
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
