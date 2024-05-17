import { Link, useForm } from "@inertiajs/react";
import { TextField } from "@mui/material";
import { error } from "highcharts";
import React, { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

export default function Index() {
    const { data, setData, post, reset, errors } = useForm({
        email: "",
        password: "",
    });

    useEffect(() => {
        const handleMouseMove = (e) => {
            const x = -e.clientX / 5;
            const y = -e.clientY / 5;
            const container = document.getElementById("container");
            if (container) {
                container.style.backgroundPositionX = `${x}px`;
                container.style.backgroundPositionY = `${y}px`;
            }
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);
    const submitHandler = (e) => {
        e.preventDefault();
        post(route("login"), {
            onError: (errors) => {
                console.log(errors);
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Error",
                    text: errors?.email,
                    showConfirmButton: false,
                    timer: 1500,
                    showClass: {
                        popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `,
                    },
                    hideClass: {
                        popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `,
                    },
                });
            },
        });
    };

    return (
        <div className="">
            <Toaster position="top-center" reverseOrder={false} />
            <div id="container" className="px-8">
                <form
                    onSubmit={submitHandler}
                    className="bg-white py-2 px-3 rounded-md w-full"
                >
                    <h1 className="text-center font-medium text-xl">
                        Silahkan login terlebih dahulu
                    </h1>
                    <div className="flex w-full gap-4 my-2">
                        <TextField
                            label={"Email"}
                            onChange={(e) =>
                                setData({ ...data, email: e.target.value })
                            }
                            error={errors.email ? true : false}
                            helperText={errors.email && errors.email}
                            className="border py-1 border-blue-500 w-full rounded-md"
                            type="email"
                            id="email"
                            name="email"
                            required
                        />
                    </div>
                    <div className="flex w-full gap-4 my-2">
                        <TextField
                            label={"Password"}
                            onChange={(e) =>
                                setData({ ...data, password: e.target.value })
                            }
                            className="border py-1 border-blue-500 w-full rounded-md"
                            type="password"
                            id="password"
                            name="password"
                            required
                        />
                    </div>
                    <input
                        type="submit"
                        value="Login"
                        className="w-full bg-blue-500 text-white rounded-md py-2 hover:cursor-pointer"
                    />
                    <Link
                        href={route("register")}
                        className="w-full bg-blue-600 text-white rounded-md py-2 hover:cursor-pointer block mt-2 text-center
                    "
                    >
                        Register
                    </Link>
                </form>
            </div>
        </div>
    );
}
