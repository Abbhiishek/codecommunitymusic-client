import Image from 'next/image';
import Link from 'next/link';
import readingTime from "reading-time";
import { Badge } from '../ui/badge';
import styles from './BlogCard.module.css';
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
        < >
            <Link href={`/blog/${blogslug}`} passHref >
                <div className="duration-200 ease-linear cursor-pointer text-start hover:scale-105">
                    <div className={styles.container}>
                        <div className={styles.card}>
                            <div className={styles.card__header}>
                                <Image
                                    src={blogImage}
                                    alt="card__image"
                                    className={styles.card__image}
                                    width="600"
                                    height="400"
                                />
                            </div>
                            <div className={styles.card__body}>
                                <h4 className="text-xl truncate">{title}</h4>
                                <p className="text-base truncate">{body}</p>
                                <div className='flex flex-wrap gap-2'>
                                    {
                                        tag.map((tag, index) => (
                                            <Badge key={index} variant={'default'}
                                                className='px-1 py-3 text-sm truncate '
                                            >
                                                {tag}
                                            </Badge>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className={styles.card__footer}>
                                <div className={styles.user}>
                                    <Image
                                        src={authorImage}
                                        alt="user__image"
                                        className={styles.user__image}
                                        width="50"
                                        height="50"
                                    />
                                    <div className={styles.user__info}>
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
        </>
    );
};

export default BlogCard;
