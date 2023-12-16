import Icon from "@/components/Icon";
import Layout from "@/components/Layout";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <Layout className="">
      <header className=" flex flex-col-reverse tablet:flex-row items-center tablet:pt-10 gap-20 tablet:pl-20">
        <div className=" px-4 ">
          <span className="text-xl font-mono tracking-[4px]">EFFORTLESSLY</span>
          <h1 className=" text-6xl font-semibold">Consult top doctors</h1>
          <p className=" pr-10 w-[80%] text-xl flex  mt-4">
            Get 24/7 online consultations with the best doctorswithout breaking
            a sweat and your bank.
          </p>
          <Link href="/signup">
            <button className=" leading-none items-center gap-1 bg-primary flex text-white mt-10  px-5 text-base py-3 rounded-full">
              Start a consult now <Icon name="arrowright" size={24} />
            </button>
          </Link>
        </div>
        <Image
          className=" h-[400px] object-cover tablet:rounded-l-xl w-full tablet:min-w-[600px]"
          src="/hero-image.png"
          width={400}
          height={400}
          alt="hero-image"
        />
      </header>

      <section className="text-base py-[100px]">
        <div className="text-center">
          <h2 className=" text-3xl">How it works?</h2>
          <p>Consult with an urgent care provider in 3 easy steps</p>
        </div>
        <div className="grid text-center max-w-[1100px] mx-auto mt-14 px-4 tablet:px-0  tablet:grid-cols-3 gap-5">
          <div className="flex flex-col items-center">
            <span
              className=" bg-primary w-[40px] h-[40px] 
             text-white font-semibold flex 
             rounded-full items-center justify-center"
            >
              1
            </span>
            <h2 className=" text-xl font-medium">Describe your issue</h2>
            <p>Register and tell us about your medical issue to get started.</p>

            <div className=" h-[300px] bg-primary/20 mt-10 w-full rounded-lg p-10">
              <ul className=" grid gap-4">
                <li className=" flex items-center gap-2">
                  <Icon name="checked" size={24} />
                  <span>Cold/flu</span>
                </li>
                <li className=" flex items-center gap-2">
                  <Icon name="unchecked" size={24} />
                  <span>STD</span>
                </li>
                <li className=" flex items-center gap-2">
                  <Icon name="unchecked" size={24} />
                  <span>UTI</span>
                </li>
                <li className=" flex items-center gap-2">
                  <Icon name="unchecked" size={24} />
                  <span>Sexual Health</span>
                </li>
                <li className=" flex items-center gap-2">
                  <Icon name="unchecked" size={24} />
                  <span>Skin</span>
                </li>
                <li className=" flex items-center gap-2">
                  <Icon name="unchecked" size={24} />
                  <span>Covid</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <span
              className=" bg-primary w-[40px] h-[40px] 
             text-white font-semibold 
            flex rounded-full items-center justify-center"
            >
              2
            </span>

            <h2 className=" text-xl font-medium">Chat with a doctor</h2>
            <p>
              Connect with a board-certified doctor. You can chat, send pictures
              and videos.
            </p>

            <div className="  shadow-xl gap-4 h-[300px] bg-[#FBFBFB] mt-10 w-full rounded-lg p-5 grid">
              <span className=" bg-primary p-2 flex text-white mr-[10%] text-start rounded-xl">
                Hi {`I’m `} Dr. Nicole. How may I help you?
              </span>
              <span className=" bg-white shadow-lg  bg- p-2 flex  ml-[10%] text-start rounded-xl">
                Hi Dr. Nicole, I have a fever and a terrible sore throat. Can I
                get antibiotics for that, please?
              </span>
              <div className="bg-primary w-[100px] justify-center p-2 flex items-center gap-2 rounded-xl">
                <span
                  className=" bg-white w-[16px] animate-pulse h-[16px] 
            flex rounded-full items-center justify-center"
                ></span>
                <span
                  className=" bg-white w-[18px] animate-pulse h-[18px] 
            flex rounded-full items-center justify-center"
                ></span>
                <span
                  className=" bg-white animate-pulse w-[20px] h-[20px] 
            flex rounded-full items-center justify-center"
                ></span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <span
              className=" bg-primary w-[40px] h-[40px] 
             text-white font-semibold 
            flex rounded-full items-center justify-center"
            >
              3
            </span>
            <h2 className=" text-xl font-medium">Get a prescription</h2>
            <p>
              Our online doctors can help you with your medical issues and give
              you prescriptions.
            </p>

            <div className=" text-start  shadow-xl flex flex-col justify-between gap-4 h-[300px] bg-[#FBFBFB] mt-10 w-full overflow-hidden rounded-lg ">
              <div className=" flex items-center gap-4 bg-primary/20 px-5 py-2">
                <Icon name="bookmark" size={24} />
                <span>Prescription</span>
              </div>
              <div className="text-base flex flex-col gap-4 px-5 pt-5 ">
                <div className="flex items-start gap-2">
                  <Icon name="bookmark" size={30} />

                  <span>
                    Azithromycin 250mg, two tablets on day 1 and then one tablet
                    for the next 4 days.
                  </span>
                </div>

                <div className="flex items-start gap-2">
                  <Icon name="bookmark" size={30} />

                  <span>
                    Benzydamine HCl Gargles 0.15% solution, thrice daily for 7
                    days.
                  </span>
                </div>
              </div>

              <button className="mx-5 mb-5 items-start mr-auto text-primary">
                Send Prescription
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Link href="/signup">
            <button className="flx items-center gap-1 bg-primary flex text-white mt-10  px-5 text-base py-3 rounded-full">
              Talk to a doctor <Icon name="arrowright" size={24} />
            </button>
          </Link>
        </div>
      </section>

      <section className=" bg-gradient-to-tr from-[#132F7A] relative text-white to-primary">
        <Image
          src="/drug.svg"
          alt=""
          width={300}
          height={300}
          className=" right-20 top-20 mx-auto absolute"
        />
        <div className=" pb-20 px-4 tablet:px-0 relative z-10 max-w-[1100px] mx-auto grid tablet:grid-cols-2 pt-20 gap-10">
          <Image
            src="/a-guy-with-a-blue-polo.png"
            alt=""
            width={300}
            height={300}
            className=" mx-auto hidden tablet:flex"
          />
          <div>
            <h1 className=" text-5xl font-semibold">Get started today</h1>
            <p className=" pr-10 w-full text-xl tablet:w-[80%] flex  mt-4">
              Connect with our online doctors instantly for swift medical
              advice, online prescriptions, and referrals—all within minutes.
              Experience on-demand healthcare services at your fingertips,
              ensuring convenience and prompt care whenever you need it.
            </p>
            <Link href="/signup">
              <button className="flx items-center gap-1 bg-primary flex text-white mt-10  px-5 text-base py-3 rounded-full">
                Talk to a doctor <Icon name="arrowright" size={24} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section className=" relative w-full overflow-x-hidden">
        <div className=" relative z-10 px-4 tablet:px-0 max-w-[1100px] mx-auto  pt-20 ">
          <div className=" text-center">
            <h4 className=" font-semibold text-2xl">
              Quality healthcare at your convenience
            </h4>
            <p>
              {`We're`} here to make sure everyone can easily connect with
              experienced virtual doctors worldwide.
            </p>
          </div>
          <div className=" grid tablet:grid-cols-3  gap-5 mt-10 text-center">
            <div className="flex flex-col items-center justify-center p-5 py-10 h-[300px] rounded-xl  shadow-xl">
              <Image
                src="/heart-b.svg"
                alt=""
                width={50}
                height={50}
                className=" mx-auto"
              />
              <h5 className="mt-4 font-semibold ">Doctor chat 24/7</h5>
              <p>
                Register and tell us about your medical issue to get started.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center p-5 py-10 h-[300px] rounded-xl  shadow-xl">
              <Image
                src="/health-support.svg"
                alt=""
                width={50}
                height={50}
                className=" mx-auto"
              />
              <h5 className="mt-4 font-semibold ">Sexual health support</h5>
              <p>
                Join us by registering and sharing your medical issue to get
                started..
              </p>
            </div>

            <div className="flex flex-col items-center justify-center p-5 py-10 h-[300px] rounded-xl  shadow-xl">
              <Image
                src="/media.svg"
                alt=""
                width={50}
                height={50}
                className=" mx-auto"
              />
              <h5 className="mt-4 font-semibold ">Audio/video chat</h5>
              <p>Sign up and share your medical concern to get started.</p>
            </div>
          </div>
        </div>

        <div className=" max-w-[700px] mx-auto relative z-20 px-10 tablet:px-0 py-[100px]">
          <span className=" text-3xl tablet:text-4xl font-serif  font-thin">
            At Medvive, our mission is to deliver accessible and cost-effective
            virtual healthcare services for you and your family 24/7. Our team
            of board-certified online doctors is dedicated to ensuring your
            well-being at your convenience.
          </span>
        </div>
        <Image
          src="/health-support.svg"
          alt=""
          width={500}
          height={500}
          className=" absolute -right-[250px]  bottom-5  mx-auto"
        />
      </section>
    </Layout>
  );
}
