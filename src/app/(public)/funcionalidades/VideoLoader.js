import styles from "@/styles/funcionalidades.module.css"
export default function VideoLoader ({url, title}) {

    return (
      <section className={styles.funcionalidadesSection}>
        <div className={styles.funcionalidadesVideo}>
          <iframe 
            width={440}
            height={250}
            src={url}
            frameBorder="0"
            allowFullScreen
            title={title}
          >
        </iframe>
        </div>
      </section>
    );
}