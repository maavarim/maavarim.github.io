import User from "../types/User";
import React, { useContext, Fragment } from "react";
import { Subtract } from "utility-types";
import LoggedInUserContext from "../context/LoggedInUserContext";

export interface WithAuthenticatedProps {
  loggedInUser: User;
}

export const requireAuthenticated = <Props extends object>(
  Component: React.ComponentType<Props>
): React.FC<Props> => (props: Props) => {
  const loggedInUser = useContext(LoggedInUserContext);
  return loggedInUser === null ? (
    <Fragment />
  ) : (
    <Component {...(props as Props)} />
  );
};

export const withAuthenticated = <Props extends WithAuthenticatedProps>(
  Component: React.ComponentType<Props>
): React.FC<Subtract<Props, WithAuthenticatedProps>> => (
  props: Subtract<Props, WithAuthenticatedProps>
) => {
  const loggedInUser = useContext(LoggedInUserContext);
  return loggedInUser === null ? (
    <Fragment />
  ) : (
    <Component loggedInUser={loggedInUser} {...(props as Props)} />
  );
};