import Image from 'next/image';
import Link from 'next/link';
import readingTime from "reading-time";
import { Badge } from '../ui/badge';
export interface IBlogCard {
    tag: string[];
    title: string;
    body: string;
    author: string;
    date: string;
    blogImage: string;
    authorImage: string;
    blogslug: string;
    readingTime: string;

}

const BlogCard: React.FC<IBlogCard> = ({ blogslug, tag, title, body, author, date, blogImage, authorImage }) => {
    return (
        <Link href={`/blog/${blogslug}`} passHref className='w-full'>
            <div className="cursor-pointer text-start">
                <div className="">
                    <div className="flex flex-col overflow-hidden rounded-2xl">
                        <div >
                            <Image
                                src={`https://source.unsplash.com/1000x900/?coding,${tag.join(',')}`}
                                alt="card__image"
                                className="object-cover w-full h-full border-b-4 border-white rounded-t-2xl"
                                width="1000"
                                height="400"
                            />
                        </div>
                        <div className="flex flex-col gap-2 p-4 border-l-2 border-r-2 border-slate-600">
                            <h4 className="text-xl capitalize lg:text-2xl">{title}</h4>
                            <div className='flex flex-wrap w-full gap-1'>
                                {
                                    tag.map((tag, index) => (
                                        <Badge key={index} variant={'outline'}
                                            className='!px-2 !py-0 text-sm truncate '
                                        >
                                            {tag}
                                        </Badge>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="flex p-4 mt-auto border-b-2 border-l-2 border-r-2 border-slate-600 rounded-b-2xl">
                            <div className="flex gap-2">
                                <Image
                                    src={authorImage}
                                    alt={author}
                                    className="object-cover rounded-full"
                                    width="50"
                                    height="50"
                                />
                                <div className="flex flex-col">
                                    <h5>{author}</h5>
                                    <div className='flex gap-3'>
                                        <small>{
                                            new Date(date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })
                                        }</small>
                                        <small>{readingTime(body).text}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default BlogCard;
