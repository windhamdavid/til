# Music

25/04/26 - I just started relearning how to read and write music because [I got a new keyboard](/posts/arturia). I need an easy way to make notes about music notation and ideally, I could just use a library to make notation here in markdown. It'd also be nice to have a way to illustrate the piano keys without images. I've started to getting some pdfs together of the major scales. I've also started using Logic Pro instead of Adobe Audition which is gonna require a whole other set of cheat sheets.


## Log

- 25/04/25 - [new keyboard](/posts/arturia)


## Notation

In Obsidian, I'm able to use the ABC Notation ( https://en.wikipedia.org/wiki/ABC_notation ) via https://www.abcjs.net - will need to pull the library in for using it here. 

I added two tools for [Music Notation](abcjs) but I can only use them with ```mdx``` using ```jsx``` embedding.

```js
<ABC notation={`
X:1
T:Example
M:4/4
L:1/8
K:C
C,D,E,F, G,A,B,C DEFG ABcd|efgab c'd'e'f' g'a'b'c''|
`} 
/>

```

```js
{
  "tablature": [{"instrument": "piano"}]
}
---
X:1
T: David's
M: 4/4
L: 1/8
R: reel
K: G
|:D2|EB{c}BA B2 EB|~B2 AB dBAG|FDAD BDAD|FDAD dAFD|
```

## References

- 


## See Also

- [/lists/art/music](/lists/art/music/)
- [/lists/art/music/playlist](/lists/art/music/playlist)