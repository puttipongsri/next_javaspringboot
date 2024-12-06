/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import axios from "axios";
import "../app/globals.css";
import Header from "../components/header";
import Swal from "sweetalert2";

export default function addproduct() {
    const [preview, setPreview] = useState(null);
    const [file, setFile] = useState(null);
    const [describe, setDescribe] = useState("");
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (!user) {
            Swal.fire({
                icon: "warning",
                title: "Please Login",
                text: "You must log in to continue.",
                confirmButtonText: "OK",
            })
        }
        setIsUserLoggedIn(!!user);
    }, []);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreview(e.target.result);
            };
            reader.readAsDataURL(selectedFile);
        } else {
            setPreview(null);
            setFile(null);
        }
    };

    const handsumit = async (e) => {
        e.preventDefault();
        if (!file) {
            console.log("No file selected");
            return;
        }

        const user = JSON.parse(localStorage.getItem("user"));
        const userid = user.userid;

        try {
            const formData = new FormData();
            formData.append("userid", userid);
            formData.append("describe", describe);
            formData.append("file", file);

            const response = await axios.post('http://localhost:8080/products/upload', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (response.status === 200) {
                Swal.fire(
                    "Success",
                    "Product uploaded successfully",
                    "success"
                ).then(() => {
                    window.location.href = "/homepage";
                });
            }
        } catch {
            Swal.fire(
                "Error",
                "Failed to upload product",
                "error"
            );
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <Header />
            <form onSubmit={handsumit}>
                <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Add Product</h1>
                    <label
                        htmlFor="message"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Description
                    </label>
                    <textarea
                        id="message"
                        rows="4"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Description"
                        value={describe}
                        onChange={(e) => setDescribe(e.target.value)}
                    ></textarea>
                    <label
                        className="block mb-2 text-sm font-medium text-gray-700"
                        htmlFor="file_input"
                    >
                        Upload File
                    </label>
                    <input
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        id="file_input"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    <p
                        className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                        id="file_input_help"
                    >
                        PNG OR JPG
                    </p>
                    {preview && (
                        <div className="mt-6">
                            <h2 className="text-lg font-semibold text-gray-700 mb-2">
                                Preview:
                            </h2>
                            <img
                                src={preview}
                                alt="File preview"
                                className="w-full h-auto rounded-md shadow"
                            />
                        </div>
                    )}
                    <button
                        type="submit"
                        className={`mt-6 w-full px-4 py-2 text-white rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:outline-none ${
                            isUserLoggedIn ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
                        }`}
                        disabled={!isUserLoggedIn}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}
