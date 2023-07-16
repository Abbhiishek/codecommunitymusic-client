import styles from "./YoutubeCard.module.css";

export default function YouTube({ id }: { id: string }) {
    return (
        <div className={styles.container}>
            <iframe
                src={`https://www.youtube.com/embed/${id}`}
                width="560" height="315"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                title="Embedded YouTube video"
                className={styles.frame}
            />
        </div>
    );
}