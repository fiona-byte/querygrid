[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/devylab/querygrid">
    <img src="logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">QueryGrid</h3>

  <p align="center">
    A backend as a service software
    <br />
    <a href="https://github.com/devylab/querygrid"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/devylab/querygrid">View Demo</a>
    ·
    <a href="https://github.com/devylab/querygrid/issues">Report Bug</a>
    ·
    <a href="https://github.com/devylab/querygrid/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-querygrid">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#documentation">Documentation</a></li>
    <li><a href="#report-a-bug">Report a bug</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT QueryGrid -->

## About QueryGrid

[//]: # '[![QueryGrid Screen Shot][product-screenshot]](https://github.com/devylab/querygrid)'

QueryGrid is a backend as a service software that allows you to build a web and mobile applications without writing a single line of backend. It hosts databases, storage, services, authentication, mailing and other features.

Why QueryGrid?:

- It is easy to setup
- It is lightweight
- It is self-hosted (you can host it on your own cloud provider)

### Built With

- [![Golang][Golang]][Golang-url]
- [![React][React.js]][React-url]
- [![Mui][Mui]][Mui-url]

<!-- GETTING STARTED -->

## Getting Started

To get the project running locally follow these simple steps below.

### Prerequisites

To run QueryGrid on your local environment you will need to install the following

- Node (node >= 18.9.0)

You can get a detailed instruction on how to install Node from their official [documentation](https://nodejs.org/)

- Golang (go >= 1.20)

You can get a detailed instruction on how to install Golang from their official [documentation](https://go.dev/dl/)

- Mongodb

You can get a detailed instruction on how to install Mongodb from their official [documentation](https://www.mongodb.com/try/download/community), or you can use the docker image [here](https://hub.docker.com/_/mongo)

Note: you need to setup mongo replica on your mongodb database. Here's a setup process on [Github Gist](https://gist.github.com/davisford/bb37079900888c44d2bbcb2c52a5d6e8) by Davisford

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/devylab/querygrid.git
   ```
2. Make install script executable
   ```sh
   chmod +x install.sh
   ```
3. Install dependencies
   ```sh
   ./install.sh
   ```
4. Duplicate the `app.env.sample` in the server directory, rename it to `app.env` and update the content
5. For development mode, you have to run frontend and backend on separate terminals
   ```sh
   # terminal 1
   cd client && npm run dev
   ```
   ```sh
   # terminal 2
   cd server && go run main.go
   ```

<!-- USAGE EXAMPLES -->

[//]: # '## Usage'
[//]: #
[//]: # 'To build a production version'
[//]: #
[//]: # '1. Make build script executable'
[//]: # '   ```sh'
[//]: # '   chmod +x build.sh'
[//]: # '   ```'
[//]: # '2. Build project'
[//]: # '   ```sh'
[//]: # '   ./build.sh'
[//]: # '   ```'
[//]: # '3. Run build version'

## Documentation

_For more examples, please refer to the [Documentation](https://github.com/devylab/querygrid)_

<!-- ROADMAP -->

## Report a bug

See the [open issues](https://github.com/devylab/querygrid/issues) for a full list of proposed features (and known issues) or create a [new issue](https://github.com/devylab/querygrid/issues/new).

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License. See [License](https://github.com/devylab/querygrid/blob/main/LICENSE) for more information.

<!-- CONTACT -->

## Contact

Cavdy - [@DarklordCodes](https://twitter.com/DarklordCodes)

Project Link: [https://github.com/devylab/querygrid](https://github.com/devylab/querygrid)

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- [Gin Gonic](https://gin-gonic.com/)
- [React Pro Sidebar](https://github.com/azouaoui-med/react-pro-sidebar)
- [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [Mui](https://mui.com/)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/devylab/querygrid.svg?style=for-the-badge
[contributors-url]: https://github.com/devylab/querygrid/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/devylab/querygrid.svg?style=for-the-badge
[forks-url]: https://github.com/devylab/querygrid/network/members
[stars-shield]: https://img.shields.io/github/stars/devylab/querygrid.svg?style=for-the-badge
[stars-url]: https://github.com/devylab/querygrid/stargazers
[issues-shield]: https://img.shields.io/github/issues/devylab/querygrid.svg?style=for-the-badge
[issues-url]: https://github.com/devylab/querygrid/issues
[license-shield]: https://img.shields.io/github/license/devylab/querygrid?style=for-the-badge
[license-url]: https://github.com/devylab/querygrid/blob/main/LICENSE
[product-screenshot]: images/screenshot.png
[Golang]: https://img.shields.io/badge/Golang-0769AD?style=for-the-badge&logo=go&logoColor=white
[Golang-url]: https://go.dev/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Mui]: https://img.shields.io/badge/Mui-35495E?style=for-the-badge&logo=mui&logoColor=4FC08D
[Mui-url]: https://mui.com/
