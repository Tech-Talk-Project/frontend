import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";

export default function Logo({ size }) {
  return (
    <Link>
      <img src={logo} alt="TechTalk logo" className={`w-[${size}px]`} />
    </Link>
  );
}
