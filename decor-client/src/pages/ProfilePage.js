import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import UserProfile from "../components/UserProfile";

const ProfilePage = () => {
    return (
        <div className="profile-page">
            <Header/>
            <UserProfile/>
            <Footer/>
        </div>
    );
}

export default ProfilePage;