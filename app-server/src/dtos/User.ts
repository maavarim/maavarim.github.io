import { IsString, IsNotEmpty } from "class-validator";
import User from "User";

class UserDTO implements User {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;
}

export default UserDTO;
