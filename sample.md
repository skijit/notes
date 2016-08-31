Sample Title
=================
- There's only one title
- You can add some general info in bullets underneath if you want
- This content won't be collapsed like stuff underneath a heading
- Assuming you have headings in your file, then anything you put in between the title and the first headings gets placed in this panel, called the 'manifest'.
    - It supports lists and links.
    - For example, you can make a table of contents and link to other files...
    
**Math Files**  
- [Desmos](/math/desmos)  
- [Exponents](/math/exponents)  
- [Logarithms](/math/logarithms)  
- [Polynomials](/math/polynomials)  
  
**Music Files**
- [Something](/math/desmos)  
- [Something Else](/math/exponents)  
- [Yadda](/math/logarithms)  


## Headings
- Most content will go under a Heading
- Headings can be nested like this...

### A Sub Heading
- Here's the content in a subheadings
- Notice that the subheading has a slightly smaller font size
- Also, you can collapse by parent (click the arrow in the Heading)

## Outlines
- You can easily create and combine ordered and unordered lists at any level of nesting...

### Unordered Lists
- Items can be nested pretty deeply...
    - Like this
    - Or if you want to go deeper
        - Like this
            - Or even this

### Ordered Lists
1. Just enter the ordering item like...
2. Any of these: `2.` or `a.` or `I.` or `i.`
    1. These items can be nested ...
        1. Or combined in any way with ordered lists
            1. This is the 4th level of nesting...
3. Note that the ordinal type will not necessarily match what is in the md file
    - That is because it is set by the CSS rules
    - Which is the same as with Unordered lists 
        
## Links
- [Link to an outside page](///www.google.com)
- [Link to a local page](/math/desmos)
- [Link to an in-page anchor](#Block-Quotes)
    - Note the case-sensitivity
- [Link to an anchor in a given page](/programming/dotnet/tools/vs-2015-power-user-essentials#Video-7-Letting-Visual-Studio-Help-You)

## Images
- Images hosted locally
    - ![this is the alt title](/resources/images/programming/git_merge_commit_1.png)
- Images remotely hosted
    - ![this is the alt title](http://upload.wikimedia.org/wikipedia/commons/0/02/Simple_sine_wave.svg)

## Block Quotes
    All you have to do is start typing with a single indentation
    And you'll get some block quotes!
- These can appear in the context of a list...
      And it will look like this...
      Whoo hoo!
      Note the expected tab setting for a sublist is 4, so by starting at 6,
      this lets the compiler know you want a block quote.
- **CAVEAT**: It might take a little work to know the right offset for block quotes...
- Don't be afraid to experiment.

## Fenced Block Quotes
> Similar to how block quotes work...  
> Except, you preface with the '>' character.  
> Note that to avoid word-wrap (i.e. honoring your carriage returns as newlines), you  
> should add a couple trailing spaces to the previous line.

- As before...
    > These...  
    > Can appear  
    > as nested-items  
    > in a list.

- **CAVEATS**: in addition to regular, unfenced block quotes...
    - note that you should have an empty newline separating fenced block quotes from it's following content
    
## Code Blocks
- You can do Inline and block code blocks
- Block code blocks can use syntax highlighting whereas inline code blocks will not.

### Inline Code Blocks
- Just enclose whatever content you want in `single backticks`

### Block Code Blocks
- Enclose your content in triple backticks and specify the language immediately following in parentheses...  

```(javascript)
function setup() {
    createCanvas(640, 480);
}

function draw() {
    ellipse(100,100,80,80);
}```

- Another example...  
```(cs)
public class Customer
{
    //constructor
    public Customer(string name)
    {
        Name = name;
    }    
    
    //note property only has get
    public string Name { get; }
}```

- To get the proper name of the language, check this file: `/node_modules/highlight.js/lib/index.js`

## LaTEX
- For an in-line LaTEX Expression, enclose in a single backtick followed by the **-** sign.
    - the in will occur inline `- \log_{10} 1000 - \log_{10} 10 = 3 - 1 = 2` with the rest of your content
- For a block LaTEX expression, use 3 backticks, followed by the **+** sign: ```+ \log_{10} 1000 - \log_{10} 10 = 3 - 1 = 2```

## Tables
- Here's an example of a table...

| 1 | 2 | 3 | 4 |
| :---: | :---: | :---: | :---: |
| G- | G- | Bb | Bb |
| Eb | Eo | F - Bb | F |
| C- | C- | G- | G- |
| A0 | `other stuff` |  `- \log_{10} 1000 - \log_{10} 10 = 3 - 1 = 2`  | [Desmos](/math/desmos)  |

- **Note**: You need to put a line break between the table and whatever precedes it.


## A Pseudo-Table-of-Contents
- You can use a fenced block quote as the basis for something else that looks like a table of contents
- You can link to items in the current file or other files
- Be sure to follow the trailing blanks rule to get breaks where you want.

> **Math Files**  
>   - [Desmos](/math/desmos)  
>   - [Exponents](/math/exponents)  
>   - [Logarithms](/math/logarithms)  
>   - [Polynomials](/math/polynomials)  
>  
> **Music Files**
>   - [Something](/math/desmos)  
>   - [Something Else](/math/exponents)  
>   - [Yadda](/math/logarithms)  


## Bold and Italics
- **Bold**: enclose in `**`
- _Italics_: enclose in `_`
- **_Bold and Italics_** in `**_`

## Line Breaks
This  
is
&nbsp;  
&nbsp;  
&nbsp;  
3 line breaks together  
- It's all about using the `&nbsp;` followed by two spaces
- [This](https://daringfireball.net/projects/markdown/syntax) is a good explanatory link, btw

## Paragraphs

You can just start writing and it will treat this as a paragraph.  But be advised that it will word-wrap unless you end a line in the markdown with two empty spaces (which is the same rule as with block quotes and fenced block quotes.
&nbsp;  
&nbsp;  
Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. 


 

