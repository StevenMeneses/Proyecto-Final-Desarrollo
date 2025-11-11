import styles from "./Hero.module.css";

interface HeroProps {
  imagen: string;
  texto: boolean;
}

export default function Hero({ imagen, texto }: HeroProps) {
  return (
    <section
      className={styles.hero}
      style={{ backgroundImage: `url(${imagen})` }}
    >
      {texto === true ? (
        <div className={styles.overlay}>
          <h1>NEW COLLECTION</h1>
          <p>Jewelry with a sea soul. Art you carry with you</p>
          <button>Buy now</button>
        </div>
      ) : null}
    </section>
  );
}
