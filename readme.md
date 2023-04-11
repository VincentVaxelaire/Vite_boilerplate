The app work but you should not use this in production for now !

To run the app clone or fork the project. Then `npm i` in your terminal and then `npm run dev`

`./index.html` file is the template file. It's work like a layout file. So you can put all your shared html markup across your pages.

Each page of your app should be in `./public` folder and follow this template :

```html
<!DOCTYPE html>
<html>

<head>
    <slot name="head">
        <!--all your meta data here (like descripttion for this page)-->
        <title>Home page</title>
    </slot>
</head>

<body>
    <slot name="main">
        <!--the html of the page-->
        <h1>Welcome</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </slot>
</body>

</html>
```

Every internal link should follow this template :
```html
<a href="/about" data-navigation>about</a>
```

Every external link should follow this template :
```html
<a href="https://www.google.com" target="_blank">extern link</a>
```
