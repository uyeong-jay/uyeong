# UYeong

UYeong은 블로그 기능을 가진 웹 애플리케이션으로 프론트엔드 개발자를 준비하는 과정에서 제 이야기를 기록하고 사용자와 함께 소통이 가능한 공간을 직접 만들고 싶어 제작하게 되었습니다.

<br />

## Architecture

| Architecture                                                                                                                                             | Flow Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ![uyblog architecture](https://res.cloudinary.com/uyeong/image/upload/q_auto,f_auto/v1736243016/uyeong-blog/posts/uyblog/uyblog_architecture_c80yhl.png) | 1. 사용자는 브라우저(Client)를 통해 웹에 접속하여 요청을 합니다. <br><br> 2. 요청은 먼저 **Nginx**로 전달되어 리버스 프록시 역할을 하며 트래픽을 각 컨테이너로 라우팅합니다. <br><br> 3. **Front Server**는 React.js 기반의 **Next.js**로 구성되어 있으며 SSR(서버 사이드 렌더링) 또는 CSR(클라이언트 사이드 렌더링)을 수행합니다. 상태 관리는 Redux로 처리합니다. <br><br> 4. 프론트엔드에서 API 요청이 발생하면, 요청은 **Back Server**(Node.js + Express.js)로 전달됩니다. <br><br> 5. 백엔드는 비즈니스 로직 처리 후, **Mongoose**를 통해 **MongoDB**에 데이터를 요청하거나 응답합니다. <br><br> 6. 전체 시스템은 **Docker**로 컨테이너화되어 **AWS** 상에서 배포 및 운영됩니다. |

<br />

## Skills

### 🟦 Language

- **TypeScript** - Static Typing for JavaScript

### 🎨 Front-end

- **React.js** - Component-based UI library  
  &nbsp;&nbsp;&nbsp;&nbsp;↳ _using Atomic Design_ <br>
- **Next.js** - React framework supporting SSR and SSG <br>
- **Redux** - State Management <br>
  &nbsp;&nbsp;&nbsp;&nbsp;↳ _with RTK Query_ <br>
- **Storybook** - UI Component Development <br>
- **Emotion** - CSS-in-JS <br>

### 🛠️ Back-end

- **Node.js** - JavaScript runtime <br>
- **Express.js** - Web framework for Node.js <br>
- **Mongoose** - MongoDB ODM <br>
- **MongoDB** - NoSQL document database <br>

### 🚀 Deployment

- **PM2** - Process Manager <br>
- **Nginx** - Reverse Proxy & Load Balancer <br>
- **Docker** - Containerization <br>
- **AWS** - Cloud computing platform <br>

### 🧰 Development Tools

- **ESLint** - Code Linting <br>
- **Prettier** - Code Formatting <br>

### 🗂 Version Control & CI/CD

- **GitLab** - Version Control & CI/CD  
  &nbsp;&nbsp;&nbsp;&nbsp;↳ _using GitLab Runner_ <br>
- **GitHub** - Version Control & CI/CD <br>

<br />

## Pages

### 🏠 Home

| Light                                                                                                                                   | Dark                                                                                                                                  |
| --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| ![home-light](https://res.cloudinary.com/uyeong/image/upload/q_auto,f_auto/v1743140676/uyeong-blog/github_readme/home_light_zgnlqu.png) | ![home-dark](https://res.cloudinary.com/uyeong/image/upload/q_auto,f_auto/v1743140676/uyeong-blog/github_readme/home_dark_f52yap.png) |

<br/>

---

### 🧑🏻 About

| Light                                                                                                                                     | Dark                                                                                                                                    |
| ----------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| ![about-light](https://res.cloudinary.com/uyeong/image/upload/q_auto,f_auto/v1743140676/uyeong-blog/github_readme/about_light_i8fdv1.png) | ![about-dark](https://res.cloudinary.com/uyeong/image/upload/q_auto,f_auto/v1743140676/uyeong-blog/github_readme/about_dark_fmp4ow.png) |

- English-to-Korean self-introduction
- Clickable badges
  <br/>

---

### 📝 Blog List

| Light                                                                                                                                   | Dark                                                                                                                                  |
| --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| ![blog-light](https://res.cloudinary.com/uyeong/image/upload/q_auto,f_auto/v1743140681/uyeong-blog/github_readme/blog_light_qvtc8f.png) | ![blog-dark](https://res.cloudinary.com/uyeong/image/upload/q_auto,f_auto/v1743140681/uyeong-blog/github_readme/blog_dark_msrgwn.png) |

- Blog search bar
- Infinite scrolling
  <br/>

---

### 📄 Blog Post + Comment

| Post (Light)                                                                                                                                      | Comment (Light)                                                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![blog-post-light](https://res.cloudinary.com/uyeong/image/upload/q_auto,f_auto/v1743140678/uyeong-blog/github_readme/blog_post_light_ke9npk.png) | ![blog-comment-light](https://res.cloudinary.com/uyeong/image/upload/q_auto,f_auto/v1743145707/uyeong-blog/github_readme/blog_comment_light_2_mgnex5.png) |

- Table of contents for blog posts
- Comment feature
  <br/>

---

### 📚 Category

| Light                                                                                                                                           | Dark                                                                                                                                          |
| ----------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| ![category-light](https://res.cloudinary.com/uyeong/image/upload/q_auto,f_auto/v1743150565/uyeong-blog/github_readme/category_light_xjzvud.png) | ![category-dark](https://res.cloudinary.com/uyeong/image/upload/q_auto,f_auto/v1743150565/uyeong-blog/github_readme/category_dark_ysvzlx.png) |

- Pagination
- Cateogry admin
  <br/>

---

### ✍️ Write (admin)

| Light                                                                                                                                     | Dark                                                                                                                                    |
| ----------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| ![write-light](https://res.cloudinary.com/uyeong/image/upload/q_auto,f_auto/v1743140677/uyeong-blog/github_readme/write_light_qtkkyb.png) | ![write-dark](https://res.cloudinary.com/uyeong/image/upload/q_auto,f_auto/v1743140681/uyeong-blog/github_readme/write_dark_bmcvaq.png) |

- Markdown editer
- Markdown viewer
  <br/>

---

### 🧾 Publish (admin)

| Light                                                                                                                                        | Dark                                                                                                                                       |
| -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| ![publish-light](https://res.cloudinary.com/uyeong/image/upload/q_auto,f_auto/v1743140677/uyeong-blog/github_readme/write2_light_sizxiv.png) | ![publish-dark](https://res.cloudinary.com/uyeong/image/upload/q_auto,f_auto/v1743140681/uyeong-blog/github_readme/write2_dark_akh8kz.png) |

- Post preview with image upload and description
- Post settings with category selection and publish/private options
  <br/>

---

### 🔐 Signin / Signup

| Signin (Light)                                                                                                                              | Signup (Light)                                                                                                                              |
| ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| ![signin-light](https://res.cloudinary.com/uyeong/image/upload/q_auto,f_auto/v1743140682/uyeong-blog/github_readme/signin_light_fstklt.png) | ![signup-light](https://res.cloudinary.com/uyeong/image/upload/q_auto,f_auto/v1743140675/uyeong-blog/github_readme/signup_light_pv9rkt.png) |

- Email verification with timer
- Confirm password
  <br/>

---

### ⚙️ Settings

| Light                                                                                                                                          | Dark                                                                                                                                        |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| ![setting-light](https://res.cloudinary.com/uyeong/image/upload/q_auto,f_auto/v1743140681/uyeong-blog/github_readme/settings_light_dpkv8c.png) | ![setting-dark](https://res.cloudinary.com/uyeong/image/upload/q_auto,f_auto/v1743140681/uyeong-blog/github_readme/setting_dark_e4apik.png) |

- Store only the latest profile image in the cloud
- Updating nickname and password
  <br/>

---

### 📨 Contact

| Light                                                                                                                                         | Dark                                                                                                                                        |
| --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| ![contact-light](https://res.cloudinary.com/uyeong/image/upload/q_auto,f_auto/v1743140685/uyeong-blog/github_readme/contact_light_xv5axc.png) | ![contact-dark](https://res.cloudinary.com/uyeong/image/upload/q_auto,f_auto/v1743140685/uyeong-blog/github_readme/contact_dark_lb0mxg.png) |

- Using the EmailJS library
  <br/>

---

<br/>
<br/>

### <b>Every page is designed to be responsive.</b>
