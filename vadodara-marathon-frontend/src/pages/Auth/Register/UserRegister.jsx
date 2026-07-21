import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../../services/api";
import { verifyEmail, verifyPhone } from "../../../services/marathonApi";

export default function RegisterForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [userId, setUserId] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    dob: "",
    gender: "",
    city: "",
    state: "",
    role: "USER",
    password: "",
    confirmPassword: "",
  });
  
  const [otpData, setOtpData] = useState({ emailOtp: "", phoneOtp: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (step === 1) {
        setFormData((prev) => ({ ...prev, [name]: value }));
    } else {
        setOtpData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const registrationData = {
        fname: formData.firstName,
        lname: formData.lastName,
        phone_number: formData.phone,
        email: formData.email,
        dob: formData.dob,
        gender: formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1),
        city: formData.city,
        state: formData.state,
        password: formData.password,
        confirm_password: formData.confirmPassword,
        role: formData.role,
      };

      const response = await authService.register(registrationData);
      if (response.userId) {
          setUserId(response.userId);
          setStep(2);
          setSuccess("Registration initiated. Please check your email and phone for OTP.");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
      e.preventDefault();
      setError("");
      setLoading(true);

      try {
          if (otpData.emailOtp) {
              await verifyEmail(userId, otpData.emailOtp);
          }
          if (otpData.phoneOtp) {
              await verifyPhone(userId, otpData.phoneOtp);
          }
          setSuccess("Verification successful! Redirecting to login...");
          setTimeout(() => navigate("/login"), 2000);
      } catch (err) {
          setError("Verification failed. Invalid OTP.");
      } finally {
          setLoading(false);
      }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-white to-blue-100 flex flex-col">
      <div className="bg-gradient-to-r from-orange-500 to-blue-600 text-white py-6 shadow-md">
        <h1 className="text-3xl md:text-4xl font-bold text-center tracking-wide">
          Vadodara Marathon 2026
        </h1>
        <p className="text-center mt-2 text-sm md:text-base">
          {step === 1 ? "Participation Registration Form" : "Verify Your Account"}
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="bg-white w-full max-w-5xl rounded-2xl shadow-xl border border-gray-200 overflow-hidden grid md:grid-cols-2">
          <div className="hidden md:flex bg-gradient-to-br from-orange-50 to-blue-50 items-center justify-center p-8">
            <img
              src="https://cdn1.iconfinder.com/data/icons/open-doodles/1024/RunningDoodle-512.png"
              alt="Marathon Illustration"
              className="w-72 h-72 object-contain animate-pulse"
            />
          </div>

          <div className="p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">
              {step === 1 ? "Create Your Account" : "Enter Verification Codes"}
            </h2>

            {step === 1 ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <input type="text" name="firstName" required value={formData.firstName} onChange={handleChange} placeholder=" " className="peer w-full px-4 pt-5 pb-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                  <label className="absolute left-4 top-2 text-gray-500 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all">First Name</label>
                </div>
                <div className="relative">
                  <input type="text" name="lastName" required value={formData.lastName} onChange={handleChange} placeholder=" " className="peer w-full px-4 pt-5 pb-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                  <label className="absolute left-4 top-2 text-gray-500 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all">Last Name</label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <input type="tel" name="phone" pattern="[0-9]{10}" required value={formData.phone} onChange={handleChange} placeholder=" " className="peer w-full px-4 pt-5 pb-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                  <label className="absolute left-4 top-2 text-gray-500 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all">Phone Number</label>
                </div>
                <div className="relative">
                  <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder=" " className="peer w-full px-4 pt-5 pb-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                  <label className="absolute left-4 top-2 text-gray-500 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all">Email Address</label>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <input type="text" name="city" required value={formData.city} onChange={handleChange} placeholder=" " className="peer w-full px-4 pt-5 pb-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                  <label className="absolute left-4 top-2 text-gray-500 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all">City</label>
                </div>
                <div className="relative">
                  <input type="text" name="state" required value={formData.state} onChange={handleChange} placeholder=" " className="peer w-full px-4 pt-5 pb-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                  <label className="absolute left-4 top-2 text-gray-500 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all">State</label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <input type="date" name="dob" required value={formData.dob} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>
                <div className="relative">
                  <select name="gender" required value={formData.gender} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white">
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative md:col-span-2">
                    <select name="role" required value={formData.role} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white">
                        <option value="USER">User</option>
                        <option value="INFLUENCER">Influencer</option>
                        <option value="SPONSOR">Company/Sponsor</option>
                        <option value="BRAND">Brand</option>
                    </select>
                  </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <input type="password" name="password" required minLength={6} value={formData.password} onChange={handleChange} placeholder=" " className="peer w-full px-4 pt-5 pb-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                  <label className="absolute left-4 top-2 text-gray-500 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all">Password</label>
                </div>
                <div className="relative">
                  <input type="password" name="confirmPassword" required minLength={6} value={formData.confirmPassword} onChange={handleChange} placeholder=" " className="peer w-full px-4 pt-5 pb-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                  <label className="absolute left-4 top-2 text-gray-500 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all">Confirm Password</label>
                </div>
              </div>

              {error && <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>}

              <button type="submit" disabled={loading} className={`w-full bg-gradient-to-r from-orange-500 to-blue-600 text-white py-3 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all ${loading ? "opacity-70 cursor-not-allowed" : ""}`}>
                {loading ? "Creating Account..." : "Register Now"}
              </button>

              <p className="text-center text-gray-600 mt-4">
                Already registered? <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">Login here</Link>
              </p>
            </form>
            ) : (
                <form onSubmit={handleVerify} className="space-y-6">
                    {success && <div className="p-3 bg-green-100 text-green-700 rounded-lg text-sm">{success}</div>}
                    <div className="relative">
                        <input type="text" name="emailOtp" required value={otpData.emailOtp} onChange={handleChange} placeholder=" " className="peer w-full px-4 pt-5 pb-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                        <label className="absolute left-4 top-2 text-gray-500 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all">Email OTP</label>
                    </div>
                    <div className="relative">
                        <input type="text" name="phoneOtp" required value={otpData.phoneOtp} onChange={handleChange} placeholder=" " className="peer w-full px-4 pt-5 pb-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                        <label className="absolute left-4 top-2 text-gray-500 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all">Phone OTP</label>
                    </div>
                    {error && <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>}
                    <button type="submit" disabled={loading} className={`w-full bg-gradient-to-r from-green-500 to-teal-600 text-white py-3 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all ${loading ? "opacity-70 cursor-not-allowed" : ""}`}>
                        {loading ? "Verifying..." : "Verify OTPs"}
                    </button>
                </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
