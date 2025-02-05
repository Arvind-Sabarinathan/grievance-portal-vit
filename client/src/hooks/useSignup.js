import React from "react";
import { message } from "antd";
import { useAuth } from "../contexts/AuthContext.jsx";

const useSignup = () => {
    const { signin } = useAuth();
    const [error, seterror] = React.useState(null);
    const [loading, setloading] = React.useState(false);

    const signupUser = async (values) => {
        if (values.password !== values.confirmPassword) {
            return seterror('Passwords don\'t match!');
        }

        try {
            seterror(null);
            setloading(true);
            const res = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            const data = await res.json();
            if (res.status === 201) {
                message.success(data.message);
                signin(data.token, data.user);
            }
            else if (res.status === 400) {
                seterror(data.message);
            }
            else {
                message.error('Registration failed! Try again.');
            }
        }
        catch (error) {
            message.error(error);
        }
        finally {
            setloading(false);
        }
    };

    return {loading, error, signupUser};
}

export default useSignup;
