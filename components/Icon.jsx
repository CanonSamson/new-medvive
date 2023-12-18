// components/Icon.js
import React from "react";
import {
  MdCheckCircleOutline,
  MdCheckCircle,
  MdRadioButtonChecked,
  MdRadioButtonUnchecked,
} from "react-icons/md";
import { IoCheckmarkDoneSharp, IoCloseOutline } from "react-icons/io5";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { IoMdArrowForward } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
import { BiBookmarkAltPlus } from "react-icons/bi";
import {
  AiOutlineLinkedin,
  AiOutlineInstagram,
  AiOutlineEyeInvisible,
  AiOutlineEye,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { BsChatSquareDotsFill } from "react-icons/bs";
import { FaUserDoctor } from "react-icons/fa6";
import { FaFileMedicalAlt } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { GrNotification } from "react-icons/gr";
import { BiSearch, BiFilter } from "react-icons/bi";

import {
  AiOutlineClose,
  AiOutlineMessage,
  AiOutlineFieldTime,
  AiOutlinePlusCircle,
  AiOutlinePlus,
  AiOutlineDelete,
  AiOutlineStar,
  AiOutlineVideoCamera,
  AiOutlineMinus,
  AiOutlineHistory,
  AiOutlineMinusCircle,
} from "react-icons/ai";
import { BsCameraVideo, BsFillQuestionCircleFill } from "react-icons/bs";
import { FiPhoneCall, FiEdit2, FiX } from "react-icons/fi";

import { IoMdPerson, IoIosArrowBack } from "react-icons/io";
import { IoSettingsSharp, IoCallOutline } from "react-icons/io5";
import { FaSuitcaseMedical } from "react-icons/fa6";

import { BiPhoneCall, BiSolidTime } from "react-icons/bi";
import { PiPhoneCallFill } from "react-icons/pi";
import {
  MdDateRange,
  MdOutlineDateRange,
  MdOutlineSecurity,
  MdOutlineArrowForwardIos,
  MdFeedback,
  MdOutlineBookmarkAdded,
} from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const iconComponents = {
  checkmark: IoCheckmarkDoneSharp,
  marker: HiOutlineLocationMarker,
  close: IoCloseOutline,
  bar: HiMiniBars3BottomRight,
  arrowright: IoMdArrowForward,
  checkoutline: MdCheckCircleOutline,
  checkcircle: MdCheckCircle,
  checked: MdRadioButtonChecked,
  unchecked: MdRadioButtonUnchecked,
  bookmark: BiBookmarkAltPlus,
  linkedin: AiOutlineLinkedin,
  intagram: AiOutlineInstagram,
  EyeInvisible: AiOutlineEyeInvisible,
  Eye: AiOutlineEye,
  loading: AiOutlineLoading3Quarters,
  google: FcGoogle,
  settings: IoSettings,
  chat: BsChatSquareDotsFill,
  doctor: FaFileMedicalAlt,
  consult: FaUserDoctor,
  home: GoHomeFill,
  notification: GrNotification,
  search: BiSearch,
  filter: BiFilter,
  backarrow: IoIosArrowBack,
};

const Icon = ({ name, ...props }) => {
  const IconComponent = iconComponents[name];

  if (!IconComponent) {
    console.error(`Icon '${name}' not found.`);
    return null;
  }

  return <IconComponent {...props} />;
};

export default Icon;
