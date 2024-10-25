import React, { useEffect, useLayoutEffect, useState } from 'react';
import { toast } from 'sonner';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Axios from "../../api/shared/instance";
import { useNavigate } from 'react-router-dom';
import { resetUserState } from '../../redux/slices/userSlice';

import {
    MdEmail
} from "react-icons/md";
import { FaPhoneSquareAlt } from "react-icons/fa";
import {
    IoLogOutOutline
} from "react-icons/io5";
import {
    Tooltip,
    Button,
} from "@material-tailwind/react";

const UserProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [userDetails, setUserDetails] = useState(null); // null initially
    const [error, setError] = useState(null); // handle error state if needed

    // Function to handle logout
    const handleLogout = () => {
        localStorage.removeItem('userData');
        localStorage.removeItem('userJwtToken');
        dispatch(resetUserState());
        toast.success('Logout successful');
        navigate("/login");
    };

    const fetchUserData = async () => {
        try {
            const response = await Axios.get(`/api/user/get/profile`);
            const userData = response.data.data;
            setUserDetails(userData);
        } catch (error) {
            setError(error); // set error if API call fails
        }
    };

    useLayoutEffect(() => {
        fetchUserData();
    }, [navigate]);

    // Conditionally render profile component only if userDetails is not null
    if (!userDetails) {
        // You can add a loading state here if desired
        return <div>Loading...</div>;
    }

    return (
        <section className="py-10 bg-blueGray-50">
            <div className="w-full lg:w-4/12 px-4 mx-auto">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-12">
                    <div className="px-6 py-7">
                        <div className="text-center gap-10">
                            <h3 className="text-2xl font-semibold leading-normal text-blueGray-700 ">
                                {userDetails.username}
                            </h3>
                            <div className="mb-2 text-blueGray-600 flex items-center justify-center gap-2">
                                <MdEmail size={22} />
                                {userDetails.email}
                            </div>
                            <div className="mb-2 text-blueGray-600 flex items-center justify-center gap-2">
                                <FaPhoneSquareAlt size={22} />
                                {userDetails.mobile}
                            </div>
                            <div className='flex justify-end gap-x-2 mt-5'>
                                <NavLink to="/order">
                                    <Button>Order History</Button>
                                </NavLink>
                            </div>
                        </div>
                        <div className="mt-5  border-t border-blueGray-200 relative">


                            <div className='flex justify-center mt-5'>
                                <Tooltip
                                    content="Logout"
                                    className="bg-blue-500"
                                    animate={{
                                        mount: { scale: 1, y: 0 },
                                        unmount: { scale: 0, y: 25 },
                                    }}
                                >
                                    <Button
                                        size='sm'
                                        variant='text'
                                        color='light-blue'
                                        onClick={handleLogout}
                                    >
                                        <IoLogOutOutline size={25} />
                                    </Button>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserProfile;
