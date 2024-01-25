import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo/logo.png";

const LOGOSIZE = {
  md: "w-logo_md",
  lg: "w-logo_lg",
};

export default function Logo({ size }) {
  return (
    <Link to="/" className="shrink-0">
      <img src={logo} alt="TechTalk logo" className={LOGOSIZE[size]} />
    </Link>
  );
}
