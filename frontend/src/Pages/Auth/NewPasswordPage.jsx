import React, { useState } from 'react';
import NewPassword from '../../Components/Auth/NewPassword';
import { motion } from 'framer-motion';
import { MdKeyboardDoubleArrowLeft } from 'react-icons/md'
import useNewPassword from '../../Hooks/Auth/useNewPassword';
import Loading from '../../Components/Utils/Loading';

const NewPasswordPage = () => {
    const [
        status,
        errors,
        password,
        handleChangePassword,
        confirmPassword,
        handleChangeConfirmPassword,
        showshowPass,
        handleShowPass,
        showConfirmPass,
        handleShowConfirmPass,
        handleSubmit,
        notResetPassword
    ] = useNewPassword();

    return (
        <div className='sm-max:px-[5px]'>
            <div className="mb-5 relative px-[5px]">
                <h3 className="text-[15px] sm:text-[18px] font-bold mb-2">New password</h3>
                <p className="text-textNeutralGray mb-5 text-[12px] sm:text-[14px]">
                    Please set your new password.
                </p>
            </div>

            {/* newPassword form */}
            <NewPassword
                errors={errors}
                password={password}
                handleChangePassword={handleChangePassword}
                confirmPassword={confirmPassword}
                handleChangeConfirmPassword={handleChangeConfirmPassword}
                showshowPass={showshowPass}
                handleShowPass={handleShowPass}
                showConfirmPass={showConfirmPass}
                handleShowConfirmPass={handleShowConfirmPass}
                handleSubmit={handleSubmit}
            />

            <div
                onClick={notResetPassword}
                className="mt-3 mx-auto flex gap-1 items-center cursor-pointer"
            >
                <motion.div
                    animate={{ x: [0, -15, 0], transition: { duration: 2, repeat: Infinity } }}
                    className='text-[20px] text-primary'
                >
                    <MdKeyboardDoubleArrowLeft />
                </motion.div>
                <span className='text-textNeutralGray'>Return to login</span>
            </div>

            {/* Loading component */}
            {
                status === 'loading' ? <Loading /> : null
            }
        </div>
    );
}

export default NewPasswordPage;
