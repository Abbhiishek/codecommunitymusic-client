"use client"

import { Team } from '@/config/team'
import Image from 'next/image'
import EarthRotationModel from '../3dModels/Earth'


export default function TeamSection() {
    return (

        <div className="py-24 sm:py-32">
            <div className="grid px-6 mx-auto max-w-7xl gap-x-8 gap-y-20 lg:px-8 xl:grid-cols-3">
                <div className="max-w-2xl">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Meet our Team</h2>
                    <p className="mt-6 text-lg leading-8 ">
                        We are a team of passionate developers who are working on this project to make it a success.
                    </p>
                    <span>
                        <a href={"/contributors"} className='text-base hover:text-lg ease-in-out duration-200 font-semibold leading-7 text-indigo-600'>
                            View Contributors <span aria-hidden="true">&rarr;</span>
                        </a>
                    </span>
                </div>
                <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
                    {Team.map((person) => (
                        <li key={person.name}>
                            <div className="flex items-center gap-x-6">
                                <Image
                                    className="w-16 h-16 rounded-full"
                                    width={64}
                                    height={64}
                                    src={person.imageUrl} alt="" />
                                <div>
                                    <h3 className="text-base font-semibold leading-7 tracking-tight ">{person.name}</h3>
                                    <p className="text-sm font-semibold leading-6 text-indigo-600">{person.role}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
