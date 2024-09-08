import { postImage } from './clients/at';
import { getNextImage } from './images';
import * as dotenv from 'dotenv';
dotenv.config();

// EDIT THIS!
function postTextFromImageName(imageName: string): string {
  // Remove the file extension and parse the date
  const dateParts = imageName.replace('.jpg', '').split('-');
  const date = new Date(Number(dateParts[0]), Number(dateParts[1]) - 1, Number(dateParts[2] || 1));

  // Create a formatter
  const formatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  let currentText: string = "Current Text Placeholder";
  let result: string = "Result Placeholder"
  // Create text based on image
  if(imageName == "Yellow Amogus.jpg") {
	  currentText.concat(imageName, " from Among Us 2023\n Among Us Stamp #1432");
	  return currentText;
  } else if(imageName == "Red Amogus") {
	  currentText.concat(imageName, " from Among Us 2022\n Among Us Stamp #133");
	  return currentText;
  } else if(imageName == "White Amogus") {
	  currentText.concat(imageName, " from Among Us 2021\n Among Us Stamp #16");
	  return currentText;
  };

  // Format the date
  //return "hi trying to edit the text"; //formatter.format(date);
}

// EDIT THIS!
function altTextFromImageName(imageName: string): string {
  return 'Image from ' + postTextFromImageName(imageName);
}

// Shouldn't have to edit this.
async function main() {
  const { LAST_IMAGE_NAME: lastImageName } = process.env;
  const nextImage = await getNextImage({ lastImageName });

  console.log(nextImage.imageName);

  await postImage({
    path: nextImage.absolutePath,
    text: postTextFromImageName(nextImage.imageName),
    altText: altTextFromImageName(nextImage.imageName),
  });
}

main();
