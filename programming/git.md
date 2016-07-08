Git
=====================

### Git Beginner's Guide For Dummies
[Online book here](https://backlogtool.com/git-guide/en/intro/intro1_1.html)

## Basics
- There are two types of Git repositories:
	- **Local**: Lives on local machines of individuals on the team
	- **Remote**: lives on a remote server that is shared by team members
- There are two ways to create a local repo:
	- Create a new repo from scratch
	- **Clone** an existing remote repo
- **Commit** command is how you create new versions of files/directories in the repository
    - Each commit is identified by a unique 40-char checksum hash
- **Working Tree** consists of all the files you're working on (i.e. have changed)
- **Index** is the staging area where new commits are prepared.
	- Only the (possibly subset of) files from the working tree that are also in the index will be commited to the repo.
	- The point of theindex to give you better control on what files get committed.
	
## Share A Repo
- **Push** means to upload your local repo into the remote one.
- **Pull** means to copy the changes from the remote repo onto your local repo.
	- This also copies the latest revision history from the remote.
	
## Merge Histories
- Pushing to a remote repo might be rejected if your local repo is out of date (i.e. intervening changes have occurred since you last pulled into local)
- Git may try to merge automatically, but it's possible that a conflict will be generated, in which case your local repo will have a new version of the file that has standard diff/merge texts.

## Working With Git
### Branches
- Branch is an independent line of development.  You can create them when you have:
	- New features
	- Bug fixes
- Different branches can be merged into any one branch provided they belong to the same repo.
- When you first make a commit to the repo, Git will automatically create a **master branch** by default.
	- Subsequent commits go int the master branch until you decide to create and switch over to another branch.

### How to use a Branch
- There are generally 2 types of branches:
	- **Integration Branch**
		- Should be kept stable at all times
		- **master** is usually used as an integration branch
	- **Topic Branch**
		- Represents a branch for isolating a specific task (e.g. new feature, bug fix, etc.)
		- Typically created from an integration branch
		- Will eventually be merged back into the integration branch

### Switching Branches
- **checkout** command switches branches.
	- it will update the files in your working tree to match the version stored in the branch you want.
- **HEAD** is a pointer to the current position of a branch.
- If you use checkout to switch branches, but you have currently uncommited changes in the current branch, these will ultimately be committed to the new branch UNLESS when executing the checkout, Git finds a conflict between your uncommited changes and the new branch, in which case it you have to:
	- commit the changes
	- **stash** the changes  (keeps them on the side without committing)

### Integrating Branches
- When you're done with a topic branch and you want to merge it into an integration branch, there are two possible ways to do this:
	- **merge**
		- There are two types of merges available, depending on the scenario:
			- **merge commit**:
				- You create a topic branch off master, and by the time you're ready to merge back to master, it has received some intervening commits.  A *merge commit* is created which creates a new commit on master that is the merged results of topic and master branches.
				**Feature Branch Pre-Merge**
                ![commit 1 merge](/resources/images/programming/git_merge_commit_1.png)
				**Post-Merge, with new commit in master**
				![enter image description here](/resources/images/programming/git_merge_commit_2.png)
			- **fast forward commit**:
				- In this case, the master branch has not recieved any intervening commits by the time you're ready to merge into it.  In this case, the master HEAD now just points at your most recent commit on your branch.  In other words, no new commit is created on the master branch.
				**Feature Branch Pre-Merge**
				![enter image description here](/resources/images/programming/git_ff_merge_1.png)
				**Post-Merge, with no new commit in master**
				![enter image description here](/resources/images/programming/git_ff_merge_2.png)
				- In some cases, this is not preferable, and so there are ways to force a merge commit in a fast forward scenario.
				- Reasons why it might not be preferable:
					- So you can see where the topic branch starts and ends.
	- **rebase**
		- When you rebase a topic branch into an integration branch, it will **replay** the changes (recall, git is only keeping the diffs for each commit, so this is a reasonable description) of your topic branch to the HEAD of the integration branch (making it appear like they originally performed directly on the integration branch).
		**Feature branch Pre-Rebase**
		![enter image description here](/resources/images/programming/git_rebase_1.png)
		**Post rebasing**
		![enter image description here](/resources/images/programming/git_rebase_2.png)
		- However, the HEAD of your branch will not be advanced.  For this, you would do a fast forward merge.
		![enter image description here](/resources/images/programming/git_rebase_3.png)

### Tag
- A tag is used to label and mark a specific commit in the history.  
- Typically this is used to mark release points.
- Two types of tags in Git:
	- **Lightweight tag**
		- Temporary tag that doesn't change
		- Has a name
		- Typically used for local workspace
	- **Annotated tag**
		- Add taggers name, email, date
		- Has a name
		- Has a comment
		- Has a signature
		- Typically used to mark a comit for a release

# Short Introduction To git-flow
Screencast [here](https://vimeo.com/16018419)

- git-flow are extensions based for git based on a [popular git branching model](http://nvie.com/posts/a-successful-git-branching-model/).
- Branching Model:
![enter image description here](/resources/images/programming/git_branching_model.png)
	- **Master Branch**:	 
		- matches what is always in production 
		- contains the least code changes
		- given release tags whenever a new release is made
	- **Develop Branch**
		- This is the integration branch for all of your feature branches
	-  **Feature Branch**
		- Created off the Develop branch
		- The feature branch can reside inyour local machine for the entire development lifecycle, if you wish.
		- Push this branch up to the remote repo when you are ready to merge to the Develop branch.
	- **Release Branch **
		- This is when you're preparing to release and you need some extra isolation, similar to a code freeze.
		- You would only accept bug fix and release-related updates to this branch.
		- Release branches are created of the development branch when the time is right (code freeze)
		- Names are typically prefixed "release-"
		- When you're done, you merge into *master* (and tag master) and *develop*
	- **Hot Fix Branch**
		- If you have a high priority fix, you create a hot fix branch off of master branch.
		- Names typically prefixed with "hotfix-"
		- When complete, merge the hotfix branch into *develop* and *master* and retag master.
	- git-flow are a bunch of git commands which you can install to help execute this model.
	- **Examples**:
        -  Create the local repo
            ```
            mkdir gitflowtest
            cd gitflowtest
            git init
            ```
        - Now create some files and make some changes
        ```
        git add somefile.txt
        git commit -a -m "testing first commit"
        git flow init
        ``` 
        - This last command:
            - Creates the master (if necessary), dev, etc. branches and updates your .git/config file.  
            - Asks you the names of the different branches you want to create.  
            - Issues a checkout on the development branch.
            - If you use a decent git-flow client, it will tell you the name of the current branch you are on in the prompt.
        - Now make some changes to somefile.txt (remember, you're now on develop)
        ```
        git commit -a -m "next commit"
        git flow feature start feature-001
        ```
        - This last command:
            - Creates a new branch 'feature/feature-001', based on develop.
            - Checks you out on that feature branch.
        - When you're ready to integrate back to development, you use: 
        ```
        git flow feature finish feature-001
        ```
        - This will:
            - Merge the feature branch into the development branch
            - Assuming there are no conflicts, it will delete the feature branch
        - To release:
        ```
        git flow release start 1.0
        ```
        - This will:
            - Create a new branch, 'release/1.0', based on develop
            - Check you out on release/1.0
                -It would be customary to add a 'Release' file to this branch, indicating intent, notes, etc.
        - To "finish" the release:
        ```
        git flow release finish 1.0
        ```
        - This will:
            - Prompt you for a tag name and comment
            - Merges the release branch into **master**.  Recall, only the release branch is able to put content on the master branch bc you want master to contain only production ready code.
            - Merges the release branch back into development
            - Checks you out on development
            - Delete the release branch
        - To do a hotfix on production:
        ```
        git flow hotfix start someNameForTheIssue
        ```
        - This will:
            - Creates a new branch, 'hotfix/someNameForTheIssue', off of master.
            - Checks you out on the new hotfix branch
        - To finish the hotfix:
        ```
        git flow hotfix finish someNameForTheIssue
        ```
        - This will:
            - Merge the hotfix branch into master
            - The hotfix will be tagged, and you add some tag comments
            - Hotfix branch is merged into development
            - Deletes the hotfix branch
            - Will NOT merge the hotfix into any of your feature branches.  For this, you would want to rebase.

# General Git Commands
- To create a local repo, create a directory and then run this:
```
git init
```

- To check the status of files which are (and aren't) associated with the repo, and what branch you're currently on:
```
git status
```
- To add new files to git:
```
git add
```

- To save your changes as a new version in the **LOCAL** repo:
```
git commit -m 'your comment'
```

- To use a different branch on the repo,
```
git checkout branchname
```

- To get latest changes from a **REMOTE** repo:
```
git pull
```

- To submit changes from local to a **REMOTE** repo:
```
git push
```

- To do both a push And a pull to/from a **REMOTE** repo:
```
git sync
```

- To associate a local repo with a **REMOTE** repo:
```
git remote add origin <url>
```

- To create a local repo based on a **REMOTE** repo:
```
git clone
```

- If you only have read-permissions on a repo, and you want to make changes, this is how you create your own, separate, writeable copy:
```
git fork
```

- To see a graphical representation of the commit/branch history:
```
git log --graph
```


# Example GitHub Pull Request Scenario
A user wants to make a change to a repo they can't directly modify. So they...

- Make a fork of the repo, which creates a personal copy.  
- Before making any changes in their fork, they create a new branch to act as a container for their changes.  
- Makes changes to the code
- Issues a commit on their fork and branch
- The last step is to make a pull request to the owner of the original repo.
	-  The pull request specifies:
		-  source repo and branch
		- destination repo and branches.
	- It's called a *pull request* bc you're asking the owner of the repo to pull in your changes.	
- **Git Convention**: 
	- make all commits/changes in branch. 
	
# Git Concepts
## Usability / General

- Primarily a command-line tool
- Very opinionated tool
- Command line interface is a pretty leaky abstraction over it's data model.
- Man pages are basically useless
- there's no 'locking', so checkout is only switching the branches
- The fundamental design concept seems to be making branching and offline work easy.  The former is very useful, the latter, less so.

## Design
- It's distributed, so you have to keep in mind whether you're performing an operation on the local or remote copy of the repo.
- Because it's distributed, it can't have *monotonically* incrementing version numbers for files or changesets, bc otherwise it would get conflicts.  
	- Instead of versions, commits keep a sha1 hash (40 digits of hex) of just the changes.  Usually the first 7 of the hash is enough to identify the commit.
- Git uses a Directed Acyclic Graph as it's primary data structure.
	- Each node is associated with a commit (identified by the hash)
	- Each commit has some metadata associated with it:
		- Tree that has all the changes
		- parent pointer
		- who created
		- when
	- HEAD is just a pointer to the current version/node in the graph
- Tags are just pointers to commits
- The data base can be investigated by looking into the .git directory:
	- **.gitignore**: what files to ignore in your repo
	- **.gitattributes**: tells git things like which files should be treated as binary and how line endings should be handled.
	- **Heads directory**: tells you the different branches in the repo
	- TODO: Add more details about the different parts of the filesystem git db (ie what's in .git)
- Git tracks 2 different kinds of things:
	- **trees**: directories (basically containers)
	- **blobs**: files
- Branches live in the global namespace, hence the typical convention of using a hierarchy: type/name (e.g. feature/myNewFeature).


# Git Commands for .NET Developers
- There is no Source Control Explorer for TFS Team Projects using Git.
	- There are probably other 3rd party explorers, but [SourceTree](https://www.sourcetreeapp.com/) from Atlassian is one.
- One way to get to the Command line from Team Explorer:
	- Double click the Team Project that uses GIT
	- Click 'Changes' -> Changes -> Open Command Prompt
	
- Add some file:
	```
	git add ReadMe
	```
- Create a new Branch:
	```
	git branch branchName
	```
- See a list of branches:
	```
	git branch --list
	```
- Rename an existing branch:
	```
	git branch -m newName
	```
- Delete the branch:
	```
	git branch -d
	```
- Switch (checkout) to new branch:
	```
	git checkout branchName
	```
- Switch to new branch, creating it in the process:
	```
	git checkout -b branchName
	```
- To revert to an older version of a specific branch / file:
	```
	git checkout commitNumber fileName
	```
- To clone a remote repo:
	```
	git clone url localPath
	```
- To rollback an earlier commit use git reset. Not sure on the details though:
	```
	git help reset
	```
- To commit:
	```
	git commit -m "your message"
	```
- View N most recent commits:
	```
	git log -n number
	```
- To do diffs:
	- There's lots of way to do this.  The raw diffs aren't so useful, so you might want to refister a diff tool in git config.  For example, this would register Beyond Compare:
	```
	git config --global diff.tool bc3
	git config --global difftool.bc3.path "c:/Program Files (x86)/Beyond Compare 4/bcomp.exe"
	```
	- Similar approach with the merge tool you use:
	```
	git config --global merge.tool bc3
	git config --global mergetool.bc3.path "c:/Program Files (x86)/Beyond Compare 4/bcomp.exe"
	```
- To get the most recent copy of the remote repo and merge it into your local repo, you would issue a fetch, followed by a merge.  But pull is actually the combination of them:
	```
	git pull remotePath
	```
- To push your commits to the remote repo:
	```
	git push url branchname
	```
- To see what changes have been made locally:
	```
	git status
	```
from [this](http://www.developerhandbook.com/git/git-for-net-developers/) blog post

# A .gitignore file for .NET projects

- Copy these contents into the .gitignore file in your root directory.
- Make sure that this file is committed the repo.
    ```
    */obj/*
    */bin/*
    */uploads/*
    *.suo
    **/*.suo
    node_modules/
    [Oo]bj/
    [Bb]in/
    .nuget/
    _ReSharper.*
    packages/
    artifacts/
    *.user
    *.suo
    *.userprefs
    *DS_Store
    *.sln.ide
    .vs/```


# Installing GIT and GitFlow on Windows and Using Commandline GIT

- Since GIT originated on linux, there are lots of different ports available for windows.
	- Many involve GUI clients (GitHub for Windows, External Git Tools for VS, posh-git, etc.)
		- But since GIT is already a pretty leaky abstraction over it's data model, relying on these simplifications only further obfuscates GIT.
		- Each GUI client will install different tools, or git versions and it can become quite complicated knowing the origination of all the different files.
	- Best to settle one one simple solution that applies to all needs
		- This points in the direction of command line usage, since you'll get all the functionality you need.
		- Want a solution which is interoperable with GitHub and TFS Git remotes
	
- A simple and (hopefully) optimal Git stack for windows is:
	- Git for Windows (formerly msysgit)
	- Using the Git for Windows Bash commandline
	- Using git-flow
	
**Installation and Configuration**

- Git for Windows
	- Download and [install](https://git-for-windows.github.io/)
		
- Configure Git-Bash
	- This was installed by Git for Windows (see install location): git-bash.exe
	- Put a shortcut to the taskbar on this executable
	- Putting configuration files in your home directory:
        - To find out your home directory, run git-bash.exe and type: ```echo ~```
        - Probably something like //c//Users//skjeit
        - Now cd to that directory and type: ```touch ~/.bashrc```
        - Then open this file in a text editor and type in some useful aliases:
        ```
        alias tfs_repos='cd /c/tfsgit_workspace/'
		alias gh_repos='cd /c/GitWorkspace' 
        ```
            - This will allow you to quickly navigate to your various roots for TFS and GitHub (if that's how you've chosen to set it up)
            - The first time you rerun git-bash.exe (as admin - *always*), it might give you a message about needing to create a profile that will load your .bashrc.  That's fine.  Then you can close and rerun, and you should be good.

- Set up Git-Flow
	- Follow [these](https://github.com/nvie/gitflow/wiki/Windows#git-for-windows-previously-msysgit) instructions exactly
	- Rather than a sym link, I created an alias for git-flow: ```alias git-flow='/C/Program Files/Git/bin/git-flow'```
	
- Attempt to interact with TFS via Cmdline
	- See [these](https://github.com/git-for-windows/git/wiki/FAQ#how-do-i-access-a-repository-hosted-on-a-microsoft-team-foundation-server-inside-a-windows-domain) instructions
	- You can get the url from the remotes info in the .git/config file, under [remote "origin"]
        - For example: 
        ```
        git clone --recursive  http://:@ricnmittfs01prd:8080/tfs/defaultcollection/_git/AftonPublicSite test-tfs-clone
        ```

# Containers: Team Project Collection vs Team Project vs GIT Repos

- Team Project Collections: 
	- Generally, you want to create projects within the same Team Project Collection.
	- Artifacts (source code, work items, project templates) in different Team Project Collections are completely separated. 
	- Team Project Collections are **physically separate** in the underlying DB.
	- You can create these when you want to have absolutely no interactions across Team Project Collections.

- Team Projects:
	- Team Projects are logically isolated from each other.
	- Team Projects can have lots of different projects (repos) within them.
	- Team Projects generally share the same development process / TFS process template.

- Mapping to GIT:
	- Generally speaking, you want one GIT repo per solution.
		- Since the whole repo gets sync'ed to your local machine, you wouldn't want to put everything in 1 repo anyways.
	- When you create a new Team Project in TFS, it will ask you for the VCS (presumably, GIT instead of TFSVC), and it will then create a GIT repo of the same name as the Team Project.
		- If your Team Project is likely to have more than 1 solution file, **DO NOT USE THIS** repo!
	- You can create as many repos as you want within a Team Project.

# Managing Containers in TFS
- Creating Team Projects:
	- You can do this from Team Explorer (VS 2015 only) or the Web Interface
	- See [here](https://msdn.microsoft.com/en-us/library/vs/alm/overview/create-team-project) for instructions.
- Creating a New Repo Within A Team Project:
	- See [here](https://www.benday.com/2014/05/23/yes-can-create-two-git-repos-per-tfs-team-project/) for instructions.
- TFS Web Interface URL structure:
	- TFS_ROOT/TEAM_PROJECT_COLLECTION/TEAM_PROJECT
	- TFS_ROOT Example:  http://ricnmittfs01prd:8080/tfs/
	- TEAM_PROJECT_COLLECTION Example: DefaultCollection
	- TEAM_PROJECT Examples: 
		- NewMarket
		- AftonPublicSite
		- ...
	- Example Team project URL:
		- http://ricnmittfs01prd:8080/tfs/DefaultCollection/NewMarket
	- To manage the various repos (set security, add a new repo, etc.) in a Team Project, use this URL structure:
		- TFS_ROOT/TEAM_PROJECT_COLLECTION/TEAM_PROJECT/_admin/_versioncontrol
		- Example: http://ricnmittfs01prd:8080/tfs/DefaultCollection/NewMarket/_admin/_versioncontrol

# Migrating a TFSVC Project To the TFS GIT
- From a high-level, you have two approaches available:
	- Local Repo First (i.e. Fill a local repo, then push to remote)
	- Remote Repo First  (i.e. Clone an empty repo from remote, fill, then push back up)
		- This is the *preferred* option bc it will take care of some of the initial remote/local (origin) plumbing for you.  This is the method I'll describe below.
		- On the other hand, if you want to got with Local Repo first, the command-line instructions to push to the remote is presented in the TFS Web interface.  It looks something like this:
	> git remote add origin http://ricnmittfs01prd:8080/tfs/DefaultCollection/NewMarket/_git/VendorAssessment 
git push -u origin --all
- **Clone To Local**: 
	- Once you've created your Git repo (either in a new Team Project or not), on the server (instructions above), you'll want to Clone it to your local machine.
		- In your GIT shell, change your directory to your TFS git root (see above- recall the command: *tfs_repos* which should take you there.) .
		- You'll execute a command that looks like this:
			> git clone http://@ricnmittfs01prd:8080/tfs/DefaultCollection/NewMarket/_git/VendorAssessment
		
		- To get the specific command, navigate in the TFS Web Interface to the Team Project's home, then select 'Code' (at the top) and then 'Explorer'.  Make sure the appropriate GIT repo is selected.  The section labelled 'Clone This Repository' will give you exact command to execute.
		- You don't need to make subdir within your TFS Git root directory - the clone command will do that for you.
		
- **Add a README.md:**
	- It's a best practice to create a README file in each project which explains:
		- Purpose of the application
		- Dependencies / Stack
		- Business Owners / Users
		- Main Developer / Contact
		- Environment, service accounts (if known)
		- Anything else which might be pertinent to a developer inheriting this project if you were hit by a bus.
	- The .md file is short for markdown.  It's a super simple mark-up syntax (like HTML, but way, way simpler.  You can learn in 3 min easy) which can get processed into a nicer looking, lightweight document.

- **Copy files from TFSCS workspace**
	- Using the CLI or Windows Explorer, copy all the files from your old workspace into the new repo directlry
- **Remove TFSVC files:**
	- Recursively remove any TFSVC files in windows explorer:
		- *.vspscc
		- *.vssscc
- **Change permissions on all files**
	- They'll all be locally readable, rather than using the familiar local locking mechanism
	- Using windows explorer, make everything readable and non-hidden (recursive).
- **The .gitattributes file:**
	- This file tells git how to handle things like line endings and what files should be binary instead of text.
	- First, create the .gitattributes file:
		- On the CLI (in the repo's root directory), type:
	```
		touch .gitattributes 
		notepad .gitattributes 
		```
	- Then copy in the lines and save.
	> *.png binary
*.gif binary
*.jpg binary
*.jpeg binary
*.dll binary
*.doc binary
*.docx binary
*.xls binary
*.xlsx binary
*.pdf binary
- **The .gitignore file:**
	- The purpose of the .gitignore file is to let Git know which files you don't want to track / add to the repo.
	- Typically, this would be compiled files (such as DLL's), however you can also specify exceptions.
	- First, Add a .gitignore file:
		- On the CLI (in the repo's root directory), type:
		```
		touch .gitignore
		notepad .gitignore
		```
	- Enter the following to ignore your obj files (and follow this pattern if you have other things you want excluded:
	```
	*/obj/*
	```
	- If you have exceptions, you can specify them like this:
	```
		! */obj/Debug/KeepThisFileCauseItsGotNoSource.dll
		```
		
- **Commit and Push to Remote Repo**	
	- First, commit the changes to the local repository:

		> git init
		git add *
		git status //to verify your files are ready to be pushed
		git commit -a -m "first commit"
		git flow init
	
	- Then, you need to push these changes to Master (for this first time, there's no reason to create a branch) on the remote repo:
	```
	git push
	```
	

**NEXT STEPS**
- **TODO: document Merging / Merge tools**
- **TODO: more documentation of Branching with git-flow**
        