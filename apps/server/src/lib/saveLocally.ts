import { CustomError, generateOTP } from "@repo/utils";
import { Request } from "express";
import path from "path";
import fs from "fs";

// Function to save a single file locally
export const saveAssetLocally = async (
  req: Request,
): Promise<string | null> => {
  console.log("res.files: ", req.files);
  return new Promise((resolve, reject) => {
    if (!req.files || !req.files.asset) {
      console.log("err CustomError");
      throw new CustomError({ message: "No files were uploaded." });
    }
    let asset = req.files.asset;
    // If asset is an array, reject as this function is for single files
    if (Array.isArray(asset))
      throw new CustomError({
        message: "Expected a single file, but received multiple.",
      });

    const fileName = path.parse(asset.name).name;
    const extName = path.extname(asset.name);
    const uploadPath = path.join(
      process.cwd(),
      "assets",
      `${fileName}__${generateOTP(10)}${extName}`,
    );

    asset.mv(uploadPath, (err: any) => {
      if (err) {
        reject(new CustomError({ message: "Error saving the file." }));
      } else {
        resolve(uploadPath);
      }
    });
  });
};

// Function to save multiple files locally
export const saveAssetsLocally = async (req: Request) => {
  return new Promise((resolve, reject) => {
    if (!req.files || !req.files.assets)
      throw new CustomError({ message: "No files were uploaded." });

    let assets = req.files.assets;

    // If assets is not an array, reject as this function is for multiple files
    if (!Array.isArray(assets))
      throw new CustomError({
        message: "Expected multiple files, but received a single file.",
      });

    const uploadPaths: string[] = [];

    assets.forEach((asset: any) => {
      const fileName = path.parse(asset.name).name;
      const extName = path.extname(asset.name);
      const uploadPath = path.join(
        process.cwd(),
        "assets",
        `${fileName}__${generateOTP(10)}${extName}`,
      );

      asset.mv(uploadPath, (err: any) => {
        if (err) {
          reject(
            new CustomError({
              message: `Error saving the file: ${asset.name}`,
            }),
          );
        } else {
          uploadPaths.push(uploadPath);
        }
      });
    });

    resolve(uploadPaths);
  });
};

export const deleteFile = (filePath: string) => {
  return new Promise<void>((resolve, reject) => {
    fs.unlink(filePath, (err) => {
      if (err) {
        reject(
          new CustomError({ message: `Error deleting the file: ${filePath}` }),
        );
      } else {
        resolve();
      }
    });
  });
};
