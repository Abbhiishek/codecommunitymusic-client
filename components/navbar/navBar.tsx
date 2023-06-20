'use client'

import { useGetSessionUser } from '@/hooks/user/get-current-user'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/20/solid'
import { Github, TwitterIcon } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import LoginNavSection from './LoginNavSection'

const navigation = [
    { name: 'Project', href: '/project' },
    { name: 'Forum', href: '/forum' },
    { name: 'Blog', href: '/blog' },
    { name: 'Marketplace', href: '/marketplace' },
]

function NavBar() {
    const { data: user, isLoading } = useGetSessionUser()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    return (
        <div className="sticky inset-x-0 top-0 z-50 border-b-2 shadow-2xl bg-opacity-95 bg-slate-900 bg-">
            <nav className="container flex items-center justify-between p-3 lg:px-8" aria-label="Global"
            >
                <div className="flex lg:flex-1">
                    <Link href='/' passHref legacyBehavior>
                        <a className="-m-1.5 p-1.5">
                            <span className="sr-only">Code Community Music</span>
                            <div>
                                <svg width="50" height="20" viewBox="0 0 2253 808" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M178.171 404C178.171 455.055 190.049 499.821 213.805 538.297C238.328 576.033 270.13 605.26 309.213 625.978C348.295 645.956 390.826 655.945 436.806 655.945C475.122 655.945 509.224 651.136 539.111 641.516C568.997 631.897 595.819 618.949 619.575 602.67C644.097 586.392 665.171 568.634 682.797 549.396V728.088C649.845 753.245 613.827 772.853 574.745 786.912C536.429 800.971 487.767 808 428.76 808C367.454 808 310.362 798.381 257.486 779.143C205.375 759.905 159.779 732.158 120.696 695.901C82.3801 659.645 52.4934 617.099 31.0362 568.264C10.3454 518.689 0 463.934 0 404C0 344.066 10.3454 289.681 31.0362 240.846C52.4934 191.271 82.3801 148.355 120.696 112.099C159.779 75.8425 205.375 48.0952 257.486 28.8572C310.362 9.61906 367.454 0 428.76 0C487.767 0 536.429 7.0293 574.745 21.0879C613.827 35.1465 649.845 54.7546 682.797 79.9121V258.604C665.171 239.366 644.097 221.608 619.575 205.33C595.819 189.051 568.997 176.103 539.111 166.484C509.224 156.864 475.122 152.055 436.806 152.055C390.826 152.055 348.295 162.414 309.213 183.132C270.13 203.11 238.328 231.967 213.805 269.703C190.049 307.44 178.171 352.205 178.171 404Z" fill="white" />
                                    <path d="M913.844 404C913.844 455.055 925.722 499.821 949.478 538.297C974.001 576.033 1005.8 605.26 1044.89 625.978C1083.97 645.956 1126.5 655.945 1172.48 655.945C1210.8 655.945 1244.9 651.136 1274.78 641.516C1304.67 631.897 1331.49 618.949 1355.25 602.67C1379.77 586.392 1400.84 568.634 1418.47 549.396V728.088C1385.52 753.245 1349.5 772.853 1310.42 786.912C1272.1 800.971 1223.44 808 1164.43 808C1103.13 808 1046.04 798.381 993.159 779.143C941.049 759.905 895.452 732.158 856.37 695.901C818.053 659.645 788.167 617.099 766.71 568.264C746.019 518.689 735.673 463.934 735.673 404C735.673 344.066 746.019 289.681 766.71 240.846C788.167 191.271 818.053 148.355 856.37 112.099C895.452 75.8425 941.049 48.0952 993.159 28.8572C1046.04 9.61906 1103.13 0 1164.43 0C1223.44 0 1272.1 7.0293 1310.42 21.0879C1349.5 35.1465 1385.52 54.7546 1418.47 79.9121V258.604C1400.84 239.366 1379.77 221.608 1355.25 205.33C1331.49 189.051 1304.67 176.103 1274.78 166.484C1244.9 156.864 1210.8 152.055 1172.48 152.055C1126.5 152.055 1083.97 162.414 1044.89 183.132C1005.8 203.11 974.001 231.967 949.478 269.703C925.722 307.44 913.844 352.205 913.844 404Z" fill="white" />
                                    <path d="M1877.66 234.547L1517.33 167.993L1517.33 22.1978L2253 123.961L1800.59 410.659L2253 697.358L1517.33 799.121L1517.33 653.326L1910.69 609.293L1582.39 410.659L1746.54 311.342L1877.66 234.547Z" fill="white" />
                                </svg>
                            </div>
                        </a>
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="w-10 h-10 text-white " aria-hidden="true" />
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map((item) => (
                        <Link href={item.href} key={item.name} passHref legacyBehavior>
                            <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-200">
                                {item.name}
                            </a>
                        </Link>
                    ))}
                </div>

                <div className="items-center hidden gap-5 mr-3 lg:flex lg:flex-1 lg:justify-end">
                    <Link href="https://github.com/Abbhiishek/codecommunitymusic" legacyBehavior
                        className='w-6 h-6 hover:bg-white'
                    >
                        <Github className="w-8 h-8 p-1 text-white rounded-full hover:text-black hover:bg-white" />
                    </Link>
                    <Link href="https://twitter.com/abbhishekstwt" legacyBehavior>
                        <TwitterIcon className="w-8 h-8 p-1 text-white rounded-full hover:text-black hover:bg-white" />
                    </Link>
                    <LoginNavSection user={user} />
                </div>

            </nav >
            <Dialog as="div" className=" lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-50 " />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full px-6 py-6 overflow-y-auto bg-gray-900 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-end ">
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-white"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="flow-root mt-6">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="py-6 space-y-2">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        legacyBehavior
                                    >
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-white rounded-lg hover:bg-gray-50 hover:text-gray-900"
                                        >
                                            {item.name}
                                        </a>
                                    </Link>
                                ))}
                            </div>
                            <div className="py-6 ">
                                {isLoading ? null : <LoginNavSection user={user} />}
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </div >
    )
}

export default NavBar



