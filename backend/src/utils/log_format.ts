import fs from "fs";
import path from "path";
import {paths} from "../../config";

let fileName = setDateFormat();

export function setDateFormat ()  {
  const timeZoneOffset = new Date().getTimezoneOffset() * 60 * 1000;
  const currentDate = Date.now() - timeZoneOffset
  const dateAsISO = new Date(currentDate).toISOString();
  const formattedISO = dateAsISO.replace('T', ' ')
    .slice(0, dateAsISO.lastIndexOf('.'));

  return formattedISO;
}

setInterval(() => {
  fileName = setDateFormat();
}, 3600000)

function openNewFileStream (data: string) {
  const stream = fs.createWriteStream (path.join(paths.LOGS_PATH, fileName), {flags: 'a'});
  stream.write(data + '\n');
}

export async function writeLogs (log: string) {
  try {
    if (!fs.existsSync(paths.LOGS_PATH)) {
      await fs.promises.mkdir(paths.LOGS_PATH);
    }

    openNewFileStream(log);

  } catch (err) {
   console.log(err);
  }
}