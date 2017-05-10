#Help

Because sometimes I forget how to drive the software I'm running. 


### Gitbook:
[https://github.com/GitbookIO/gitbook](https://github.com/GitbookIO/gitbook)  
[https://github.com/GitbookIO/gitbook/blob/master/docs/setup.md](https://github.com/GitbookIO/gitbook/blob/master/docs/setup.md)  
[https://toolchain.gitbook.com/](https://toolchain.gitbook.com/)
```
npm install -g gitbook-cli

cd sites/til
gitbook help
gitbook build .
gitbook serve .
http://localhost:4000/
```


### Markdown:

[Markdown Cheatsheet from Github](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)

### Code:
#### Piwik Plugin
[https://github.com/emmanuel-keller/gitbook-plugin-piwik](https://github.com/emmanuel-keller/gitbook-plugin-piwik)
#### Ace Plugin
[https://github.com/ymcatar/gitbook-plugin-ace](https://github.com/ymcatar/gitbook-plugin-ace)  
[Ace Plugin Languages/Themes](https://github.com/ymcatar/gitbook-plugin-ace/tree/master/assets/ace)  




{%ace edit=true, lang='javascript' theme='github'%}

int main(){
  printf("Hello World!");
  return 1;
}
{%endace%}  


or just use the language identifier after the back ticks for the code block in markdown  

```html
<style>
    * {
        margin: 0;
        padding: 0;
    }
</style>
<script>
    $(document).ready(function(){
        var something = 5;
        if (something == 5){
            console.log('woohoo');
        }
    });
</script>
<section>
    <p>Hello world</p>
</section>
```

#### Github 
[https://github.com/visallo/gitbook-plugin-github-embed](https://github.com/visallo/gitbook-plugin-github-embed)

#### Toggle Chapters
[https://github.com/poojan/gitbook-plugin-toggle-chapters](https://github.com/poojan/gitbook-plugin-toggle-chapters)  
[https://github.com/hypertrack/gitbook-plugin-toggle-headers](https://github.com/hypertrack/gitbook-plugin-toggle-headers)

### Media:
#### Images:
```
![tabs](./img/til_tabs.png)
```  

#### Add video from Youtube or Vimeo
```
{% video %}https://www.domain.com/video_url{% endvideo %}

```
#### Add video from source file
```
//add url using html5
<video width="720" height="480" controls src="https://davidawindham.com/media/rose-syl.mp4" type="video/mp4"></video>
```

###HTML
adding published date with microformat
[https://www.w3.org/TR/NOTE-datetime](https://www.w3.org/TR/NOTE-datetime)
```
<time class="updated" datetime="2016-11-30T11:16:16+00:00" itemprop="datePublished">11/30/2016</time>
```



