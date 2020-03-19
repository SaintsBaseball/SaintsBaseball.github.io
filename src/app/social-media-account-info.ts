export class SocialMediaAccountInfo {
    linkToAccount: string;
    linkTitle: string;
    imageSource: string;
    imageAlternate: string;

    constructor(linkToAccount: string, linkTitle: string, imageSource: string, imageAlternate: string) {
        this.linkToAccount = linkToAccount;
        this.linkTitle = linkTitle;
        this.imageSource = imageSource;
        this.imageAlternate = imageAlternate;
    }
}
