import {isNodeError} from "./error_type_check";
import {setDateFormat, writeLogs} from "./log_format";

export async function errorLog (err: unknown, message: string) {
  const errMessage = isNodeError(err) ? err.code : "File reading error";

  await writeLogs(`${setDateFormat()} ${message} ${errMessage}`);
}