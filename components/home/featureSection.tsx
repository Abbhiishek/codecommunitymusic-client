import { FolderMinusIcon } from '@heroicons/react/20/solid'
import { WarehouseIcon, WorkflowIcon } from 'lucide-react'
import Image from 'next/image'
const features = [
    {
        name: 'Projects',
        description:
            'Get a list of projects that you can contribute to. You can also create your own project and get help from other developers.',
        icon: WorkflowIcon,
    },
    {
        name: 'Forums ',
        description: 'Get involved in the community by asking questions and helping others.',
        icon: FolderMinusIcon,
    },
    {
        name: 'Marketplace',
        description: 'Get paid for your work, or hire someone to help you with your project.',
        icon: WarehouseIcon,
    },
]

export default function FeatureSection() {
    return (
        <div className="py-10 overflow-hidden sm:py-32">
            <div className="px-6 mx-auto max-w-7xl lg:px-8">
                <div className="grid max-w-2xl grid-cols-1 mx-auto gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                    <div className="lg:pr-8 lg:pt-4">
                        <div className="lg:max-w-lg">
                            <h2 className="text-base font-semibold leading-7 text-indigo-600">Connect faster</h2>
                            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">A better Community</p>
                            <p className="mt-6 text-lg leading-8 text-gray-600">
                                Code Community Music is a community of developers who are passionate about
                                music and code.
                                We aim to provide a platform for developers and students to learn and grow together.
                            </p>
                            <div className="max-w-xl mt-10 space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                                {features.map((feature) => (
                                    <div key={feature.name} className="relative pl-9">
                                        <div className="inline font-semibold text-white">
                                            <feature.icon className="absolute w-5 h-5 text-indigo-600 left-1 top-1" aria-hidden="true" />
                                            {feature.name}
                                        </div>{' '}
                                        <div className="inline text-gray-500">{feature.description}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='shadow-2xl shadow-indigo-800 bg-none rounded-xl'>
                        <Image
                            src="/projects.png"
                            alt="Product screenshot"
                            className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
                            width={2432}
                            height={1442}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
