import React, { useEffect, useRef, useState } from "react";
import { TabView, TabPanel } from 'primereact/tabview';
import UserLandingPage from "./userLandingPage";
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { Button } from 'primereact/button';
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { getTotalAmountByYearData, submitFormData, submitPaymentData } from "../services/AdminService";
import { showError, showSuccess, showWarn } from "../utiles/utilityFunctions";
import Loader from "../components/loader";
import BasicDemo from "../components/barChart";
import { Dropdown } from "primereact/dropdown";
import PolarAreaDemo from "../components/polarAreaDemo";


interface PaymentHistoryFormValues {
    employeeId: string;
    yearOfPayment: string;
    status: string;
    amount: string;
}

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
                        <DashBoard />
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
    const [empId, setEmpId] = useState<string>('');

    const [formPaymentValues, setFormPaymentValues] = useState<PaymentHistoryFormValues>({
        employeeId: '',
        yearOfPayment: '',
        status: '',
        amount: '',
    });

    const paymentStatusOptions = [
        { name: 'PAID', code: 'PAID' },
        { name: 'UNPAID', code: 'UNPAID' },
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormPaymentValues({
            ...formPaymentValues,
            [name]: name === 'yearOfPayment' || name === 'amount' ? Number(value) : value,
        });
    };

    const handleStatusChange = (e: { value: any }) => {
        setFormPaymentValues({ ...formPaymentValues, status: e.value.code });
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
        console.log("🚀 ~ handleSubmit ~ response:", response)
        setEmpId(response.data.employee._id);

        if (response.success) {
            setMessage('Form submitted successfully!');

            setFormPaymentValues({
                employeeId: '',
                yearOfPayment: '',
                status: '',
                amount: '',
            });

            showSuccess(toast.current, response.message);

        } else {
            setMessage(response.message);
            showError(toast.current, response.message);
        }
        setLoading(false);
    };
    console.log("🚀 ~ formValues:", formValues)


    const handlecreatePaymentHistorySubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setErrors([]);
        setLoading(true);

        const payload = {
            "employeeId": empId,
            "yearOfPayment": formPaymentValues.yearOfPayment,
            "status": formPaymentValues.status,
            "amount": formPaymentValues.amount
        }

        const { yearOfPayment, amount, status } = formPaymentValues;
        const newErrors: string[] = [];

        // Validation logic
        if (!yearOfPayment) newErrors.push('Year of Payment is required');
        if (!amount) newErrors.push('Amount is required');
        if (!status) newErrors.push('Please select payment status');

        if (newErrors.length > 0) {
            setErrors(newErrors);
            showWarn(toast.current, newErrors.join(', '));
            setLoading(false);
            return;
        }

        const response = await submitPaymentData(payload);
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
            setEmpId('');

        } else {
            setMessage(response.message);
            showError(toast.current, response.message);
        }
        setLoading(false);
    };

    const handleNext = () => {
        stepperRef.current.nextCallback()
    }

    return (
        <>
            <div className="card">
                <Toast ref={toast} />
                <Stepper ref={stepperRef} orientation="vertical">
                    <StepperPanel header="Add Employee">

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
                        {/* <div className="flex flex-column ">
                            <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
                                <div className="grid p-2">
                                    <div className="md:col-4 col-12 flex justify-content-center">
                                        <InputText
                                            type="text"
                                            className="p-inputtext-sm w-full"
                                            placeholder="Year of Payment"
                                            name="yearofpayment"

                                        />
                                    </div>
                                    <div className="md:col-4 col-12 flex justify-content-center">
                                        <InputText
                                            type="email"
                                            className="p-inputtext-sm w-full"
                                            placeholder="Status"
                                            name="status"

                                        />
                                    </div>
                                    <div className="md:col-4 col-12 flex justify-content-center">
                                        <InputText
                                            type="email"
                                            className="p-inputtext-sm w-full"
                                            placeholder="Amount"
                                            name="amount"

                                        />
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        <div className="flex flex-column ">
                            <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
                                {loading ? (<>
                                    <Loader isLoading={loading} />
                                </>) : (<>
                                    <form onSubmit={handlecreatePaymentHistorySubmit} className="w-full">
                                        <div className="grid p-2">
                                            {/* <div className="md:col-4 col-12 flex justify-content-center">
                                                <InputText
                                                    type="text"
                                                    className="p-inputtext-sm w-full"
                                                    placeholder="Employee ID"
                                                    name="employeeId"
                                                    value={formValues.employeeId}
                                                    onChange={handleChange}
                                                />
                                            </div> */}

                                            <div className="md:col-4 col-12 flex justify-content-center">
                                                <InputText
                                                    type="number"
                                                    className="p-inputtext-sm w-full"
                                                    placeholder="Year of Payment"
                                                    name="yearOfPayment"
                                                    value={formPaymentValues.yearOfPayment}
                                                    onChange={handlePaymentChange}
                                                />
                                            </div>

                                            <div className="md:col-4 col-12 flex justify-content-center">
                                                <Dropdown
                                                    value={paymentStatusOptions.find((opt) => opt.code === formPaymentValues.status)}
                                                    options={paymentStatusOptions}
                                                    optionLabel="name"
                                                    placeholder="Payment Status"
                                                    className="w-full"
                                                    onChange={handleStatusChange} 
                                                />
                                            </div>

                                            <div className="md:col-4 col-12 flex justify-content-center">
                                                <InputText
                                                    type="number"
                                                    className="p-inputtext-sm w-full"
                                                    placeholder="Amount"
                                                    name="amount"
                                                    value={formPaymentValues.amount}
                                                    onChange={handlePaymentChange}
                                                />
                                            </div>
                                        </div>

                                        <Button label="Create Payment History" icon="pi pi-arrow-right" type="submit" className="m-2" />
                                    </form>
                                </>)}
                            </div>
                        </div>

                    </StepperPanel>

                    <StepperPanel header="Header III" >
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

const DashBoard = () => {
    const [dataSource, setDataSource] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getTotalAmountByYearData();

                setDataSource(result?.data);
            } catch (err) {
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const YAxisData = Object.keys(dataSource);
    const XAxisData = Object.values(dataSource);

    return (
        <>
            <div className="pb-3">
                <div className="flex flex-wrap items-center justify-center gap-2 pb-2">
                    <span className="rounded-md bg-primary-50 px-3 py-1 text-sm font-semibold text-primary-600"> Total Amount Year Wise </span>
                </div>
                <div className="p-4" style={{ boxShadow: "rgba(0, 0, 0, 0.15) 0px 3px 3px 0px" }}>
                    {loading ? (<Loader isLoading={loading} />) : (<BasicDemo Xaxis={XAxisData} Yaxis={YAxisData} />)}
                </div>

            </div>
            <div>
                <div className="flex flex-wrap items-center justify-center gap-2 pb-2">
                    <span className="rounded-md bg-primary-50 px-3 py-1 text-sm font-semibold text-primary-600"> Emp Count By Department </span>
                </div>
                <div className="p-4" style={{ boxShadow: "rgba(0, 0, 0, 0.15) 0px 3px 3px 0px" }}>
                    {loading ? (<Loader isLoading={loading} />) : (<PolarAreaDemo />)}
                </div>

            </div>
        </>
    )
}

export default AdminLandingPage;