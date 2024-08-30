import React, { useRef, useState } from "react";
import { TabView, TabPanel } from 'primereact/tabview';
import UserLandingPage from "./userLandingPage";
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { Button } from 'primereact/button';
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { submitFormData } from "../services/AdminService";
import { showError, showSuccess, showWarn } from "../utiles/utilityFunctions";
import Loader from "../components/loader";

// dashboard
// add person
// add payment details
// deletePaymentHistory
//updatePaymentHistory
//totalAmountByYear
//countByDepartment
//totalPaidAmountByDepartment

interface FormValues {
    name: string;
    email: string;
    department: string,
    yearOfJoining: number | any,
    crewId: string | number | any,
    PFno: string | number | any
}

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
    const toast = useRef<Toast>(null);

    const [formValues, setFormValues] = useState<FormValues>({
        name: '',
        email: '',
        department: '',
        yearOfJoining: null,
        crewId: '',
        PFno: ''
    });

    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [errors, setErrors] = useState<string[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors([]);
        setLoading(true);
        setMessage('');

        const { name, yearOfJoining, PFno, crewId } = formValues;
        const newErrors: string[] = [];

        // Validation logic
        if (!name) newErrors.push('Name is required');
        if (!yearOfJoining) {
            newErrors.push('Year of Joining is required');
        } else if (isNaN(Number(yearOfJoining)) || Number(yearOfJoining) < 2000 || Number(yearOfJoining) > new Date().getFullYear()) {
            newErrors.push('Year of Joining must be a valid year (2000 or later)');
        }
        if (!PFno) newErrors.push('PF No is required');
        if (!crewId) newErrors.push('Crew Id is required');

        if (newErrors.length > 0) {
            setErrors(newErrors);
            showWarn(toast.current, newErrors.join(', '));
            setLoading(false);
            return;
        }

        const updatedFormValues = {
            ...formValues,
            yearOfJoining: Number(formValues.yearOfJoining),
        };

        const response = await submitFormData(updatedFormValues);

        if (response.success) {
            setMessage('Form submitted successfully!');

            setFormValues({

                name: '',
                email: '',
                department: '',
                yearOfJoining: null,
                crewId: '',
                PFno: '',
            });
            showSuccess(toast.current, response.message);
            stepperRef.current.nextCallback()
        } else {
            setMessage(response.message);
            showError(toast.current, response.message);
        }
        setLoading(false);
    };
    console.log("🚀 ~ formValues:", formValues)


    console.log(message, errors);

    return (
        <>
            <div className="card">
                <Stepper ref={stepperRef} orientation="vertical">
                    <StepperPanel header="Add Employee">
                        <Toast ref={toast} />
                        <div className="flex flex-column ">
                            <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
                                {loading ? (<>
                                    <Loader isLoading={loading} />
                                </>) : (<>
                                    <form onSubmit={handleSubmit}>
                                        <div className="grid p-2">
                                            <div className="md:col-4 col-12 flex justify-content-center">
                                                <InputText
                                                    type="text"
                                                    className="p-inputtext-sm w-full"
                                                    placeholder="Name"
                                                    name="name"
                                                    value={formValues.name}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="md:col-4 col-12 flex justify-content-center">
                                                <InputText
                                                    type="email"
                                                    className="p-inputtext-sm w-full"
                                                    placeholder="Email"
                                                    name="email"
                                                    value={formValues.email}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="md:col-4 col-12 flex justify-content-center">
                                                <InputText
                                                    type="text"
                                                    className="p-inputtext-sm w-full"
                                                    placeholder="Department"
                                                    name="department"
                                                    value={formValues.department}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="md:col-4 col-12 flex justify-content-center">
                                                <InputText
                                                    type="number"
                                                    className="p-inputtext-sm w-full"
                                                    placeholder="Year of Joining"
                                                    name="yearOfJoining"
                                                    value={formValues.yearOfJoining}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="md:col-4 col-12 flex justify-content-center">
                                                <InputText
                                                    type="number"
                                                    className="p-inputtext-sm w-full"
                                                    placeholder="Crew Id"
                                                    name="crewId"
                                                    value={formValues.crewId}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="md:col-4 col-12 flex justify-content-center">
                                                <InputText
                                                    type="number"
                                                    className="p-inputtext-sm w-full"
                                                    placeholder="PF No"
                                                    name="PFno"
                                                    value={formValues.PFno}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <Button label="Create Employee" icon="pi pi-arrow-right" iconPos="right" type="submit" className="m-2" />
                                    </form>
                                </>)}
                            </div>
                        </div>

                    </StepperPanel>
                    <StepperPanel header="Create Payment History To the Employee">
                        <div className="flex flex-column h-12rem">
                            <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">Content II</div>
                        </div>
                        <div className="flex py-4 gap-2">
                            {/* <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current.prevCallback()} /> */}
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