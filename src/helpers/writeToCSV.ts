import fs from "fs";

const writeToCSV = (line: string, mode: string = "append"): void => {
  if (mode === "append") {
    fs.appendFile("out.csv", line, "utf8", (err) => {
      if (err) {
        console.log("Error while appending to file.");
      }
    });
  } else {
    fs.writeFile("out.csv", line, "utf8", (err) => {
      if (err) {
        console.log("Error while writing to file.");
      }
    });
  }
};

export default writeToCSV;
