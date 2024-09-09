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
  
  let typeSymbol: string
  
  let currentText: string = "";
  let imageNameBase: string = imageName.replace(/\.(jpg|jpeg|png|gif|bmp)$/i, '');
  let resultText: string = "Result Placeholder";
  
  // Create text based on image
  // Only really need to edit the imageName and resultText
  
  if(imageName == "453_1.png") {
	  resultText = currentText.concat("✿ AMGUS #453 - Party Collectibles (2023)");
  } else if(imageName == "MM3_1.jpg") {
	  resultText = currentText.concat("✦ AMGUS #MM3 - Halloween Spooky (2009)");
  } else if(imageName == "YouCanRlyPutAnythingHere_1.png") {
	  resultText = currentText.concat("☁︎ AMGUS InsertAnythingHere - Spooky Collectibles (2020)");
  };
   
   return resultText;
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
	path2: nextImage.absolutePath2,
    text: postTextFromImageName(nextImage.imageName),
    altText: altTextFromImageName(nextImage.imageName),
  });
}

main();
