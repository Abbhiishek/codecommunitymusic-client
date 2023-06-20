/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { CalendarDaysIcon, HandRaisedIcon } from '@heroicons/react/24/outline'

export default function NewsLetterSection() {
    return (
        <div className="relative py-16 overflow-hidden isolate sm:py-24 lg:py-32">
            <div className="px-6 mx-auto max-w-7xl lg:px-8">
                <div className="grid max-w-2xl grid-cols-1 mx-auto gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
                    <div className="max-w-xl lg:max-w-lg">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Subscribe to our newsletter.</h2>
                        <p className="mt-4 text-lg leading-8 text-gray-300">
                            Get the latest news and articles to your inbox every week.
                        </p>
                        <div className="flex max-w-md mt-6 gap-x-4">
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                placeholder="Enter your email"
                            />
                            <button
                                type="submit"
                                className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                            >
                                Subscribe
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
                        <div className="flex flex-col items-start">
                            <div className="p-2 rounded-md bg-white/5 ring-1 ring-white/10">
                                <CalendarDaysIcon className="w-6 h-6 text-white" aria-hidden="true" />
                            </div>
                            <div className="mt-4 font-semibold text-white">Weekly articles</div>
                            <div className="mt-2 leading-7 text-gray-400">
                                We aim to publish a new article every week about news, updates and more.
                            </div>
                        </div>
                        <div className="flex flex-col items-start">
                            <div className="p-2 rounded-md bg-white/5 ring-1 ring-white/10">
                                <HandRaisedIcon className="w-6 h-6 text-white" aria-hidden="true" />
                            </div>
                            <div className="mt-4 font-semibold text-white">No spam</div>
                            <div className="mt-2 leading-7 text-gray-400">
                                We won&apos;t send you spam. Unsubscribe at any time.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
