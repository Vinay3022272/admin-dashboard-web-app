"use server";
import Razorpay from "razorpay";
import Payment from "@/models/Payment";
import connectDb from "@/db/connectDB";
import User from "@/models/User";

export const initiate = async (amount, username, paymentform) => {
  await connectDb();

  const user = await User.findOne({ username });

  const instance = new Razorpay({
    key_id: user.razorpayid,
    key_secret: user.razorpaysecret,
  });

  const options = {
    amount: amount,
    currency: "INR",
  };

  const order = await instance.orders.create(options);

  console.log("Created Razorpay order:", order);

  await Payment.create({
    order_id: order.id, // always store Razorpay's ID!
    to_user: username,
    name: paymentform.name,
    message: paymentform.message,
    amount: amount,
    done: false,
  });

  console.log("Payment saved in DB:", order.id);

  return order; // return the full order to the frontend
};
export const fetchuser = async (username) => {
  await connectDb();
  let u = await User.findOne({ username: username });
  if (!u) return null;
  let user = u.toObject({ flattenObjectIds: true });
  return user;
};
export const fetchpayments = async (username) => {
  await connectDb();
  // find all payments sorted by decreasing order of amount and flatten object ids
  let p = await Payment.find({ to_user: username, done: true })
    .sort({ amount: -1 })
    .limit(10)
    .lean();
  return p;
};
export const updateProfile = async (data, oldusername) => {
  await connectDb();
  let ndata = Object.fromEntries(data);
  // if the user name is being updated,check if user name is available
  if (oldusername != ndata.username) {
    let u = await User.findOne({ username: ndata.username });
    if (u) {
      return { error: "Username already exists" };
    }
  }
  await User.updateOne({ email: ndata.email }, ndata);
};

// export const updateProfile = async (data, oldusername) => {
//   await connectDb();
//   let ndata = Object.fromEntries(data);
//   // if the user name is being updated,check if user name is available
//   if (oldusername != ndata.username) {
//     let u = await User.findOne({ username: ndata.username });
//     if (u) {
//       return { error: "Username already exists" };
//     }
//     await User.updateOne({ email: ndata.email }, ndata);
//     // Now update all the usernames in the Payments table
//     await Payment.updateMany(
//       { to_user: oldusername },
//       { to_user: ndata.username }
//     );
//   } else {
//     await User.updateOne({ email: ndata.email }, ndata);
//   }
// };
