import fs from "node:fs/promises";

async function deleteLocalFile(filePath: string) {
      try {
          await fs.unlink(filePath);
          console.log(`Deleted file: ${filePath}`);
      } catch (err) {
          console.error(`Error deleting file: ${filePath}`, err);
      }
}

export default deleteLocalFile;