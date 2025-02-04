import { useState, useEffect } from "react";
import { toast } from 'sonner'
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import FormErrorDisplay from "../../../components/common/FormErrorDisplay";
import { otpSchema } from "../../../validations/userValidations/otpSchema";
import { Link } from "react-router-dom";

const OTP = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get("email");

    const [otp, setOtp] = useState("");
    const [timer, setTimer] = useState(60);
    const [isTimerActive, setIsTimerActive] = useState(true);
    const [showSentButton, setShowSentButton] = useState(true);
    const [serverResponse, setServerResponse] = useState("");
    const [errors, setErrors] = useState("");

    const handleVerification = async (e) => {
        e.preventDefault();
        setServerResponse("");

        try {
            await otpSchema.validate({ otp });

            const response = await axios.post(`${import.meta.env.VITE_AXIOS_BASE_URL}/api/user/validateOtp`, { otp, email });

            if (response) {
                setServerResponse(response);

                if (response.status === 200) {
                    localStorage.removeItem("otpTimer");
                    toast.success('Register successfully. Please login')
                    navigate("/login");
                }
            }
        } catch (error) {
            if (error.name === "ValidationError") {
                setErrors(error.errors[0]);
            } else {
                console.error("Error during verifying otp:", error);
                setServerResponse({ status: "failed", message: error.response?.data?.message });
            }
        }
    };

    const handleResend = async () => {
        const response = await axios.post(`${import.meta.env.VITE_AXIOS_BASE_URL}/api/user/resendOtp`, { email });

        setServerResponse("");
        if (response) {
            setServerResponse(response);
            if (response.status === 200) {
                setTimer(60);
                setIsTimerActive(true);
                setShowSentButton(true);
            }
        }
    };

    const handleChange = (e) => {
        setOtp(e.target.value);
    };

    useEffect(() => {
        let intervalId;

        if (isTimerActive) {
            intervalId = setInterval(() => {
                setTimer((prevTimer) => {
                    if (prevTimer === 1) {
                        setIsTimerActive(false);
                        clearInterval(intervalId);
                    }
                    return prevTimer - 1;
                });
            }, 1000);
        }

        return () => clearInterval(intervalId);
    }, [isTimerActive]);

    useEffect(() => {
        if (timer === 0) {
            setShowSentButton(false);
        }
    }, [timer]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">OTP Verification</h2>
                    <div className="mt-3">
                        <input value={otp} onChange={handleChange} type="text" className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400" placeholder="Enter the OTP" />
                        {errors && <FormErrorDisplay error={errors} />}
                    </div>
                    {serverResponse.status === "failed" && (
                        <div className="mt-3 bg-red-100 text-red-700 border border-solid border-gray-300 px-4 py-3 rounded" role="alert">
                            {serverResponse.message}
                        </div>
                    )}

                    {showSentButton && (
                        <div className="mt-3">
                            <button onClick={handleVerification} className="w-full py-3 px-4 bg-gray-900 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:bg-gray-800">Sent OTP</button>
                        </div>
                    )}
                </div>
                <div className="text-center font-bold text-lg">
                    {timer > 0 ? (
                        <p>{timer} seconds left</p>
                    ) : (
                        <button onClick={handleResend} className="text-red-600 hover:text-red-400 focus:outline-none"><Link to="/sign-up" className="font-medium text-blue-600 hover:text-blue-400">Timeout, Register again</Link></button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OTP;
