NPM Stuff I Often Forget
===============

- [semantic versioning syntax](https://bytearcher.com/articles/semver-explained-why-theres-a-caret-in-my-package-json/)
    - "^3.9.2" == "3.*.*"
    - "~3.9.2" == "3.9.*"
    - Although sometimes you see this self-explanatory syntax as well: `"@angular/common": ">=4.0.0-beta <5.0.0"`
- Peer dependencies
    - specified in the package.json.
    
    ```(json)
    {
        "name": "chai-as-promised",
        "peerDependencies": {
            "chai": "1.x"
        }
    }
    ```
- Reinstall whatever packages are listed in your package.json: 
    - `npm install`
- See what module versions are installed in your project:
    - `npm list` : everything
    - `npm list grunt` : anywhere grunt is required
    - `npm list -g` : all globally installed packages
- Update a particular module to most recent compatible (re: package.json) version:
    - run `npm outdated` to see what will get updated
    - `npm update <package-name>` or leave it blank and all packages will be updated
- Update npm itself:
    - on windows, npm is installed with the node executable (but you can update manually too)
    - [instr (crossplatform)](https://docs.npmjs.com/troubleshooting/try-the-latest-stable-version-of-npm)


