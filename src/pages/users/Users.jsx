import React from "react";
import Nav from "../../components/common/nav/Nav";
import UsersComp from "../../components/users/UsersComp";
import MovieFooter from "../../components/common/footer/MovieFooter";

const Users = () => {
  return (
    <>
      <Nav />
      <UsersComp />
      <MovieFooter />
    </>
  );
};

export default Users;
