import jwt from "jsonwebtoken";
import { Request } from "express";

interface existingUserAttrs {
  username?: string;
  id?: string;
  email: string;
}

export default function jwtSign(user: existingUserAttrs | null, req: Request) {
  const userJWT = jwt.sign(
    {
      username: user?.username,
      id: user?.id,
      email: user?.email,
    },
    process.env.JWT_KEY!
  );  

  req.session = {
    jwt: userJWT,
  };
}
