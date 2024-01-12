import React from "react";
import ProfileImage from "../Common/ProfileImage";
import Information from "./Information";
import Introduction from "./Introduction";
import Links from "./Links";
import Skills from "./Skills";
import Description from "./Description";
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
      <section className="flex flex-col items-center gap-2 p-4 w-[320px] shrink-0">
        <ProfileImage size="lg" imageUrl={imageUrl} />
        <Information info={info} />
        <Introduction introduction={introduction} />
        <Links links={links} />
      </section>
      <section className="flex flex-col gap-8 min-h-full grow">
        <Skills skills={skills} />
        <Description description={detailedDescription} />
      </section>
    </>
  );
}
