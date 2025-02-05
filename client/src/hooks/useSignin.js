import React from "react";
import { message } from "antd";
import { useAuth } from "../contexts/AuthContext.jsx";

const useSignin = () => {
    const { signin } = useAuth();
    const [error, seterror] = React.useState(null);
    const [loading, setloading] = React.useState(false);

    const signinUser = async (values) => {
       
        try {
            seterror(null);
            setloading(true);
            const res = await fetch('http://localhost:5000/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            const data = await res.json();
            if (res.status === 200) {
                message.success(data.message);
                signin(data.token, data.user);
            }
            else if (res.status === 404) {
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

    return { loading, error, signinUser };
}

export default useSignin;
