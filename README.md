# Throwback Thursday - Visitor Hit Counter

Create an embedable image that displays the number of visitors to a webpage.

## TODO
* [x] Design DB
  * Counters
    * ID
    * Secret Key (for updating)
    * Font Family
    * Background Color
    * Font Color
    * Width
    * Height
    * Font Size
    * Max Length
  * Visitors
    * ID
    * Counter ID
    * Date / Time
    * Visit Count
* [x] Setup Server
* [x] What DB to use?
  * Mongo
  * Postgres
  * [x] MySQL
* [x] Setup DB Connection
* [x] Create Counter Route
  * [x] Validate Body
  * [x] Insert into DB
* [ ] View SVG Counter Route
  * [x] /counter/10ba038e-48da-487b-96e8-8d3b99b6d18a?unique=true
  * [x] Check if cookie exists
    * [x] If so, update visit count for visitor
    * [x] If not, create visitor, set cookie
  * [x] If unique param
    * [x] Set counter value to be unique visitors
    * [x] If no unique param, set counter to be total visits
  * [x] Generate SVG
  * [x] Respond with SVG

## Stretch
* [ ] What UI Framework to use?
  * jQuery
  * Knockout.js
  * Backbone.js
  * Angular 1.x
  * Vue.js
  * React
* [ ] Create UI for Creating a counter
  * [ ] Show realtime preview with SVG
* [ ] Get counter info by ID
  * [ ] GET /info/10ba038e-48da-487b-96e8-8d3b99b6d18a
    * [ ] Validate Secret Key
* [ ] Update Counter Route
  * [ ] POST /info/10ba038e-48da-487b-96e8-8d3b99b6d18a
  * [ ] Validate Body
  * [ ] Validate Secret Key
  * [ ] Update Counter info in DB
* [ ] Create UI for Updating a counter
  * [ ] Show realtime preview with SVG

## Database Design

![](https://i.imgur.com/Ddw1nHo.png)