import { validate as uuidValidate } from "uuid";
import ServerParsingError, {
  ExpectedType,
} from "../utils/errors/ServerParsingError";

export default interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

export const validateId = (id: unknown) => {
  if (typeof id !== "string")
    throw new ServerParsingError({
      field: "id",
      expectedType: ExpectedType.uuid,
    });

  if (!uuidValidate(id))
    throw new ServerParsingError({
      field: "id",
      expectedType: ExpectedType.uuid,
    });
};

export const validateUsername = (username: unknown) => {
  if (typeof username !== "string")
    throw new ServerParsingError({
      field: "username",
      expectedType: ExpectedType.string,
    });
};

export const validateAge = (age: unknown) => {
  if (typeof age !== "number")
    throw new ServerParsingError({
      field: "age",
      expectedType: ExpectedType.number,
    });
};

export const validateHobbies = (hobbies: unknown) => {
  if (!Array.isArray(hobbies))
    throw new ServerParsingError({
      field: "hobbies",
      expectedType: ExpectedType.array,
    });

  if (hobbies.some((hobby) => typeof hobby !== "string"))
    throw new ServerParsingError({
      field: `hobbies[index]`,
      expectedType: ExpectedType.string,
    });
};

export const validateUser = ({
  user,
  partial = true,
}: {
  user: User;
  partial: boolean;
}) => {
  const { id, username, age, hobbies } = user;

  (id || !partial) && validateId(id);
  (username || !partial) && validateUsername(username);
  (age || !partial) && validateAge(age);
  (hobbies || !partial) && validateHobbies(hobbies);
};
