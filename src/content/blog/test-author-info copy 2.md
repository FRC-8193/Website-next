---
title: 3
slug: test-author-info
date: 2023-04-30
author: gyoni25
excerpt: This post tests our new author information system.
image:
  src: /images/team.png
  alt: Team photo
tags:
  - test
  - development
---

# Testing Author Information

This post is used to test our new author information system that retrieves author details from the authors.yaml file.

## Features

- Author information from YAML file
- Supports username-based lookups
- Displays name and role automatically
- Clean, reusable component

## How It Works

The system loads the authors.yaml file on server startup and uses the author username from the markdown frontmatter to look up the full author information.

```typescript
// Example of how the author lookup works
const getAuthorInfo = (username: string): Author => {
  const authors = loadAuthorsFromYaml();
  return authors[username] || { name: username };
};
```

## Next Steps

- Add author avatars
- Create author profile pages
- List all posts by author
