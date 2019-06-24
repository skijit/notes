# A Collection of Misc Gotchas About Git

## Windows-Based Git

### Long File Names

- Long paths (>260 chars) are disabled by default in Git for Windows.
- You can enable them using: `git config core.longpaths true`
- One example when this can happen is if you're using Git as a remote file-deployment solution (i.e. FTP) and you need to copy all the files in your repo, including some deeply nested file structures, such as live in `node_modules`. I've had this problem with Azure deployments.
- [reference](https://github.com/msysgit/msysgit/wiki/Git-cannot-create-a-file-or-directory-with-a-long-path)

### Changing casing in filenames or folders

- See the normal `git mv` notes below.
- This procedure changes if you're just changing casing on a case-insensitive file system.
- You can use this approach on Windows: `git mv foldername tempname && git mv tempname folderName`
- [reference](http://stackoverflow.com/questions/11183788/in-a-git-repository-how-to-properly-rename-a-directory)

## Tips for restructuring files and folders in Git

### git mv

- This will move the file on the file system and also let Git know that the file has been moved.
- Example: `git mv hello.html lib`
- If you run a `git status`, the moved file's status will be **renamed**
- Alternately, you could just use the following more verbose procedure to the same effect.
  ````
  mv hello.html lib
  git add lib/hello.html
  git rm hello.html```
  ````
- [reference](https://githowto.com/moving_files)
- If you're only changing case on files/folders, see [here](###changing-casing-in-filenames-or-folders)

## Git and Directories

- Git doesn't care about directories, only the files inside them.
- So you don't ever need to add directories, just add the files and the directories will transfer as a matter of course.
- If you need to create an **empty directory**, you can add/commit a .gitignore inside that directory with the following contents:
  ````
  # Ignore everything in this directory
  *
  # Except this file
  !.gitignore```
  ````
- [reference](http://stackoverflow.com/questions/115983/how-can-i-add-an-empty-directory-to-a-git-repository)

## .gitignore and file add order

- If Git is already tracking a a file which you then later reference (directly or indirectly) in your .gitignore file, it will not be automatically removed. You need to manually remove it: `git rm --cached <file>`
- [reference](http://stackoverflow.com/questions/1274057/making-git-forget-about-a-file-that-was-tracked-but-is-now-in-gitignore)

## Git State / Workflow

- Pulled from [here](https://git-scm.com/book/en/v2/Getting-Started-Git-Basics)
- 2 types of files:
  1. **Tracked**: The database knows about them and is recording changes to its contents
  2. **Untracked**: The database is not retaining any history or recording changes to these files.
     - This could be permanent/intentional or temporary (i.e. they'll soon be tracked)
- Tracked Files have 3 possible states
  1. **Committed**: Has no changes
  2. **Modified**: There are changes, but they not scheduled for the next commit
  3. **Staged**: There are changes and they will be included in the next commit
- 3 Sections of a Git project:
  1. The .git Directory
     - This IS the Repository
     - Stores metadata and primary databse
  2. Working Directory
     - Basically the root project folder and all its contents (files and subfolders), excluding the .git directory
     - These contents represent a single checkout of one version of the project, which could correspond to any version and branch plus whatever untracked files have been added.
     - These files are created by uncompressing data stored in the .git directory's database
  3. Staging Area
     - Also called the _index_, which corresponds to the name of a file in the .git directory
     - Contains whatever added or modified files are to be included in the next commit

## Discarding or Saving Files

- `git stash` is a set of commands that lets you:
  - Saves work in a stack
  - Cleans your working directory
  - Gives you the possibility to return to the saved state later. Otherwise, it's effectively discarded.
- Saving Or Discarding Work:

  - Staged AND UnStaged Files:

  ```
  git stash save "my_stash_name"
  ```

  - Only UnStaged Files:

  ```
  git stash save --keep-index "my_stash_name"
  ```

        - Alternately, this will clear out any modified (unstaged) changes:
        ```
        git checkout -- .
        ```
            - This is saying get the HEAD version on the branch I'm currently on for the current directory

  - Only Staged Files:

    - There are lots of possibilities here. Some involve commiting then doing an `git commit --amend` or a `git rebase`.
    - Here is a simple procedure that uses more familiar functionality:

      1. `git stash -save --keep-index "these are just my unstaged changes"` : stashes your unstaged changes, but keeps your staged content
      2. ```git stash -save "now this is just the staged changes"

         ```

      3. `git stash pop ...` (or something like) to restore just thos unstaged changes

  - Staged, Unstaged, and Untracked Files

  ```
  git stash save --include-untracked "my_stash_name"
  ```

- View The Stash Stack:
  ````
  git stash list```
  ````
- Applying a stash
  - To apply and **remove** from stack
  ````
  git stash pop stash@{n}```
      - where *n* is the index number of the change in the stash
  - To apply and **keep** in stack
  ````
  git stash apply stash@{n}```

## A file could be listed as Both Staged and Modified

- Suppose you...
  - Make changes to file X and then stage the file, using `git add X`
  - Now you make some more changes to X without committing it
  - If you run `git status`, you'll see it marked as both modified and staged!
  - Solution: just rerun `git add X`
- **Why did this happen?**
  - Bc when you run `git add`, the file is staged exactly as it is. Any changes occuring before the commit will not be tracked.

## Managing Remotes

- A remote is a version of a repository that is available through a network.
- You can have any number of remotes configured for your repository.
- Running `git remote -v` lets you see the names and address of each remote that's currently configured and for what operations (fetch/push)
  - When you clone a repository, git automatically assigns the source as a remote named _origin_
- To add a remote: `git remote add <shortName> <url>`
- When you do a `git fetch <remoteName>` on a remote, it will copy those branches into <remoteName>/<branchName>
  - So the master branch of a remote named 'foo' will be copied into foo/master.
  - Recall `git pull` is just a combination of `git fetch` and `git merge`
- To push to a remote, use `git push <remoteName> <branchName>`
- To get more information about a remote, use `git remote show`. It will tell you:
  - Which remote branch is automatically pushed to when you run `git push`
  - Which local branches are merged into when you run `git pull`
  - What remote branches you dont have locally
  - What local branches you have that've been removed from the remote
- `git remote rename <oldName> <newName>` will change a remotes short name
- `git remote rm <shortName>` removes a remote

## Git Configuration

- Git stores it's configurations in a hierarchy of files (in order of precedence)
  1. System Level: /etc/gitconfig
  2. User Level: ~/.gitconfig OR ~/.config/git/config
  3. Repository Level: <repoFolder>/.git/config
- These files have different names (and obviously location) but the same format
- You can change your configurations by modifying these text files or by running `git config`
  - To target system-level config: add param --global
  - To target user-level config: add param ???
  - To target repo-level config: add param ???
- There are tons of configuration settings. [Here's](http://git-scm.com/docs/git-config.html) a complete list.
- core.editor
  - Set the editor for your commit and tag messages
  - Ex: `git config --global core.editor <editorName>`
  - By default it uses the editor pointed at by the environment variables $VISUAL or $EDITOR, using vi as a fallback.
- commit.template
  - Set a commit template (a text file that has all the fields you want entered in a commit message)
  - Ex: `git config --global commit.template ~/.gitmessage.txt`
- core.pager
  - Sets the pager, ie the program 'more' or alternately 'less'
  - Ex. git config --global core.pager 'less'
- user.signingkey
  - lets you sign the tags you create
- core.excludesfile
  - like a system-level .gitignore file.
  - Ex: git config --global core.excludesfile ~/.gitignore_global
- External Merge and Diff Tools
  - Google or see documentation
- Converting Whitespace
  - core.autocrlf : see documentation

**TODO** .git directory [design](http://www.gitguys.com/topics/the-git-directory/)
**TODO** git [branching](https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell#_git_branching)
**TODO** remote configuration and the refspec
[see](http://www.gitguys.com/topics/the-configuration-file-remote-section/)
[see](http://www.gitguys.com/topics/the-configuration-file-branch-section)
[see](https://git-scm.com/book/en/v2/Git-Internals-The-Refspec)
**TODO** git server [setup](https://git-scm.com/book/en/v2/Git-on-the-Server-Getting-Git-on-a-Server#_git_on_the_server)

## Misc

- 'Clean' Working Directory mean no tracked files have changes
- 'Index' is also the file (in .git dir) that records the staged versions of files
  - Stage means the files **and versions** that are ready for commit
- `git add` is for **BOTH** adding a new file OR staging it
- `git diff` shows you the difference between what is modified and what is in your staging area (which could be the same as the last commit)
- `git diff --staged` shows the difference between the staged and last commit
- The commit sha-1 checksum is over the filesystem diff: basically a patch (I think)
- `git rm` will make the file no longer tracked AND remove it from the filesystem
  - if you want to keep it on the filesystem, try `git rm --cached`
- We only abbreviate from the beginning of the SHA hash, not the end
  - How many characters you want to use is up to you
  - Big projects need to use more or they'll get collisions
  - Git can generally interpolate for you
- (Object) Composition of a commit:
  - commit object
    - parent
    - tree
    - author
    - commiter
    - comments
    - Has it's own SHA ID
  - tree object
    - points to each blob object in the directory (represents file (or subdir?))
    - Has it's own SHA ID
  - Blob object
    - has its own SHA ID
    - seems to actually store the file contents, not just the deltas
- HEAD knows what branch it's currently pointing at: `git log --oneline --decorate`
