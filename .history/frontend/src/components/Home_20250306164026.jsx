import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import "./styles.css";
const Home = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch("/Animation - 1741159934500.json")
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error("Error loading animation:", error));
  }, []);

  return (
    <div className="container">
      <div className="image">
        {animationData && (
          <Lottie
            animationData={animationData}
            loop={true}
            className="animation-style"
          />
        )}
      </div>
      <div className="text">
        <div className="title">MediTrack</div>
        <div className="texts">
          <b>
            {" "}
            1. Stay on Track with MediTrack! 🚀 <br />
          </b>
          <div className="subtexts">
            {" "}
            Never miss a dose! ⏰ Smart medicine reminders & health tracking for
            a better you. 💊🩺 <br />
          </div>
          <b> 2. Smart Healthcare, Smarter You! 🧠💡</b>
          <br />
          <div className="subtexts">
            {" "}
            MediTrack helps you manage your medications 💊 and stay healthy
            effortlessly. ✅<br />
          </div>
          3. Your Health, Our Priority! ❤️
          <br />
          <div className="subtexts">
            {" "}
            Get real-time medicine alerts 🔔, health analytics 📊, and doctor
            consultations 🏥 in one place.{" "}
          </div>
          4. MediTrack – Your Personal Health Assistant 🤖 <br />
          <div className="subtexts">
            {" "}
            Say goodbye to missed doses! 👋 Track 📋, remind ⏳, and stay
            healthy 💪 with ease.
          </div>
          <br />
          <button class="button-64" role="button">
            <span class="text">Get Started</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
