Git Core Concepts
==============

- [visual guide to git operations](http://marklodato.github.io/visual-git-guide/index-en.html)
- [good git core concepts tutorial (series)](https://www.youtube.com/watch?v=uR6G2v_WsRA)

## Versioning across the 3 core areas
- 3 core areas
  1. working tree
    - what we see in our filesystem
  2. staging area (index)
    - the changes from the working tree that we want in our next commit
  3. history
    - the commit graph
    - db and metadata which live in the .git directory
- `git diff` shows differences between working tree and staging area
  - if you haven't staged some modified file, the staging area defaults to the last committed version
    - best to think about the staging area as a complete copy, not just incremental changes
- `git diff --staged` shows differences between staging area and history
- overwrite a working tree file with staged version: `git checkout -- that-file.md`
- overwrite a staging area file with the history version: `git reset HEAD that-file.md`  
- to get a version of a file from an earlier commit (rather than the whole commit): `git checkout <sha> -- that-file.md`
- you don't have to commit the `.gitignore` for it to become active

## Branches and Merging
- A branch is just a pointer to a commit (identified by it's hash)
  - master branch (pointer) is created automatically
- HEAD is also a pointer, but NOT to a commit
  - it points to whatever we've checked out, which is usually (but not necessarily), a branch  
  - thus it's called a 'symbolic pointer'
- `git branch` will what branches exist and will asterisk which branch HEAD points to
  - `git branch -a` will show all branches (even remote tracking branches)
  - `git branch -r` will show only remote trakcing branches
- `git branch <branchname>` will create the current branch
  - or use `git checkout -b <branchname>`
- `git branch --merged` will show you which branches are in sync with your current branch
- `git branch -d <branchName>` will delete the branch
- Fast Forward Merge:
  - When merging a branch (e.g. feature) into another (e.g. master), if the feature branch is still a descendant of the master and master has no intervening changes, it's just a matter of moving the branch pointer ahead
- 3-Way Merge:
  - Creates a new commit, called the 'Merge Commit' which has 3 components:
    - The unique commits on branch 1
    - The unique commits on branch 2
    - Their shared ancestor
- Merge conflicts arise when commits from different branches have modified the same lines in the same files
- Best Practice: The usual way of reporting merge conflicts can be confusing, so if you change to using diff3, you'll get both versions of the line AND the shared ancestor.
 - `git config --global merge.conflictstyle diff3`
- Detached HEAD
  - Usually HEAD points to a branch, but if it's pointing to a commit, then you're in a Detached HEAD state
  - If you get a detached HEAD, it is best to create a branch off of it directly

## Remotes
- a Remote is a copy of the repository on another computer
  - 'origin' is the name of the first remote if you're cloning
- 'fetch' and 'push' to get and submit data to the remote
- `git remote` will show you the defined remotes
- `git remote -v` reveals more info showing you can have different fetch/push locations for the same remote
- when you check the log, you might see something like the following indicating "remote tracking branches"
```
* f5ac07 (HEAD -> master, origin/master, origin/HEAD) Initial commit
```
- remote tracking branches just show you what the corresponding branches look like at the origin
- you can't checkout a remote tracking branch: you'll end up in detached HEAD
- `git fetch origin` will update your remote tracking branches and may show that your corresponding local branches are out of sync
  - then you would want to `git merge origin/master` to fast-forward merge
  - `git pull` combines `git fetch` and `git merge`
- the `--set-upstream` in a `git push` associates the remote branch (being created) with current local branch, which is only important if you want to use `git pull` instead of `git fetch` and `git merge`

## Rebase
- Git Rebasing is actually a pretty accurate name
- If you're working in a feature branch, and it has some ancestor on master, and master has since received some changes
  - to merge the two will require a 3-way merge
  - instead you could use rebase on your feature branch to try to move that ancestor with master to the tip of master
- the value is that when you need to merge, it's a simple fast-forward and you don't need a 3-way merge
- best practice: don’t rebase a branch unless you are the only one who uses it
- other pro's:
  - you dont have to keep seeing all those merge commits





