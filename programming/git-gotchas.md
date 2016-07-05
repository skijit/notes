A Collection of Misc Gotchas About Git
===============

## Windows-Based Git

### Long File Names
- Long paths (>260 chars) are disabled by default in Git for Windows.
- You can enable them using: ```git config core.longpaths true```
- One example when this can happen is if you're using Git as a remote file-deployment solution (i.e. FTP) and you need to copy all the files in your repo, including some deeply nested file structures, such as live in ```node_modules```.  I've had this problem with Azure deployments.
- [reference](https://github.com/msysgit/msysgit/wiki/Git-cannot-create-a-file-or-directory-with-a-long-path)

### Changing casing in filenames or folders
- See the normal ```git mv``` notes below.
- This procedure changes if you're just changing casing on a case-insensitive file system.
- You can use this approach on Windows: ```git mv foldername tempname && git mv tempname folderName```
- [reference](http://stackoverflow.com/questions/11183788/in-a-git-repository-how-to-properly-rename-a-directory)

## Tips for restructuring files and folders in Git

### git mv
- This will move the file on the file system and also let Git know that the file has been moved.
- Example: ```git mv hello.html lib```
- If you run a ```git status```, the moved file's status will be **renamed**
- Alternately, you could just use the following more verbose procedure to the same effect.
    ```
    mv hello.html lib
    git add lib/hello.html
    git rm hello.html```
- [reference](https://githowto.com/moving_files)
- If you're only changing case on files/folders, see [here](###changing-casing-in-filenames-or-folders) 

## Git and Directories
- Git doesn't care about directories, only the files inside them.
- So you don't ever need to add directories, just add the files and the directories will transfer as a matter of course.
- If you need to create an **empty directory**, you can add/commit a .gitignore inside that directory with the following contents:
    ```
    # Ignore everything in this directory
    *
    # Except this file
    !.gitignore```
- [reference](http://stackoverflow.com/questions/115983/how-can-i-add-an-empty-directory-to-a-git-repository)

## .gitignore and file add order
- If Git is already tracking a a file which you then later reference (directly or indirectly) in your .gitignore file, it will not be automatically removed.  You need to manually remove it: ```git rm --cached <file>```
- [reference](http://stackoverflow.com/questions/1274057/making-git-forget-about-a-file-that-was-tracked-but-is-now-in-gitignore)
