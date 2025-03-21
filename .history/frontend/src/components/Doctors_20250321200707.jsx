import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import "./styles.css";
import { useSelector, useDispatch } from "react-redux";
import { setDoctors, setError, setLoading } from "../redux/doctorSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Medicals Data
const medicals = [
  {
    title: "Laxmi Medical Stores Raipur",
    img: "/laxmi.jpg",
    description:
      "Rajbandha Road Opp. Dr. B. R. Ambedkar Hospital (MEKHARA Gate No 2, Chhattisgarh 492001",
    points: "Ph No: 07714088185",
  },
  {
    title: "Bhagyalaxmi Medical Store",
    img: "/bhagya.avif",
    description:
      "Front of Shantiniketan School, opposite gate no 2, Adarsh Nagar, Dubey Colony, Mowa, Raipur, Chhattisgarh 492001",
    points: "Ph No: 07000767203",
  },
  {
    title: "Shree Ganesh Medical Store",
    img: "/ganesh.avif",
    description:
      "Baudha Vihar, New, near Government School, Changurabhata, Raipur, Chhattisgarh 492013",
    points: "Ph No: 08770864372",
  },
  {
    title: "Manish Medical Stores",
    img: "/manish.avif",
    description:
      "6JQH+FM5, Tatyapara, Kankalipara, Brahman Para, Raipur, Chhattisgarh 492001",
    points: "Ph No: 09098764654",
  },
  {
    title: "Seema Medicals",
    img: "/seema.jpg",
    description:
      "Nagdev Plaza, Infornt of Raipur Hospital, Kutchery Chowk, Raipur, Chhattisgarh 492001",
    points: "Ph No: 08518887133",
  },
  {
    title: "Shivam Medical Stores",
    img: "/shivam.webp",
    description:
      "Tikrapara, Raipur, Dhamtari Road, Tikrapara, Raipur-Chhattisgarh - 492001 (Near Hardev Lala Mandir Chowk)",
    points: "Ph No: 9999999999",
  },
];

const Doctors = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      dispatch(setLoading(true));
      try {
        const response = await axios.get("/api/doctors");
        const doctorsData = Array.isArray(response.data) ? response.data : [];
        dispatch(setDoctors(doctorsData));
      } catch (error) {
        dispatch(setError("Failed to load doctors!"));
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchDoctors();
  }, [dispatch]);

  useEffect(() => {
    fetch("/Animation - 1741258183863.json")
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error("Error loading animation:", error));
  }, []);

  const { doctors } = useSelector((store) => store.doctorKey);
  const doctorsList = Array.isArray(doctors) ? doctors : [];

  return (
    <>
      <div className="doctors-container">
        <div className="doctors-content">
          <div className="doctors-text">
            <div className="title">Meet Our Doctors 👨‍⚕️👩‍⚕️</div>
            <div className="texts">
              <b>1. Your Health, Our Priority! ❤️</b>
              <div className="subtexts">
                Our expert doctors 🏥 provide the best healthcare solutions.
              </div>
              <b>2. Connect with Specialists 🩺</b>
              <div className="subtexts">
                Schedule consultations 📅 and get medical advice.
              </div>
              <b>3. 24/7 Medical Assistance 🚑</b>
              <div className="subtexts">
                Get round-the-clock support & emergency help.
              </div>
              <br />
              <button className="button-64">
                <span className="text">Book Appointment</span>
              </button>
              <div className="arrow">
                <img
                  src="/green-arrow-outline-pointing-down-animation.gif"
                  alt="Arrow GIF"
                  style={{ width: "110px", height: "110px", marginTop: "12px" }}
                />
              </div>
            </div>
          </div>
          <div className="doctors-image">
            {animationData && (
              <Lottie
                animationData={animationData}
                loop={true}
                className="animation-style"
              />
            )}
          </div>
        </div>
      </div>

      {/* Specialities Section */}
      <div className="speci">
        <h3>Find by Speciality</h3>
      </div>
      <div className="stylish">
        <button className="button-92">General Physician</button>
        <button className="button-92">Gynecologist</button>
        <button className="button-92">Dermatologist</button>
        <button className="button-92">Pediatricians</button>
        <button className="button-92">Cardiologist</button>
      </div>

      {/* Doctors Section */}
      <div className="rewards-container">
        <h2 className="text-center text-2xl font-bold mb-4">Our Doctors 🩺</h2>
        <div className="rewards-grid">
          {doctorsList.length > 0 ? (
            doctorsList.map((doctor) => (
              <div
                key={doctor._id}
                className="card bg-base-100 image-full max-w-sm shadow-sm items-center flex"
              >
                <img
                  src={
                    doctor.profileImage ||
                    "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                  }
                  alt={doctor.name}
                />
                <div className="card-body">
                  <h2 className="card-title">{doctor.name}</h2>
                  <p className="uppercase font-semibold">{doctor.speciality}</p>
                  <p>Fees: {doctor.fees} ₹</p>
                  <div>
                    <button
                      onClick={() => navigate(`/appointment/${doctor._id}`)}
                      className="bg-orange-400 px-4 py-2 rounded-xl text-2xl"
                    >
                      More Information
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No doctors available</p>
          )}
        </div>
      </div>

      {/* Medicals Section */}
      <div className="rewards-container">
        <h2 className="text-center text-2xl font-bold mb-4">
          Nearby Medicals 🏥
        </h2>
        <div className="rewards-grid">
          {medicals.map((medical, index) => (
            <div className="card" key={index}>
              <img
                src={medical.img}
                className="card-img-top"
                alt={medical.title}
              />
              <div className="card-body">
                <h5 className="card-title">{medical.title}</h5>
                <p className="card-text">{medical.description}</p>
                <a href="#" className="btn btn-primary">
                  {medical.points}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Doctors;
