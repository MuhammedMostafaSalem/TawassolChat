import React from 'react';
import ResetPassword from '../../Components/Auth/ResetPassword';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { useSelector } from 'react-redux';
import Loading from '../../Components/Utils/Loading';

const ResetPasswordPage = () => {
    const { status } = useSelector(state => state.Auth)

    return (
        <div className='sm-max:px-[5px]'>
            <div className="mb-5 relative px-[5px]">
                <h3 className="text-[15px] sm:text-[18px] font-bold mb-2">Forgot your password?</h3>
                <p className="text-textNeutralGray mb-5 text-[12px] sm:text-[14px]">
                    Please enter the email address associated with your account and We will email you a link to reset your password.
                </p>
            </div>

            {/* Reset Password Form */}
            <ResetPassword />

            <Link
                to="/auth/login"
                className="mt-3 mx-auto flex gap-1 items-center"
            >
                <motion.div
                    animate={{ x: [0, -15, 0], transition: { duration: 2, repeat: Infinity } }}
                    className='text-[20px] text-primary'
                >
                    <MdKeyboardDoubleArrowLeft />
                </motion.div>
                <span className='text-textNeutralGray'>Return to login</span>
            </Link>
            
            {/* Loading component */}
            {
                status === 'loading' ? <Loading /> : null
            }
        </div>
    );
}

export default ResetPasswordPage;
