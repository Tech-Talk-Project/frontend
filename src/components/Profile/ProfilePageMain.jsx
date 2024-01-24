import React from "react";
import ProfileImage from "../Common/Image/ProfileImage";
import Information from "./Information/Information";
import Introduction from "./Introduction/Introduction";
import Links from "./Link/Links";
import Skills from "./Skill/Skills";
import Description from "./Description/Description";
import useProfiles from "../../hooks/useProfiles";

export default function ProfilePageMain() {
  const {
    profileQuery: {
      data: {
        imageUrl,
        detailedDescription,
        info,
        introduction,
        links,
        skills,
      },
      error,
    },
  } = useProfiles();

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      <section className="flex flex-col items-center gap-2 p-4 w-full md:w-[320px] shrink-0">
        <ProfileImage size="lg" imageUrl={imageUrl} />
        <Information info={info} />
        <Introduction introduction={introduction} />
        <Links links={links} />
      </section>
      <section className="flex flex-col gap-8 p-4 md:p-0 md:pr-4 min-h-full grow">
        <Skills skills={skills} />
        <Description description={detailedDescription} />
      </section>
    </>
  );
}
