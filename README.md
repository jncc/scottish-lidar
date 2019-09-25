
Scottish Remote Sensing Portal
==============================

The [Scottish Remote Sensing Portal](https://remotesensingdata.gov.scot/) is designed, developed and supported by JNCC.

> The repository is named `scottish-lidar` for historical reasons.

Development
-----------

Please enable [EditorConfig](https://EditorConfig.org) before you do anything else. For VS Code, install the extension.

Create an `.env` file by copying `.example.env`.

You'll need Node (version 8+), with Yarn installed.

    yarn      # install packages
    yarn dev  # build and run a development server

Parcel.js
---------

Parcel.js is great, but so far has very basic support for multi-page web applications.

(1) Due to [this issue](https://github.com/parcel-bundler/parcel/issues/1315) you'll need to open your browser manually at

    http://localhost:4000/index.html  <-- note the `index.html`

In production, the `.html` extension isn't needed. Github Pages serves `.html`, and `index.html`, automatically.

This means we need a workaround for ugly local development URLs. Variables are appended to page URLs so that in-app links work at development time:

    PAGE_EXTENSION=".pug"
    INDEX_PAGE=index

These variables are both set to the empty string in production, and HTML links are constructed like so:

    a(href='/about' + process.env.PAGE_EXTENSION) Go to the About page
        ->  /about       # prod
        ->  /about.pug   # dev

    a(href='/' + process.env.INDEX_PAGE + process.env.PAGE_EXTENSION) Go to the home page
        ->  /            # prod
        ->  /index.pug   # dev

(But note that Parcel *then* converts .pug templates into .html files!)

(2) Due to [this bug](https://github.com/parcel-bundler/parcel/issues/2340) each page currently has its own bundle. This could be improved significantly in the future - only three bundles are really needed; one for the static pages, one for the single-page React app, and one shared bundle.

> Parcel errors, warnings and unexpectedness can often be fixed by **clearing its cache**.

    yarn clean   # cleans all build output, including the Parcel cache

Code style, testing and building
--------------------------------

Ensure your code passes the TSLint style rules. Jest is the test framework, and has a nice interactive runner which you can leave running in a console.

    yarn test:watch

To avoid failures at the build server, run the production build pipeline before pushing.

    yarn build

Tips
----

Upgrade all library packages to their latest versions with

    yarn upgrade --latest

The parcel-plugin-bundle-visualiser package creates a visual report on bundle size. Build without source maps so they don't confuse matters, and view the output file in `dist/report.html`.

    yarn build --no-source-maps

Deployment
----------

The site is automatically to Github Pages by Jenkins using the script in `deploy/`. You can see the currently deployed build in the custom `x-version` meta tag at the top of the HTML pages, with the format `{build-number}.{git-commit}` . For example,

    <meta name="x-version" content="43.320b45076e0c0ffc3016944f66754f32af85a6cf">

Page structure
--------------

The web application consists of several html "content" pages plus a page that holds the single-page React app. It has been designed to be hosted in production on a static web host service; there is no dynamic web server, and we make do with direct calls to the JNCC Catalog database API.

    - /                         - home page       (index.html)
    - /data                     - the react app   (data.html)
    - /data#/list                   - the list screen
    - /data#/list?lidar/phase-1     - the list screen, filtered
    - /data#/map                    - the map screen
    - /data#/map?c=lidar/phase-1    - the map screen (?not sure yet?)
    - /data#/download               - the download screen
    - /about                    - about page      (about.html)
    - /contribute               - contribute page (contribute.html)
    - /cookies                  - cookies page    (cookies.html)
    - /privacy                  - privacy page    (privacy.html)
    - /404                      - 404 page        (404.html)

Note that we use the react-router `HashRouter` to ensure the app behaves itself in a static hosting envirnoment. You can navigate directly to deep links and refresh the browser within the app because the static `data.html` page will be (re)fetched from the server, then allowing the the client-side router to take over.

Data model and server-side API
------------------------------

We expose the existing "Catalog" database API on the Internet, removing the need for any backend web server or cloud functions. This also creates the possibility of a significant future deliverable.

See the `jncc/catalog` repository. You can run a full local instance of the database and API with Docker. 🐳

The Catalog database has two basic concepts: *collections* and *products*. In this application, a collection is a *dataset*, visualized with a *layer* on the map.

Get all collection metadata (for `scotland-gov`):

    GET search/collection/scotland-gov/*

- `scotland-gov/lidar/phase-1/dsm`
- `scotland-gov/lidar/phase-1/dtm`
- `scotland-gov/lidar/phase-1/laz`
- `scotland-gov/lidar/phase-2/dsm`
- `scotland-gov/lidar/phase-2/dtm`
- etc...

There are currently 9 collections, so an assumption of the app design is that this collection metadata can fit into memory easily and be fetched in one request. We'll keep this collection in memory, as it's used by both the list screen and the map sidebar.

Collections are filterable by *group* in the list screen, e.g.

- `scotland-gov/lidar/phase-1`
- `scotland-gov/lidar/phase-2`
- `scotland-gov/lidar/phase-3`

Collections are also grouped in the map screen in the same way, e.g.

- lidar/phase-1 (*group*)
  - dsm `scotland-gov/lidar/phase-1/dsm` (*collection*)
  - dtm `scotland-gov/lidar/phase-1/dtm`
  - laz `scotland-gov/lidar/phase-1/laz`

Clearly we need a helper function `parseCollectionName(collectionName: string): ParsedCollectionName`, where:

    interface ParsedCollectionName {
        Owner:   string  // `scotland-gov`
        Group:   string  // `lidar/phase-1`
        Dataset: string  // `dsm`
    }

One oddity is that the OGC WMS service URLs for the collections are stored as products (in a separate, special collection). We'll have to join them on the client.

    POST search/product
    {
        "collection": "scotland-gov/lidar/ogc",
    }

This query gives a list of OGC products which we can identify using the product name:

`scotland-gov/lidar/phase-1/dtm` for this collection...  
`scotland-gov-lidar-phase-1-dtm` the OGC product has a corresponding product name

The List page can also be filtered to e.g. a group by querystring value e.g. `lidar/phase-1`.
This is client-side filter of the collections lookup. (By the way, the server-side alternative would be `GET search/collection/scotland-gov/lidar/phase-1/*`)

    GET search/product

Map page needs to know which collections are currently matching bbox:

    `POST search/collectionscontainingproducts` // or whatever it's called exactly
        {
            footprint
            spatial-op
            [collection1,collection2]
        }
Returns [(collection-name, count)]

Note: Will need to send all collections from the in-memory collection list.

Future home page summary stats?
Could use collectionscontainingproducts with the maximal bounding box to get all collections and their product count.

Mapper
------

- Consider react-leafet. https://react-leaflet.js.org/docs/en/intro.html#limitations
- Want almost full-screen Leaflet https://github.com/Leaflet/Leaflet/issues/1266
- Leaflet CSS might need normal CSS box model. https://getbootstrap.com/docs/4.3/getting-started/introduction/#box-sizing

Project plan
------------

- [0.?] Task: Make the new Geoserver https://github.com/jncc/scottish-lidar/issues/3
- [1.0] Task: Planning and design iteration [1 week] https://github.com/jncc/scottish-lidar/issues/4
- [0.8] Task: Change SQL library (maintenance) https://github.com/jncc/scottish-lidar/issues/5
- [0.8] Task: Make the public Lidar Catalog API https://github.com/jncc/scottish-lidar/issues/6
- [1.0] Task: Infrastructure and Deployment https://github.com/jncc/scottish-lidar/issues/7
- [1.0] Task: Basic web app with empty Home, Map and About pages (Pete) [1 week] https://github.com/jncc/scottish-lidar/issues/8
- [0.8] Task: List page [1 week] https://github.com/jncc/scottish-lidar/issues/9
- [1.0] Task: Basket functionality [1 week] https://github.com/jncc/scottish-lidar/issues/10
- [0.3] Task: Download page [1 week] https://github.com/jncc/scottish-lidar/issues/11
- [0.0] Task: Styling [1 week]
- [0.0] Task: Map page [the rest of the time] https://github.com/jncc/scottish-lidar/issues/13
- [0.2] Task: Aggregate outline layer [1 week] https://github.com/jncc/scottish-lidar/issues/17
- [0.0] Task: Web essentials [1 week] https://github.com/jncc/scottish-lidar/issues/12
- [0.0] Task: Feedback [1 week] https://github.com/jncc/scottish-lidar/issues/14
- [0.0] Task (Stretch): Gazetteer https://github.com/jncc/scottish-lidar/issues/15
