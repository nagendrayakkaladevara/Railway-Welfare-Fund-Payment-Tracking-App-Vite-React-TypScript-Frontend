import React, { useRef, useState } from "react";
import { TabView, TabPanel } from 'primereact/tabview';
import UserLandingPage from "./userLandingPage";
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { Button } from 'primereact/button';
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";

// dashboard
// add person
// add payment details
// deletePaymentHistory
//updatePaymentHistory
//totalAmountByYear
//countByDepartment
//totalPaidAmountByDepartment


const AdminLandingPage: React.FC = () => {
    return (
        <>
            <div className="card">
                <TabView>
                    <TabPanel header="List">
                        <UserLandingPage />
                    </TabPanel>
                    <TabPanel header="Admin Actions">
                        <AdminActions />
                    </TabPanel>
                    <TabPanel header="Dashboard">
                        <p className="m-0">
                            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti
                            quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in
                            culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
                            Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
                        </p>
                    </TabPanel>
                </TabView>
            </div>
        </>
    )
}

const AdminActions: React.FC = () => {
    const stepperRef = useRef<any>(null);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [department, setDepartment] = useState('');
    const [yearOfJoining, setYearOfJoining] = useState('');
    const [errors, setErrors] = useState<string[]>([]);

    const toast = useRef<any>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors([]);

        const newErrors: string[] = [];
        if (!name) newErrors.push('Name is required');
        if (!yearOfJoining) {
            newErrors.push('Year of Joining is required');
        } else if (isNaN(Number(yearOfJoining)) || Number(yearOfJoining) < 2000 || Number(yearOfJoining) > new Date().getFullYear()) {
            newErrors.push('Year of Joining must be a valid year (2000 or later)');
        }

        if (newErrors.length > 0) {
            setErrors(newErrors);
            showWarn(newErrors.join(', '));
            return;
        }

        try {
            const response = await fetch('/api/employees', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, department, yearOfJoining }),
            });

            if (!response.ok) {
                throw new Error('Failed to create employee');
            }

            const data = await response.json();
            console.log(data);
            // Handle success (e.g., show a success message, clear the form)
            setName('');
            setEmail('');
            setDepartment('');
            setYearOfJoining('');
        } catch (error) {
            console.error('Error:', error);
            showWarn('Error occurred while adding employee.'); // Show toast on error
        }
    };

    const showWarn = (message: string) => {
        toast.current.show({ severity: 'error', summary: 'Error', detail: message, life: 3000 });
    };

    console.error(errors)

    return (
        <>
            <div className="card">
                <Stepper ref={stepperRef} orientation="vertical">
                    <StepperPanel header="Add Employee">
                        <Toast ref={toast} />
                        <div className="flex flex-column ">
                            <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
                                <form onSubmit={handleSubmit} >
                                    <div className="grid">

                                        <div className="col-12 lg:col-3 xl:col-4 flex justify-content-center lg:block ">

                                            <InputText type="text" className="p-inputtext-sm" placeholder="Name"
                                                id="name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>

                                        <div className="col-12 lg:col-3 xl:col-4 flex justify-content-center lg:block ">

                                            <InputText type="email" className="p-inputtext-sm" placeholder="Email"

                                                id="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>

                                        <div className="col-12 lg:col-3 xl:col-4 flex justify-content-center lg:block ">
                                            <InputText type="text" className="p-inputtext-sm" placeholder="Department"
                                                id="department"
                                                value={department}
                                                onChange={(e) => setDepartment(e.target.value)}
                                            />
                                        </div>

                                        <div className="col-12 lg:col-3 xl:col-4 flex justify-content-center lg:block ">
                                            <InputText type="number" className="p-inputtext-sm" placeholder="Year of joining"
                                                id="yearOfJoining"
                                                value={yearOfJoining}
                                                onChange={(e) => setYearOfJoining(e.target.value)}
                                            />
                                        </div>


                                    </div>
                                    <Button label="Create Employee" icon="pi pi-arrow-right" iconPos="right" type='submit' className="m-2" onClick={() => stepperRef.current.nextCallback()} />
                                </form>
                            </div>
                        </div>

                    </StepperPanel>
                    <StepperPanel header="Create Payment History To the Employee">
                        <div className="flex flex-column h-12rem">
                            <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">Content II</div>
                        </div>
                        <div className="flex py-4 gap-2">
                            <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current.prevCallback()} />
                            <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current.nextCallback()} />
                        </div>
                    </StepperPanel>
                    <StepperPanel header="Header III">
                        <div className="flex flex-column h-12rem">
                            <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">Content III</div>
                        </div>
                        <div className="flex py-4">
                            <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current.prevCallback()} />
                        </div>
                    </StepperPanel>
                </Stepper>
            </div>


        </>
    )
}
export default AdminLandingPage;