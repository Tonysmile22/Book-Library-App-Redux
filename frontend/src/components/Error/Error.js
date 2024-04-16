import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { UseSelector, useDispatch, useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { clearError, selectErrorMessage } from '../../redux/slices/errorSlice';

const Error = () => {
    const errorMessage = useSelector(selectErrorMessage)

    const dispapatch = useDispatch()

    useEffect(() => {
        if (errorMessage) {
            toast.info(errorMessage)
            dispapatch(clearError())
        }
    }, [errorMessage, dispapatch])

    return <ToastContainer position='top-right' autoClose={2000} />
}

export default Error