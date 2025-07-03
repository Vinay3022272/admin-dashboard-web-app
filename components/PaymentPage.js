"use client";
import React, { useEffect, useState } from "react";
import { initiate } from "@/actions/useractions";
import Script from "next/script";
import { fetchuser, fetchpayments } from "@/actions/useractions";
import { useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";

const PaymentPage = ({ username }) => {
  const [paymentform, setpaymentform] = useState({name:"",message:"",amount:""});
  const [currentUser, setcurrentUser] = useState({});
  const [payments, setPayments] = useState([]);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (searchParams.get("paymentdone") == "true") {
      toast("Payment Done!!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
    router.push(`/${username}`);
  }, []);

  const handleChange = (e) => {
    setpaymentform({ ...paymentform, [e.target.name]: e.target.value });
  };

  const getData = async () => {
    let u = await fetchuser(username);
    setcurrentUser(u);
    let dbpayments = await fetchpayments(username);
    setPayments(dbpayments);
    console.log(u, dbpayments);
  };
  const pay = async (amount) => {
    if (!paymentform.name) {
      alert("Please enter your name!");
      return;
    }

    let a = await initiate(amount, username, paymentform);
    console.log("initiate response:", a);

    const orderId = a.id; // ✅ make sure you get `.id`

    var options = {
      key: currentUser.razorpayid,
      amount: amount,
      currency: "INR",
      name: "Acme Corp",
      description: "Test Transaction",
      order_id: orderId, // ✅ Razorpay's real ID
      callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
      prefill: {
        name: paymentform.name,
        email: "gaurav.kumar@example.com",
        contact: "9000090000",
      },
      theme: { color: "#3399cc" },
    };

    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <ToastContainer />

      {/* Load the Razorpay checkout script */}
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

      {/* YOUR REMAINING PAGE CONTENT */}
      <div className="cover w-full relative">
        <img
          className="object-cover w-full h-48 md:h-[350px]"
          src={currentUser.coverpic}
          alt=""
        />
        <div className="absolute -bottom-10 right-[37%] md:right-[47%] overflow-hidden border-black border-2">
          <img
            className="rounded-full "
            width={85}
            height={85}
            src={currentUser.profilepic}
            alt=""
          />
        </div>
      </div>
      <div className="info flex  justify-center items-center my-12 flex-col gap-2">
        <div className="font-bold text-lg">@{username}</div>
        <div className="text-slate-400">
          Lets help {username} to get funding!
        </div>
        <div className="text-slate-400">
          {payments.length} Payments . ₹
          {payments.reduce((a, b) => a + b.amount/100, 0)} raised
        </div>
        <div className="payment flex gap-3 w-[80%] mt-11 flex-col md:flex-row">
          <div className="supporters w-full md:w-1/2 bg-slate-900 rounded-lg text-white p-10">
            <h2 className="text-2xl font-bold my-5">Supporters</h2>
            <ul className="mx-5 text-sm">
              {payments.length == 0 && <li>No Payments Yet!</li>}
              {payments.map((p, i) => {
                return (
                  <li key={i} className="my-4 flex gap-2 items-center">
                    <img className="rounded-full" width={23} src="user.png" alt="user " />
                    <span>
                      {p.name} donated{" "}
                      <span className="font-bold">₹{p.amount / 100}</span> with
                      a message &quot;{p.message}&quot;
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="makePayment w-full md:w-1/2 bg-slate-900 rounded-lg text-white p-10">
            <h2 className="text-2xl font-bold my-5">Make a Payment</h2>
            <div className="flex gap-2 flex-col">
              <input
                onChange={handleChange}
                value={paymentform.name}
                name="name"
                type="text"
                className="w-full p-3 rounded-lg bg-slate-800"
                placeholder="Enter Name"
              />
              <input
                onChange={handleChange}
                value={paymentform.message}
                name="message"
                type="text"
                className="w-full p-3 rounded-lg bg-slate-800"
                placeholder="Enter Message"
              />
              <input
                onChange={handleChange}
                value={paymentform.amount}
                name="amount"
                type="text"
                className="w-full p-3 rounded-lg bg-slate-800"
                placeholder="Enter Amount"
              />
              <button
                id="rzp-button1"
                type="button"
                onClick={() => pay(Number.parseInt(paymentform.amount) * 100)} // hook up button
                className="w-full px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-slate-600 disabled:hover:bg-slate-600 disabled:cursor-not-allowed"
                disabled={
                  paymentform.name?.length < 3 ||
                  paymentform.message?.length < 4 ||
                  paymentform.amount?.length<1
                }
              >
                Pay
              </button>
            </div>
            <div className="flex gap-2 mt-5 flex-col md:flex-row">
              <button
                className="bg-slate-800 p-3 rounded-lg"
                onClick={() => pay(1000)}
              >
                Pay ₹10
              </button>
              <button
                className="bg-slate-800 p-3 rounded-lg"
                onClick={() => pay(2000)}
              >
                Pay ₹20
              </button>
              <button
                className="bg-slate-800 p-3 rounded-lg"
                onClick={() => pay(3000)}
              >
                Pay ₹30
              </button>
              <button
                className="bg-slate-800 p-3 rounded-lg"
                onClick={() => pay(4000)}
              >
                Pay ₹40
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
