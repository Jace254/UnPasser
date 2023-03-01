import util from "util";
import { exec as _exec } from "child_process";
const exec = util.promisify(_exec);

export const getPasswords = async () => {
  let passwords = [];

  const { stdout, stderr } = await exec(
    `for /f "skip=9 tokens=1,2 delims=:" %i in ('netsh wlan show profiles') do @echo %j | findstr -i -v echo | netsh wlan show profiles %j key=clear`
  );

  const data = stdout.split("Profile information");

  const filtered = data.filter(
    (d) =>
      d.includes("Key Content            :") &&
      d.includes("SSID name              :")
  );

  passwords = filtered.map((d) => {
    const ssid = d
      .split(/\r?\n/)
      .filter((d) => d.includes("SSID name              :"))[0]
      .slice(29)
      .replace('"', "")
      .replace('"', "");
    const pass = d
      .split(/\r?\n/)
      .filter((d) => d.includes("Key Content            :"))[0]
      .slice(29);

    return {
      ssid: ssid,
      password: pass,
    };
  });

  if (stderr) {
    console.error("stderr: " + stderr);
  }

  return passwords;
};
