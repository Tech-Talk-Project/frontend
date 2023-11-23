import React from "react";
import { v4 as uuidv4 } from "uuid";
import { SiNaver, SiGithub } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";
import Logo from "../components/Common/Logo";
import OauthLoginButton from "../components/Common/OauthLoginButton";
import DividerWithText from "../components/Common/DividerWithText";

const TYPES = [
  {
    title: "Google",
    redirect_url: "",
    color: "bg-white",
    logo: <FcGoogle size={28} />,
  },
  {
    title: "Github",
    redirect_url: `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GITHUB_REDIRECT_URL}`,
    color: "bg-brand",
    logo: <SiGithub size={28} />,
  },
  {
    title: "Naver",
    redirect_url: `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${
      process.env.REACT_APP_NAVER_CLIENT_ID
    }&state=${uuidv4()}&redirect_uri=${
      process.env.REACT_APP_NAVER_REDIRECT_URL
    }`,
    color: "bg-white",
    logo: (
      <div className="p-[6px] bg-naver">
        <SiNaver size={16} />
      </div>
    ),
  },
];

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center">
      <main className="flex flex-col justify-center items-center gap-8 border px-20 py-12 border-line rounded-lg bg-opacity-50">
        <Logo size="lg" />
        <section>
          <DividerWithText>Social Login</DividerWithText>
          <ul className="flex flex-col gap-2">
            {TYPES.map((type) => (
              <li key={uuidv4()}>
                <OauthLoginButton type={type} />
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
