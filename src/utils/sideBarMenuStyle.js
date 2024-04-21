export const sideBarMenuStyle = (filter) =>
  `text-white hover:bg-transparent hover:bg-opacity-100 hover:pl-4 hover:font-bold hover:text-brand active:bg-transparent active:bg-opacity-100 active:text-brand focus:bg-transparent focus:bg-opacity-100 ${
    filter ? "pl-4 text-brand font-bold focus:text-brand" : ""
  }`;
