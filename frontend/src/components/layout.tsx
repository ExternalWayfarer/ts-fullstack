import React from 'react';
import Header from './header';


const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
      <div>
        <Header />
        <main className="mt-16">{children}</main> {/* Отступ для шапки */}
      </div>
    );
  };
  

export default Layout;