// =====================================================
// MOST SITE UPDATES HAPPEN HERE.
//
// Images:
//   1) put files into img/projects/
//   2) add them to media[] as type: "image"
//
// YouTube:
//   add a YouTube URL or video ID as type: "youtube"
//
// Then commit + push to GitHub.
// =====================================================

const SITE = {
  name: "MarlerZ1",

  heroTitle: "Game-ready assets for Unity and beyond.",

  heroText:
    "I create game-ready assets including 3D models, 2D content and other resources for game development. My focus is on clean, practical and easy-to-integrate assets.",

  aboutTitle: "About MarlerZ1",

  aboutText:
    "Independent asset creator focused on practical game-development content. Current work includes 3D models and PBR assets, with 2D content and other asset types planned for the future.",

  email: "marlerzazoo@gmail.com",

  links: [
    { label: "GitHub", url: "https://github.com/MarlerZ1" },
    // { label: "Fab", url: "https://www.fab.com/sellers/..." },
    // { label: "Unity Asset Store", url: "https://assetstore.unity.com/publishers/..." },
  ],

  projects: [
    {
      title: "Medieval Sword Pack 1",
      short: "Game-ready medieval swords with PBR textures.",
      description:
        "A game-ready medieval sword assets prepared for real-time workflows.",

      media: [
        // IMAGES:
        { type: "image", src: "img/projects/SwordPack1/Main.png" },
        { type: "youtube", src: "https://youtu.be/YOHZvA2cl9Y" },
        { type: "image", src: "img/projects/SwordPack1/15_1.png" },
        { type: "image", src: "img/projects/SwordPack1/15_2.png" },
        { type: "image", src: "img/projects/SwordPack1/15_3.png" },
        { type: "image", src: "img/projects/SwordPack1/15_4.png" },
        // YOUTUBE:
        // { type: "youtube", src: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
        // or just:
        // { type: "youtube", src: "dQw4w9WgXcQ" },
      ],

      tags: ["3D", "PBR", "Weapons", "Game Ready"],

      links: [
        // { label: "Fab", url: "https://..." },
        // { label: "Unity Asset Store", url: "https://..." },
      ],
    },

    {
      title: "Stylized Rainy Scene",
      short: "A stylized cel-shaded environment study with rain, atmospheric lighting and a calm Zelda-inspired mood.",
      description:
        "A small stylized environment scene created as an experiment with cel shading, rain effects and atmospheric lighting. The goal was to capture a calm, game-like mood through simple shapes, weather effects and stylized rendering.",

      media: [
        { type: "image", src: "img/projects/StylizedRainScene/StylizedRainScene.png" },
        // IMAGES:
        { type: "youtube", src: "https://www.youtube.com/watch?v=3QWNvR3DlxQ" },
        // YOUTUBE:
        // { type: "youtube", src: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
        // or just:
        // { type: "youtube", src: "dQw4w9WgXcQ" },
      ],

      tags: ["3D", "PBR", "Cel Shading", "Environment", "Animation"],

      links: [
        // { label: "Fab", url: "https://..." },
        // { label: "Unity Asset Store", url: "https://..." },
      ],
    },
  ],
};
