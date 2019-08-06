
Scottish Remote Sensing Data Portal
===================================

The [Scottish Remote Sensing Data Portal](https://remotesensingdata.gov.scot/) is designed, developed and supported by JNCC.

> The repository is named `scottish-lidar` for historical reasons.

Initial dev notes
-----------------

https://rsp.github.io/gh-pages-no-extension/

https://stackoverflow.com/questions/16534545/how-to-get-rid-of-html-extension-when-serving-webpages-with-node-js

Server side API
---------------

We're going to expose the existing Catalog database API on the Internet and remove the need for a backend web server or any cloud functions. This is an significant additional deliverable.

The "catalog" database has two basic concepts: *collections* and *products*. In this application, a collection is visualized with a *layer* on the map.

`GET search/collection/scotland-gov/*` for the List page and the Map sidebar.

We are not expecting to need to use server-side paging (collection data can fit into memory easily and be got in one request). We could keep this collection in memory as it's used by all the important pages.

Collections are filterable by *group* (by the first 3 segments) in the List page, e.g.

- `scotland-gov/lidar/phase-1` ("group")
- `scotland-gov/lidar/phase-2`
- `scotland-gov/lidar/phase-3`

Collections are also grouped in the Map UI in the same way, e.g.

- lidar/phase-1 ("group")
  - dsm `scotland-gov/lidar/phase-1/dsm`
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
