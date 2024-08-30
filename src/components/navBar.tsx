import React, { useRef } from "react";
import { Button } from 'primereact/button';
import { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { InputText } from 'primereact/inputtext';
import { Toast } from "primereact/toast";
import { useAuth } from "../context/authContext";

const NavBar: React.FC = () => {
    const [visibleBottom, setVisibleBottom] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { isLoggedIn, setIsLoggedIn } = useAuth();

    const toast = useRef<Toast>(null);

    const handleSubmit = () => {

        if (username === "User" && password === "12345") {
            setIsLoggedIn(true);
            console.log("Login successful!");
            setVisibleBottom(false);
            toast.current?.show({ severity: 'info', summary: 'Info', detail: 'Login successful!' });
        } else {
            console.log("Invalid username or password.");
            toast.current?.show({ severity: 'warn', summary: 'Warning', detail: 'Invalid username or password.' });
        }

        setUsername("");
        setPassword("");
    };

    const handleLogOut = () => {
        setVisibleBottom(false);
        setIsLoggedIn(false);
        toast.current?.show({ severity: 'info', summary: 'Info', detail: 'Logout successful!' });
    }


    return (
        <>
            <div className="card flex justify-content-between p-2" style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px" }}>
                <div className="flex gap-2" style={{ paddingLeft: "20px" }}>
                    <p>logo</p>
                    <p>name</p>
                </div>
                {!isLoggedIn ? (<Button icon="pi pi-user" onClick={() => setVisibleBottom(true)} />) : (<Button icon="pi pi-sign-out" onClick={handleLogOut} tooltip="Log Out" tooltipOptions={{ position: 'left' }} />)}
            </div>

            <Sidebar visible={visibleBottom} position="bottom" onHide={() => setVisibleBottom(false)} className="h-26rem md:h-13rem">
                <div>
                    <p>Admin Login</p>
                    <div className='flex flex-column md:flex-row md:justify-content-center gap-3'>
                        <InputText
                            placeholder="User Name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <InputText
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button label="Submit" onClick={handleSubmit} />
                    </div>
                </div>
            </Sidebar>

            <Toast ref={toast} />

            {isLoggedIn && <p className="text-center">Admin is logged in.</p>}
        </>
    )
}

export default NavBar;