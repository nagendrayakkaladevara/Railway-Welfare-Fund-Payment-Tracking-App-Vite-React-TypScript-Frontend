import { Toast } from 'primereact/toast';

// Utility function to show a warning message
export const showWarn = (toastRef: Toast | null, message: string) => {
    toastRef?.show({
        severity: 'warn',
        summary: 'Warning',
        detail: message,
        life: 3000,
    });
};

// Utility function to show a success message
export const showSuccess = (toastRef: Toast | null, message: string) => {
    toastRef?.show({
        severity: 'success',
        summary: 'Success',
        detail: message,
        life: 4000,
    });
};

// Utility function to show an informational message
export const showInfo = (toastRef: Toast | null, message: string) => {
    toastRef?.show({
        severity: 'info',
        summary: 'Info',
        detail: message,
        life: 4000,
    });
};

// Utility function to show an error message
export const showError = (toastRef: Toast | null, message: string) => {
    toastRef?.show({
        severity: 'error',
        summary: 'Error',
        detail: message,
        life: 4000,
    });
};
