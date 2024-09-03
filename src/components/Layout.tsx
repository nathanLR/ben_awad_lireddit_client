import React from 'react'
import NavBar from './NavBar';
import Footer from './Footer';

interface LayoutProps {
    children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({children}) => {
    return (
        <>
            <NavBar />
            {children}
            <Footer />
        </>
    );
}