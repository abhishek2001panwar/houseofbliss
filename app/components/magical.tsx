// Magical.tsx
import styles from "./Magical.module.css";

const topImages = [
  "/mag/img1.png",
  "/mag/img2.png",
  "/mag/img3.png",
  "/mag/img4.png",
  "/mag/img5.png",
  "/mag/img12.png",
];

const bottomImages = [
  "/mag/img6.png",
  "/mag/img7.png",
  "/mag/img8.png",
  "/mag/img9.png",
  "/mag/img10.png",
  "/mag/img11.png",
];

export default function Magical() {
  return (
    <section className={styles.section}>

      {/* TOP ROW */}
      <div className={styles.trackWrapper}>
        <div className={`${styles.track} ${styles.trackTop}`}>
          {[...topImages, ...topImages].map((src, i) => (
            <div className={styles.card} key={`top-${i}`}>
              <img src={src} alt={`Wedding moment ${i + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      {/* HEADING */}
      <div className={styles.headingBlock}>
        <span className={styles.preLabel}>a curated collection</span>
        <span className={styles.subHeading}>Some of Our Most</span>
        <span className={styles.mainHeading}>MAGICAL</span>
        <div className={styles.divider}>
          <div className={styles.dividerLine} />
          <div className={styles.dividerDiamond} />
          <div className={styles.dividerLine} />
        </div>
        <p className={styles.postLabel}>Wedding Moments</p>
      </div>

      {/* BOTTOM ROW */}
      <div className={styles.trackWrapper}>
        <div className={`${styles.track} ${styles.trackBottom}`}>
          {[...bottomImages, ...bottomImages].map((src, i) => (
            <div className={styles.card} key={`bottom-${i}`}>
              <img src={src} alt={`Wedding moment ${i + 6}`} loading="lazy" />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}