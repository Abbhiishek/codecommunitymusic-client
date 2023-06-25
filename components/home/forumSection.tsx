import Image from "next/image";
import Link from "next/link";

export default function ForumSection() {
    return (
        <div className="py-24 mx-auto max-w-7xl sm:px-6 sm:py-32 lg:px-8">
            <div className="relative px-6 pt-16 overflow-hidden bg-gray-900 shadow-2xl isolate sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
                <svg
                    viewBox="0 0 1024 1024"
                    className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
                    aria-hidden="true"
                >
                    <circle cx={502} cy={502} r={502} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
                    <defs>
                        <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                            <stop stopColor="#FF00EE" />
                            <stop offset={1} stopColor="#039AFE" />
                        </radialGradient>
                    </defs>
                </svg>
                <div className="max-w-md mx-auto text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Boost your Knowledge.
                        <br />
                        Start asking questions Today.
                    </h2>
                    <p className="mt-6 text-lg leading-8 text-gray-300">
                        Code Community Music provides a forum for developers and students to ask questions and get answers.
                    </p>
                    <div className="flex items-center justify-center mt-10 gap-x-6 lg:justify-start">
                        <Link
                            href='/forum'
                            className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        >
                            Get started
                        </Link>
                        <a href="#" className="text-sm font-semibold leading-6 text-white">
                            Learn more <span aria-hidden="true">→</span>
                        </a>
                    </div>
                </div>
                <div className="relative mt-16 h-80 lg:mt-8">
                    <Image
                        className="absolute left-0 top-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10 "
                        src="/dashboard.png"
                        alt="App screenshot"
                        width={1824}
                        height={1080}
                    />
                </div>
            </div>
        </div>
    )
}
