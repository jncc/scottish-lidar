
Scottish Remote Sensing Data Portal
===================================

The [Scottish Remote Sensing Data Portal](https://remotesensingdata.gov.scot/) is designed, developed and supported by JNCC.

> The repository is named `scottish-lidar` for historical reasons.

Local development
-----------------

You'll need Node (version 8 or above), plus Yarn and Typescript installed globally.

    yarn      # install packages
    yarn dev  # build and run a development server

Workarounds for Parcel's limited support for multi-page apps
------------------------------------------------------------

Parcel.js is great but currently has only basic support for multi-page web applications.

Due to [this issue](https://github.com/parcel-bundler/parcel/issues/1315) you'll need to open your browser manually at

    http://localhost:4000/index.html <-- note the `index.html`

In production, the `.html` extension isn't needed (Github Pages searches for `.html` extensions, and `index.html` in particular, automatically).

Due to [this issue](https://github.com/parcel-bundler/parcel/issues/2340) each page currently has to have its own bundle. This could be improved and simplified in the future. Really only two bundles are needed - one shared bundle, with the styles, and one for the single-page app.

TODO: How to alter the links in dev / production?

- React Router could use .env `URL_EXTENSION`
- Pug could use `locals.URL_EXTENSION` (see Parcel docs)

TODO: Leaflet CSS might need normal CSS box model. https://getbootstrap.com/docs/4.3/getting-started/introduction/#box-sizing

Jenkins
-------

When building on Jenkins, set environment variables like so:

    SOME_VAR=some_val parcel index.html (or hopefully: SOME_VAR=some_val yarn dev)


Application structure 
---------------------

/home.html (`/`) - home page
/app.html         - react app
    - `/app#/list`
    - `/app#/list?group=lidar%2Fphase-1`
    - `/app#/map`
    - `/app#/download`
/about.html (`/about`)           - about page
/contribute.html (`/contribute`) - how to contribute page
/cookies.html (`/cookies`)       - cookies page
/privacy.html (`/privacy`)       - privacy page
/404.html (`/notthere`)          - 404 page

Server-side API
---------------

We're going to expose the existing "Catalog" database API on the Internet, removing the need for a backend web server or cloud functions. This is also a significant additional deliverable.

The Catalog database has two basic concepts: *collections* and *products*. In this application, a collection is visualized with a *layer* on the map.

`GET search/collection/scotland-gov/*` for the List page and the Map sidebar.

We are not expecting to need to use server-side paging for this call (collection data can fit into memory easily and be fetched in one request). We'll keep this collection in memory as it's used by all the application pages.

Collections are filterable by *group* (by the first 3 segments) in the List page, e.g.

- `scotland-gov/lidar/phase-1` (group)
- `scotland-gov/lidar/phase-2`
- `scotland-gov/lidar/phase-3`

Collections are also grouped in the Map UI in the same way, e.g.

- lidar/phase-1 (group)
  - dsm `scotland-gov/lidar/phase-1/dsm` (collection)
  - dtm `scotland-gov/lidar/phase-1/dtm`
  - laz `scotland-gov/lidar/phase-1/laz`

Clearly we need a helper function `parseCollectionName(collectionName: string): ParsedCollectionName`, where:

    interface ParsedCollectionName {
        Owner: string  // `scotland-gov`
        Group: string  // `lidar/phase-1`
        Name:  string  // `dsm`
    }

- `getGroup(collectionName: string): Group`
- `getAllGroups(): Group[]`
- `getCollectionsInGroup(groupName: string): Collection[]`

As the OGC WMS service URLs for the collections are stored as products in separate collections, we'll have to join them on the client.

    POST search/product
    {
        "collection": "scotland-gov/lidar/ogc",  // we might rename this collection?
    }

This query gives a list of OGC products. Then client-side, we need to match on the product name:

`scotland-gov/lidar/phase-1/dtm` for this collection..
`scotland-gov-lidar-phase-1-dtm` get the product with the equivalent productName

TODO: These need to be renamed to match the collection *substituting slashes for dashes*.

The List page can also be filtered to e.g. a group by querystring value e.g. `lidar/phase-1`.
This would be a client-side filter of the collections lookup if single-page app.
(Server-side alternative is `GET search/collection/scotland-gov/lidar/phase-1/*`)

`GET search/product`

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

Project plan
------------

- Task: Make the new Geoserver https://github.com/jncc/scottish-lidar/issues/3
- Task: Planning and design iteration [1 week] https://github.com/jncc/scottish-lidar/issues/4
- Task: Change SQL library (maintenance) https://github.com/jncc/scottish-lidar/issues/5
- Task: Make the public Lidar Catalog API https://github.com/jncc/scottish-lidar/issues/6
- Task: Infrastructure and Deployment https://github.com/jncc/scottish-lidar/issues/7
- Task: Basic web app with empty Home, Map and About pages (Pete) [1 week] https://github.com/jncc/scottish-lidar/issues/8
- Task: List page [1 week] https://github.com/jncc/scottish-lidar/issues/9
- Task: Basket functionality [1 week] https://github.com/jncc/scottish-lidar/issues/10
- Task: Download page [1 week] https://github.com/jncc/scottish-lidar/issues/11
- Task: Web essentials [1 week] https://github.com/jncc/scottish-lidar/issues/12
- Task: Map page [the rest of the time] https://github.com/jncc/scottish-lidar/issues/13
- Task: Feedback [1 week] https://github.com/jncc/scottish-lidar/issues/14
- Task (Stretch): Gazetteer https://github.com/jncc/scottish-lidar/issues/15
