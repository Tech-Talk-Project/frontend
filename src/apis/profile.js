import { instance } from "./axios";

const ENDPOINT = "/user/profile";

export const getProfile = () =>
  instance.get(`${ENDPOINT}`).then((response) => response.data);

export const setProfileInfo = ({ name, job }) =>
  instance
    .post(`${ENDPOINT}/update/info`, { name, job })
    .then((response) => response.data);

export const setProfileIntroduction = ({ introduction }) =>
  instance
    .post(`${ENDPOINT}/update/introduction`, { introduction })
    .then((response) => response.data);

export const setProfileLinks = ({ links }) =>
  instance
    .post(`${ENDPOINT}/update/links`, { links })
    .then((response) => response.data);

export const setProfileSkills = ({ skills }) =>
  instance
    .post(`${ENDPOINT}/update/skills`, { skills })
    .then((response) => response.data);

export const setProfileDescription = ({ description }) =>
  instance
    .post(`${ENDPOINT}/update/description`, {
      detailedDescription: description,
    })
    .then((response) => response.data);
