const posts = [
  {
    comments: [
      {
        id: "214588b4-321f-4255-b152-b4620dcbbc77",
        likes: 0,
        rating: 4,
        replies: "",
        text: "world",
      },
      {
        id: "f8c78714-412b-489a-9639-84eb8f673040",
        likes: 0,
        rating: 4,
        replies: [
          {
            id: "28efb60d-49d1-43e2-bdf6-cb09f3d134f4",
            text: "du es",
          },
          {
            id: "6b242374-2c18-47bf-ad67-f5e4cbf0fe0b",
            text: "es em",
          },
          {
            id: "780b9a33-2f21-4567-a46a-507285dd6a54",
            text: "menq enq",
          },
          {
            id: "bab912be-835f-4433-8d71-772a0a6eac03",
            text: "na e",
          },
        ],
        text: "hello",
      },
    ],
    description:
      '"Interstellar" is a science fiction film directed by Christopher Nolan, released in 2014. The movie is set in a future Earth where climate change and famine have pushed humanity to the brink of extinction. In a desperate attempt to find a new habitable planet, a group of astronauts, led by Cooper (played by Matthew McConaughey), embarks on a dangerous interstellar journey through a newly discovered wormhole near Saturn. Their mission is to explore potential planets suitable for human colonization and secure the future of the human race.\r\n',
    id: "34a52283-cb01-429d-999b-3ea650cab829",
    imageUrl:
      "https://storage.googleapis.com/post-it-up.appspot.com/images/interstellar-windows-theme-5-hd.jpg",
    title: "Interstellar",
  },
  {
    comments: [
      {
        id: "06e37066-3755-4b98-a420-a1272274404e",
        likes: 0,
        rating: 4,
        replies: "",
        text: "The writing and character arcs are consistently strong\n",
      },
      {
        id: "775b3edd-0858-441f-b91d-8c2dba7f56a3",
        likes: 0,
        rating: 3,
        replies: "",
        text: "It's a gripping, binge-worthy series that leaves you emotionally invested in the fate of its characters until the very end.",
      },
      {
        id: "845b51d9-e0c1-4a82-9e65-e34e03ad564f",
        likes: 0,
        rating: 2,
        replies: "",
        text: "Peaky Blinders is an absolute masterpiece of storytelling.\n",
      },
      {
        id: "ce4871c5-8a15-4f94-b26d-08a0f50ada39",
        likes: 0,
        rating: 3,
        replies: "",
        text: "The show's villains are just as captivating as its protagonists\n",
      },
    ],
    description:
      '"Peaky Blinders" is a British historical crime drama television series created by Steven Knight. The show first premiered in 2013 and concluded with its sixth season. The series is named after a real-life urban youth gang active in the late 19th and early 20th centuries in Birmingham, England, known for sewing razor blades into the peaks of their flat caps.Set in the aftermath of World War I, "Peaky Blinders" follows the Shelby crime family, led by Thomas Shelby, portrayed by Cillian Murphy. The Shelbys are ambitious and cunning, running illegal betting operations and other criminal activities while expanding their influence and power in Birmingham.',
    id: "550705d5-2bab-456f-8de2-1df95355d6b9",
    imageUrl:
      "https://storage.googleapis.com/post-it-up.appspot.com/images/61aPzScmLoS._AC_UF1000,1000_QL80_.jpg",
    title: "Peaky Blinders",
  },
  {
    comments: [
      {
        id: "10522434-0cf9-42de-a879-644ca3615f7e",
        likes: 0,
        rating: 4,
        replies: "",
        text: "Jim Carrey's performance in Eternal Sunshine is a revelation\"\n",
      },
      {
        id: "7734f897-e0f6-49e3-99de-474fd0606cb5",
        likes: 0,
        rating: 5,
        replies: "",
        text: "Michel Gondry's direction and Charlie Kaufman's screenplay make Eternal Sunshine a work of art\n",
      },
    ],
    description:
      '"Eternal Sunshine of the Spotless Mind" is a romantic science-fiction drama film released in 2004, directed by Michel Gondry and written by Charlie Kaufman. The movie stars Jim Carrey as Joel Barish and Kate Winslet as Clementine Kruczynski in the lead roles.\\r\\n\\r\\nThe story revolves around Joel and Clementine, two individuals who meet on a train in Montauk, New York, and develop a unique connection. However, after a tumultuous relationship, they both undergo a medical procedure to erase all memories of each other from their minds, wanting to escape the pain of their failed romance.\r\n',
    id: "7dad0c6a-c21a-4604-ba04-d2c49a1efa1b",
    imageUrl:
      "https://storage.googleapis.com/post-it-up.appspot.com/images/eternalsunshine2.jpg",
    title: "Eternal Sunshine of the Spotless Mind",
  },
  {
    comments: [
      {
        id: "1bd74e34-c88e-4d0a-8681-224984fe193e",
        likes: 0,
        rating: 4,
        replies: "",
        text: "The battles and action sequences are visually stunning and epic in scale\n",
      },
      {
        id: "4c4cefcd-fdad-451c-8848-8b55de6672ee",
        likes: 0,
        rating: 4,
        replies: "",
        text: "Game of Thrones is fearless in its willingness to depict complex moral dilemmas\n",
      },
      {
        id: "6076470e-e249-4de3-b90c-d923e5c958a6",
        likes: 0,
        rating: 3,
        replies: "",
        text: "The series explores a wide range of themes, including loyalty, honor, betrayal, family.\n",
      },
      {
        id: "8652972b-e16e-4fe2-b209-163b1e3bf33d",
        likes: 0,
        rating: 3,
        replies: "",
        text: "Game of Thrones will be remembered as a groundbreaking and iconic television series that left a lasting impact on popular culture.\n",
      },
    ],
    description:
      '"Game of Thrones" (GOT) is a critically acclaimed fantasy television series based on the "A Song of Ice and Fire" novels by George R.R. Martin. The show aired from 2011 to 2019. Set in the fictional continents of Westeros and Essos, the series follows multiple interconnected storylines revolving around noble families, political intrigue, power struggles, and the impending threat of an ancient evil.\r\n',
    id: "f0eff921-d167-4e2d-a73b-ed0d11bfa33c",
    imageUrl:
      "https://storage.googleapis.com/post-it-up.appspot.com/images/hqdefault.jpg",
    title: "Game Of Thrones",
  },
  {
    comments: [
      {
        id: "1a1a2f2d-8ddb-4d63-8db4-e615c9334b48",
        likes: 0,
        rating: 5,
        replies: "",
        text: "The Notebook is the epitome of a timeless love story. \n",
      },
      {
        id: "9ad02081-bcd1-4072-80c9-db2fde15cbb8",
        likes: 0,
        rating: 5,
        replies: "",
        text: "I was completely swept away by the cinematography and the nostalgic feel of the film. \n",
      },
      {
        id: "ac4f57da-cfe6-4a23-b55c-b51fab504817",
        likes: 0,
        rating: 4,
        replies: "",
        text: "This film beautifully captures the essence of love's enduring power.\n",
      },
    ],
    description:
      '"The Notebook" is a romantic drama film released in 2004, directed by Nick Cassavetes. The movie is based on the 1996 novel of the same name by Nicholas Sparks. It stars Ryan Gosling as Noah Calhoun and Rachel McAdams as Allie Hamilton in the lead roles.\\r\\n\\r\\nThe story is set in the 1940s and revolves around Noah and Allie, two young lovers from different social backgrounds who meet and fall in love during the summer in a small coastal town. Despite their strong connection, Allie\'s affluent parents disapprove of the relationship, leading to their separation.',
    id: "fc308bde-aeea-4ae6-91e3-5b8dbf003a26",
    imageUrl:
      "https://storage.googleapis.com/post-it-up.appspot.com/images/The-Notebook-Anniversary-Best-Moments-First-Time-Movies-Film-TV-Ryan-Gosling-Rachel-Mcadams-Man-Repeller-rect.jpg",
    title: "The Notebook",
  },
];

export default posts;
