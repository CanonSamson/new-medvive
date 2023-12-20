import Image from "next/image";

const LoadingPage = () => {
    return (<div className=" w-full bg-white h-screen relative flex justify-center items-center">
        <Image
            className="w-[120px] animate-bounce"
            src="/logo.svg"
            width={120}
            height={100}
            alt=""
        />
    </div>);
}

export default LoadingPage;