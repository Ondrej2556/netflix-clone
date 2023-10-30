interface mainSection {
  id: number;
  title: string;
  subTitle: string;
  imageUrl: string;
}

export const mainSection: mainSection[] = [
  {
    id:1,
    title: "Enjoy on your TV",
    subTitle:
      "Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.",
    imageUrl:
      "https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png",
  },
  {
    id:2,
    title: "Download your shows to watch offline",
    subTitle: "Save your favorites easily and always have something to watch.",
    imageUrl:
      "https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg",
  },
  {
    id:3,
    title: "Watch everywhere",
    subTitle:
      "Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.",
    imageUrl:
      "https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/device-pile.png",
  },
  {
    id:4,
    title: "Create profiles for kids",
    subTitle:
      "Send kids on adventures with their favorite characters in a space made just for them—free with your membership.",
    imageUrl:
      "https://occ-0-2773-2774.1.nflxso.net/dnm/api/v6/19OhWN2dO19C9txTON9tvTFtefw/AAAABejKYujIIDQciqmGJJ8BtXkYKKTi5jiqexltvN1YmvXYIfX8B9CYwooUSIzOKneblRFthZAFsYLMgKMyNfeHwk16DmEkpIIcb6A3.png?r=f55",
  },
];

interface FAQ {
  id: number;
  Q: string;
  A: string;
}
export const FAQ: FAQ[] = [{
  id:1,
    Q: "What is Netflix?",
    A: "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.<br /> <br />" +  
        "You can watch as much as you want, whenever you want without a single commercial – all for one low monthly price. There's always something new to discover and new TV shows and movies are added every week!",
}, {
  id:2,
    Q: "How much does Netflix cost?",
    A: "Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from 199 Kč to 319 Kč a month. No extra costs, no contracts.",
}, {
  id:3,
    Q: "Where can I watch?",
    A: "Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles.<br /> <br /> You can also download your favorite shows with the iOS, Android, or Windows 10 app. Use downloads to watch while you're on the go and without an internet connection. Take Netflix with you anywhere.",
}, {
  id:4,
    Q: "How do I cancel?",
    A: "Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime.",
}, {
  id:5,
    Q: "What can I watch on Netflix?",
    A: "Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want.",
}, {
  id:6,
    Q: "Is Netflix good for kids?",
    A: "The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies in their own space.<br /> <br /> Kids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don’t want kids to see.",
}, 
];
