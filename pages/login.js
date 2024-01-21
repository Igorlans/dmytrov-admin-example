import LoginForm from "@/components/loginForm/loginForm";
import prisma from "@/prisma/client";

export async function getServerSideProps () {
  const admin = await prisma.admin.findMany({})
  console.log()
  return {
    props: {
      data: admin
    },
  }
}

const Login = ({ data }) => {
  return (
        <LoginForm data={data} />
  );
};

export default Login

