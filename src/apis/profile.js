import { instance } from "./axios";

const ENDPOINT = "/user";

export const getProfile = () =>
  instance.get(`${ENDPOINT}/profile`).then((response) => response.data);

export const setProfileInfo = ({ name, job }) =>
  instance
    .post(`${ENDPOINT}/profile/update/info`, { name, job })
    .then((response) => response.data);

export const setProfileIntroduction = ({ introduction }) =>
  instance
    .post(`${ENDPOINT}/profile/update/introduction`, { introduction })
    .then((response) => response.data);

export const setProfileLinks = ({ links }) =>
  instance
    .post(`${ENDPOINT}/profile/update/links`, { links })
    .then((response) => response.data);

export const setProfileSkills = ({ skills }) =>
  instance
    .post(`${ENDPOINT}/profile/update/skills`, { skills })
    .then((response) => response.data);

export const setProfileDescription = ({ description }) =>
  instance
    .post(`${ENDPOINT}/profile/update/description`, {
      detailedDescription: description,
    })
    .then((response) => response.data);
