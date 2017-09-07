# IPL Dashboard
[Demo](https://mukuljain.me/demo/ipl-dashboard/)

### Data Pre-processing
As the given [data](https://www.kaggle.com/manasgarg/ipl) can not be used directly it is important to pre-process.


### Stack Used

**React.js**: React is fast, easy to use, component based, very popular.

**Recharts**: Reacharts library is based on d3js and built on react component, vastly customizable.

**Foundation**: Foundation is standard framework I use, because of extremely useful classes and familiarity

**react-router**: a Standard router for react.

### Bonus Points

1. **Optimize the loading time:**
    1. Optimized loading time, by creating a basic HTML & CSS structure(similar to dashboard) with a loader, so user can see something, while browser is fetching JS.
    2. By making API call when the user opens a particular tab or page.
2. **Mobile responsive**
    1. Made the app responsive with foundation framework without and self-written media query
    2. Two tabs contain the table, made them scrollable on small screens.
    3. In Desktop graph filter and options are visible at once, but on mobile & tablets, user can use a button to switch between them so he doesn't have to scroll down much.
3. **Progressive Web App**
    1. Created progressive web app, by installing service worker and saving all important files like the index, CSS, js by user installs the app.
    2. Fulfilled
4. **Offline Usable**
    1. Service worker catches every request app makes, whether on PC browser or via mobile app, so it can be used even when the internet is not available.


### Google Lighthouse report

![](https://github.com/mukuljainx/IPL-Dashboard/blob/master/lighthouse.png)


### Issue

1. Better view than table for top players
2. Allow user to select from top players page, then jump to to comparison
3. Selection always visible so user can quickly remove one and add another.
4. **PWA** Cache the json response with some expiry data to app can work offline always.
