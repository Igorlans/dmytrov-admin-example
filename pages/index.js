import styles from '@/styles/Home.module.css';
import logo from '@/public/logo.svg'
import checkAuth from '@/utils//checkAuth';
import LoginForm from '@/components/loginForm/loginForm';
import Image from 'next/image';
import prisma from '@/prisma/client';


export async function getServerSideProps () {
  const admin = await prisma.admin.findMany({})
  return {
    props: {
      data: admin
    },
  }
}

const Home = ({ data }) => {



  checkAuth()


  return (
    <div className={styles.container}>
      <main className={styles.main}>
          <>
            <Image src={logo} alt="Logo" />
            {/* <h1 className={styles.title}>Вхід в панель</h1> */}
            <LoginForm data={data} />
          </>

      </main>
    </div>
  );
};

export default Home;
