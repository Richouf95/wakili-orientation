"use client";

import React, { useState, useRef, useEffect } from "react";
import useAuthContext from "@/hooks/useAuthContext";
import ContactUs from "../modals/contactUs/ContactUs";
import schoolDefaultLogo from "/public/images/schoolDefaultLogo.png";
import Image from "next/image";
import LogoutIcon from "@mui/icons-material/Logout";
import BadgeIcon from "@mui/icons-material/Badge";
import { useRouter } from "next/navigation";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Link from "next/link";
import ApartmentIcon from '@mui/icons-material/Apartment';

function Menu() {
  const { schoolOwner, dispatch } = useAuthContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  useEffect(() => {
    if (schoolOwner !== undefined) {
      setIsLoading(false);
    }
  }, [schoolOwner]);

  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMenuOpen]);

  if (isLoading) {
    return null; // Vous pouvez aussi mettre un indicateur de chargement ici si vous le souhaitez
  }

  const handleLogout = () => {
    localStorage.removeItem("schoolOwner");
    router.push("/");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div ref={menuRef} className="relative">
      {!schoolOwner ? (
        <ContactUs />
      ) : (
        <button
          onClick={handleClick}
          className="flex items-center border border-[#EB8E4E] rounded-xl md:p-1 cursor-pointer"
        >
          <Image
            src={schoolDefaultLogo}
            alt="defaultSchoolLogo"
            className="w-10"
          />
          <KeyboardArrowDownIcon />
        </button>
      )}
      {isMenuOpen && (
        <div className="absolute right-0 mt-2 p-2 md:mt-5 w-60 bg-white border rounded shadow-lg">
          <ul className="">
            <li
              className="px-4 py-2 hover:bg-gray-200 rounded cursor-pointer flex items-center text-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              <Link href={"/search"}>
                <ApartmentIcon fontSize="large" />
                <span className="mx-3">Etablissements</span>
              </Link>
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-200 rounded cursor-pointer flex items-center text-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              <Link href={"/owne-school"}>
                <BadgeIcon fontSize="large" />
                <span className="mx-3">Mon espace</span>
              </Link>
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-200 rounded cursor-pointer flex items-center text-lg"
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
            >
              <LogoutIcon fontSize="large" />
              <span className="mx-3">Déconnexion</span>
            </li>
            <li className="flex justify-center py-2" onClick={(e) => e.stopPropagation()}>
                <ContactUs />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Menu;
