import * as fs from 'fs';
import * as path from 'path';

export const clearImage = (filePath) => {
  filePath = path.join(__dirname, '..', '..', '..', `images/${filePath}`);
  fs.unlink(filePath, (err) => {
    console.log(err);
  });
};
