"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { Button, Flex } from "antd";
import Carou from "@/component/carou";
import { useRouter } from "next/navigation";
import Navbar from "@/component/Navbar";

export default function Home() {
   const router=useRouter();
  return (
    <>
    <Navbar/>
     <div className={styles.page}>
      <div className={styles.header}>
        <h1>Satmile High School</h1>
      </div>

        <div className={styles.image_btn}>
          <div className={styles.imageContainer}>
            <Carou />
          </div>

          <div className={styles.buttonContainer}>
            
              <Button type="primary" block 
               onClick={()=>router.push('/user')}
              >
                User (Students)
              </Button>
              <Button type="primary"
               block
               onClick={()=>router.push('/admin')}
               >
                Admin (Authority)
              </Button>
          </div>
        </div>
     </div>
    </>
  );
}
