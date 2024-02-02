import { auth } from "express-oauth2-jwt-bearer";

const jwtCheck = auth({
  audience: "https://Event-APP",
  issuerBaseURL: "https://dev-nsc7dienu8o1ta8a.us.auth0.com/",
  tokenSigningAlg: "RS256",
});

export default jwtCheck;
