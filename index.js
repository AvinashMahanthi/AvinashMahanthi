const md = require("markdown-it")({
    html: true, // Enable HTML tags in source
    breaks: true, // Convert '\n' in paragraphs into <br>
    linkify: true, // Autoconvert URL-like text to links
  });
  const emoji = require('markdown-it-emoji');
  const fs = require("fs");
  const Parser = require("rss-parser");
  
  const parser = new Parser();
  
  const twitterUrl = "https://twitter.com/MahanthiAvinash";
  const linkedInUrl = "https://www.linkedin.com/in/avinash-mahanthi";
  const mediumUrl = "https://medium.com/@avinashfab5678";
  const blogPostLimit = 1;
  const badgeHeight = "25";
  
  md.use(emoji);
  
  (async () => {
    let blogPosts = "";
    try {
      blogPosts = await loadBlogPosts();
    } catch (e) {
      console.error(`Failed to load blog posts from ${websiteUrl}`, e);
    }
  
    const twitterBadge = `[<img src="https://img.shields.io/badge/twitter-%231DA1F2.svg?&style=for-the-badge&logo=twitter&logoColor=white" height=${badgeHeight}>](${twitterUrl})`;
    const linkedInBadge = `[<img src="https://img.shields.io/badge/linkedin-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white" height=${badgeHeight}>](${linkedInUrl})`;
    const mediumBadge = `[<img src="https://img.shields.io/badge/medium-%2312100E.svg?&style=for-the-badge&logo=medium&logoColor=white" height=${badgeHeight}>](${mediumUrl})`;
    
  
    text = `Hi!👋, This is Avinash Mahanthi! Iam Flutter developer, Blogger and a pythoneer 🎓 freshman \n\n${twitterBadge} ${linkedInBadge} ${instagramBadge} ${mediumBadge} ${devToBadge}\n\n# Latest Blog Posts\n${blogPosts}\n\n# GitHub Stats\n![GitHub Stats](https://github-readme-stats.vercel.app/api?username=AvinashMahanthi&show_icons=true)`;
  
    const result = md.render(text);
  
    fs.writeFile("README.md", result, function (err) {
      if (err) return console.log(err);
      console.log(`${result} > README.md`);
    });
  })();
  
  async function loadBlogPosts() {
    const feed = await parser.parseURL(feedUrl);
  
    let links = "";
  
    feed.items.slice(0, blogPostLimit).forEach((item) => {
      links += `<li><a href=${item.link}>${item.title}</a></li>`;
    });
  
    return `
    <ul>
      ${links}
    </ul>\n
    `;
  }