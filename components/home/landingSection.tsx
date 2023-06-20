


function LandingSection() {
    return (
        <div className="relative px-6 isolate pt-14 lg:px-8 ">
            <div className="max-w-2xl py-32 mx-auto sm:py-48 lg:py-56">
                <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                    <div className="relative px-3 py-1 text-sm leading-6 text-white rounded-full ring-1 ring-gray-200/20 hover:ring-gray-100">
                        Announcing the moto behind CodeCommunity&Music{' '}
                        <a href="/" className="font-semibold text-indigo-600">
                            <span className="absolute inset-0" aria-hidden="true" />
                            Read more <span aria-hidden="true">&rarr;</span>
                        </a>
                    </div>
                </div>
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                        <span className="block xl:inline">Code Community Music</span>
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-white">
                        CodeCommunityMusic is a community of developers and musicians who are passionate about
                        music and code.
                    </p>
                    <div className="flex items-center justify-center mt-10 gap-x-6">
                        <a
                            href="#"
                            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Get started
                        </a>
                        <a href="#" className="text-sm font-semibold leading-6 text-white">
                            Learn more <span aria-hidden="true">→</span>
                        </a>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default LandingSection