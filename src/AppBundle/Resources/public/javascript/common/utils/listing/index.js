import cn from "classnames";
import React from "react";

export const getListingImage = (props) => {
    const { imageBase64, image, sports } = props;
    let listingImageUrl = (imageBase64) ? imageBase64 : image ? assetsBaseDir + "../" + image : null;
    let isSportPlaceholder = false;
    let caLogo = false;

    if (!listingImageUrl) {
        const sportId = sports && sports.length ? (sports[0].id || sports[0].externalId): null;
        const imagesBaseDir = assetsBaseDir + "app/images/listing/default-sports/";
        let imageName = "";
        isSportPlaceholder = true;

        switch (sportId) {
            case 1:
            case "sr:sport:1":
                imageName = "soccer.svg"; // Soccer
                break;
            case 15:
            case "sr:sport:16":
                imageName = "america-futbol.svg"; // American Football
                break;
            case 7:
            case "sr:sport:3":
                imageName = "basketball.svg"; // Baseball
                break;
            case 3:
            case "sr:sport:2":
                imageName = "basketball.svg"; // Basketball
                break;
            case 10:
            case "sr:sport:21":
                imageName = "cricket.svg"; // Cricket
                break;
            case 11:
            case "sr:sport:24":
                imageName = "hockey.svg"; // Field Hockey
                break;
            case 4:
            case "sr:sport:20":
                imageName = "table-tennis.svg"; // Table Tennis
                break;
            case 5:
            case "sr:sport:5":
                imageName = "tennis.svg"; // Tennis
                break;
            case 16:
            case "sr:sport:23":
                imageName = "volleyball.svg"; // Volleyball
                break;
            case 9:
            case "sr:sport:9":
                imageName = "golf.svg"; // Golf
                break;
            default:
                imageName = "logo-content-arena.svg";
                caLogo = true;
                break;
        }

        listingImageUrl = imagesBaseDir + imageName;
    }

    return (
        <div className={cn("image", { 'sport-placeholder': isSportPlaceholder, 'ca-logo': caLogo })}>
            <img src={listingImageUrl} />
        </div>
    );
};