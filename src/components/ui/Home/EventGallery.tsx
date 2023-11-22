import g1 from "@/assets/g1.jpg";
import g10 from "@/assets/g10.jpg";
import g11 from "@/assets/g11.jpg";
import g12 from "@/assets/g12.jpg";
import g13 from "@/assets/g13.jpg";
import g14 from "@/assets/g14.jpg";
import g2 from "@/assets/g2.jpg";
import g3 from "@/assets/g3.jpg";
import g4 from "@/assets/g4.jpg";
import g5 from "@/assets/g5.jpg";
import g6 from "@/assets/g6.jpg";
import g7 from "@/assets/g7.jpg";
import g8 from "@/assets/g8.jpg";
import g9 from "@/assets/g9.jpg";
import styles from "@/styles/Home.module.css";
import Image from "next/image";

const EventGallery = () => {
  return (
    <div
      style={{
        padding: "40px 0",
        overflow: "hidden",
      }}
    >
      <h3
        style={{
          marginBottom: 30,
        }}
        className="section-title"
      >
        Event Gallery
      </h3>
      <div className="gallery">
        <div className={styles.gallery}>
          <div className={styles.vertical}>
            <Image src={g1} alt="" />
          </div>
          <div className={styles.normal}>
            <Image src={g2} alt="" />
          </div>
          <div className={styles.normal}>
            <Image src={g3} alt="" />
          </div>
          <div className={styles.vertical}>
            <Image src={g6} alt="" />
          </div>
          <div className={styles.normal}>
            <Image src={g4} alt="" />
          </div>
          <div className={styles.vertical}>
            <Image src={g7} alt="" />
          </div>
          <div className={styles.normal}>
            <Image src={g5} alt="" />
          </div>
          <div className={styles.normal}>
            <Image src={g11} alt="" />
          </div>
          <div className={styles.vertical}>
            <Image src={g9} alt="" />
          </div>
          <div className={styles.normal}>
            <Image src={g10} alt="" />
          </div>
          <div className={styles.normal}>
            <Image src={g12} alt="" />
          </div>
          <div className={styles.normal}>
            <Image src={g8} alt="" />
          </div>
          <div className={styles.normal}>
            <Image src={g13} alt="" />
          </div>
          <div className={styles.normal}>
            <Image src={g14} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventGallery;
