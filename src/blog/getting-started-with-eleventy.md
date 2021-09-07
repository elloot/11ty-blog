---
title: Getting started with eleventy
---

# {{ title }}

Today was my first time using [eleventy](https://11ty.dev), it is pretty cool so far.

## Getting started

Open wsl and install node and npm.

```bash
sudo apt install curl dirmngr apt-transport-https lsb-release ca-certificates
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -

sudo apt install nodejs
```

Create a new git repository, call it 11ty-blog. Clone the repository to your local machine.

```bash
git clone <repository url>
cd 11ty-blog
```

Once done we need to initialize the project.

```bash
npm init -y
```

Install 11ty

```bash
npm install @11ty/eleventy
```

Edit the package.json start script.

```json
"scripts": {
    "start": "eleventy --serve"
}
```

Create the first index.md to test.

```markdown
# Hello world
```

Add a start script to VS Code and run it to start eleventy.
Watch your glorious SSG.
