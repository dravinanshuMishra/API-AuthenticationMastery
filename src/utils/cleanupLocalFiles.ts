import path from "node:path";
import { UploadedFiles } from "../types/bookTypes";
import fs from "node:fs/promises";

const cleanupLocalFiles = async (files: UploadedFiles) => {
  try {
    if (files.coverImage?.[0]) {
      const coverPath = path.resolve(
        __dirname,
        "../../public/data/uploads",
        files.coverImage[0].filename
      );
      await fs.unlink(coverPath);
       console.log(`Deleted file: ${coverPath}`);
    }
    if (files.file?.[0]) {
      const filePath = path.resolve(
        __dirname,
        "../../public/data/uploads",
        files.file[0].filename
      );
      await fs.unlink(filePath);
      console.log(`Deleted file: ${filePath}`);
    }
  } catch (err) {
    console.error("Failed to cleanup local files:", err);
  }
};

export default cleanupLocalFiles;
