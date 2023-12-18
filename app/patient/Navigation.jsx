"use client";
import Icon from "@/components/Icon";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navigation = () => {
  return (
    <div
      className={`  grid-cols-5  z-[40] bg-white shadow-gray-400 border-t md:max-w-[400px]
      text-[#929CAD] fixed h-[60px] bottom-0  left-0 w-full grid justify-center items-center`}
    >
      <CustomNavLink href="/patient">
        <Icon name="home" size={20} />
        <span className="text-[8px] opacity-80">Patient</span>
      </CustomNavLink>

      <CustomNavLink href="/bookings">
        <Icon name="consult" size={20} />
        <span className="text-[8px] opacity-80">Consultations</span>
      </CustomNavLink>
      <CustomNavLink href="/reports">
        <Icon name="doctor" size={20} />
        <span className="text-[8px] opacity-80">Reports</span>
      </CustomNavLink>

      <CustomNavLink href="/chats">
        <Icon name="chat" size={20} />
        <span className="text-[8px] opacity-80">Chats</span>
      </CustomNavLink>
      <CustomNavLink href="/patient/settings">
        <Icon name="settings" size={20} />
        <span className="text-[8px] opacity-80">Settings</span>
      </CustomNavLink>
    </div>
  );
};

function CustomNavLink({ href, children }) {
  const pathname = useRouter();

  return (
    <Link
      href={href}
      className={`${
        pathname == href ? "text-[#1648CE]" : "text-[#929CAD]"
      } relative flex flex-col items-center justify-between`}
    >
      {children}
    </Link>
  );
}

export default Navigation;
